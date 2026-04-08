import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import Sidebar from "@/components/chat/Sidebar";
import ChatBox from "@/components/chat/ChatBox";
import { MessageCircle } from "lucide-react";

type Profile = Tables<"profiles">;

export default function Chat() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate("/");
  }, [user, loading, navigate]);

  // Set online status
  useEffect(() => {
    if (!user) return;

    const setOnline = async () => {
      await supabase.from("profiles").update({ is_online: true, last_seen: new Date().toISOString() }).eq("id", user.id);
    };
    setOnline();

    // Fetch own profile
    supabase.from("profiles").select("*").eq("id", user.id).single().then(({ data }) => {
      if (data) setCurrentProfile(data);
    });

    const handleOffline = async () => {
      await supabase.from("profiles").update({ is_online: false, last_seen: new Date().toISOString() }).eq("id", user.id);
    };

    window.addEventListener("beforeunload", handleOffline);
    return () => {
      handleOffline();
      window.removeEventListener("beforeunload", handleOffline);
    };
  }, [user]);

  // Fetch selected user profile
  useEffect(() => {
    if (!selectedUserId) return;
    supabase.from("profiles").select("*").eq("id", selectedUserId).single().then(({ data }) => {
      if (data) setSelectedProfile(data);
    });
  }, [selectedUserId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen flex bg-background">
      <Sidebar
        currentUserId={user.id}
        selectedUserId={selectedUserId}
        onSelectUser={setSelectedUserId}
        onSignOut={signOut}
        currentProfile={currentProfile}
      />

      {selectedUserId ? (
        <ChatBox
          currentUserId={user.id}
          selectedUserId={selectedUserId}
          selectedProfile={selectedProfile}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-muted/20">
          <div className="bg-primary/10 p-6 rounded-full mb-4">
            <MessageCircle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Welcome to ChatApp</h2>
          <p className="text-muted-foreground mt-2">Select a user to start chatting</p>
        </div>
      )}
    </div>
  );
}
