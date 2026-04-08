import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, LogOut, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type Profile = Tables<"profiles">;

interface SidebarProps {
  currentUserId: string;
  selectedUserId: string | null;
  onSelectUser: (userId: string) => void;
  onSignOut: () => void;
  currentProfile: Profile | null;
}

export default function Sidebar({ currentUserId, selectedUserId, onSelectUser, onSignOut, currentProfile }: SidebarProps) {
  const [users, setUsers] = useState<Profile[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", currentUserId);
      if (data) setUsers(data);
    };
    fetchUsers();

    const channel = supabase
      .channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [currentUserId]);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <MessageCircle className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">ChatApp</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onSignOut} title="Sign Out">
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Current user */}
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {currentProfile?.name?.charAt(0)?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate text-foreground">{currentProfile?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentProfile?.email}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
      </div>

      {/* User list */}
      <ScrollArea className="flex-1">
        {filtered.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors ${
              selectedUserId === user.id ? "bg-muted" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card ${
                  user.is_online ? "bg-green-500" : "bg-muted-foreground/40"
                }`}
              />
            </div>
            <div className="min-w-0 text-left">
              <p className="text-sm font-medium truncate text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                {user.is_online ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">No users found</p>
        )}
      </ScrollArea>
    </div>
  );
}
