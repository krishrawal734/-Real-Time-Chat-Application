import { useEffect, useRef, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";

type MessageRow = Tables<"messages">;
type Profile = Tables<"profiles">;

interface ChatBoxProps {
  currentUserId: string;
  selectedUserId: string;
  selectedProfile: Profile | null;
}

export default function ChatBox({ currentUserId, selectedUserId, selectedProfile }: ChatBoxProps) {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [text, setText] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<ReturnType<typeof setTimeout>>();

  // Get or create chat
  useEffect(() => {
    const initChat = async () => {
      const { data } = await supabase.rpc("get_or_create_chat", { other_user_id: selectedUserId });
      if (data) setChatId(data);
    };
    initChat();
  }, [selectedUserId]);

  // Fetch messages & subscribe
  useEffect(() => {
    if (!chatId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    const channel = supabase
      .channel(`messages-${chatId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`,
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as MessageRow]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [chatId]);

  // Subscribe to typing status
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`typing-${chatId}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "typing_status",
        filter: `chat_id=eq.${chatId}`,
      }, (payload) => {
        const row = payload.new as Tables<"typing_status">;
        if (row.user_id !== currentUserId) {
          setIsTyping(row.is_typing ?? false);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [chatId, currentUserId]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const updateTyping = useCallback(async (typing: boolean) => {
    if (!chatId) return;
    await supabase.from("typing_status").upsert({
      chat_id: chatId,
      user_id: currentUserId,
      is_typing: typing,
      updated_at: new Date().toISOString(),
    }, { onConflict: "chat_id,user_id" });
  }, [chatId, currentUserId]);

  const handleInputChange = (value: string) => {
    setText(value);
    updateTyping(true);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => updateTyping(false), 2000);
  };

  const sendMessage = async () => {
    if (!text.trim() || !chatId) return;
    const msg = text.trim();
    setText("");
    updateTyping(false);
    await supabase.from("messages").insert({
      chat_id: chatId,
      sender_id: currentUserId,
      text: msg,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-background">
      {/* Chat header */}
      <div className="px-6 py-4 border-b border-border flex items-center gap-3 bg-card">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            {selectedProfile?.name?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{selectedProfile?.name}</p>
          <p className="text-xs text-muted-foreground">
            {selectedProfile?.is_online ? "🟢 Online" : "⚫ Offline"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-12">
            No messages yet. Say hello! 👋
          </p>
        )}
        {messages.map((msg) => (
          <Message
            key={msg.id}
            text={msg.text}
            timestamp={msg.created_at}
            isMine={msg.sender_id === currentUserId}
            senderName={selectedProfile?.name || "User"}
          />
        ))}
        {isTyping && <TypingIndicator name={selectedProfile?.name || "User"} />}
        <div ref={bottomRef} />
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!text.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
