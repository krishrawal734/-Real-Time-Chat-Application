
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  is_online BOOLEAN DEFAULT false,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create chats table
CREATE TABLE public.chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_2 UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(participant_1, participant_2)
);

ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chats" ON public.chats FOR SELECT TO authenticated
  USING (auth.uid() = participant_1 OR auth.uid() = participant_2);
CREATE POLICY "Users can create chats" ON public.chats FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = participant_1 OR auth.uid() = participant_2);

-- Create messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in own chats" ON public.messages FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND (chats.participant_1 = auth.uid() OR chats.participant_2 = auth.uid())
    )
  );
CREATE POLICY "Users can send messages in own chats" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = messages.chat_id
      AND (chats.participant_1 = auth.uid() OR chats.participant_2 = auth.uid())
    )
  );

CREATE INDEX idx_messages_chat_id ON public.messages(chat_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- Create typing status table
CREATE TABLE public.typing_status (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id UUID NOT NULL REFERENCES public.chats(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  is_typing BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(chat_id, user_id)
);

ALTER TABLE public.typing_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view typing status in own chats" ON public.typing_status FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.chats
      WHERE chats.id = typing_status.chat_id
      AND (chats.participant_1 = auth.uid() OR chats.participant_2 = auth.uid())
    )
  );
CREATE POLICY "Users can update own typing status" ON public.typing_status FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can modify own typing status" ON public.typing_status FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime for messages, typing_status, and profiles
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.typing_status;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;

-- Function to get or create chat between two users
CREATE OR REPLACE FUNCTION public.get_or_create_chat(other_user_id UUID)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chat_id UUID;
  current_user_id UUID := auth.uid();
BEGIN
  SELECT id INTO chat_id FROM public.chats
  WHERE (participant_1 = current_user_id AND participant_2 = other_user_id)
     OR (participant_1 = other_user_id AND participant_2 = current_user_id);

  IF chat_id IS NULL THEN
    INSERT INTO public.chats (participant_1, participant_2)
    VALUES (current_user_id, other_user_id)
    RETURNING id INTO chat_id;
  END IF;

  RETURN chat_id;
END;
$$;
