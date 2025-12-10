import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { useRandomUsers } from "@/hooks/useRandomUsers";
import UserCard from "@/components/UserCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  const queryClient = useQueryClient();
  const { data: users, isLoading, isError, isFetching } = useRandomUsers(6);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["randomUsers"] });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        {/* Refresh Button */}
        <div className="flex justify-center mb-10">
          <Button
            onClick={handleRefresh}
            disabled={isFetching}
            className="gap-2 px-6 py-5 rounded-xl text-base font-medium shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
            {isFetching ? "Loading..." : "Get New Users"}
          </Button>
        </div>

        {/* Error State */}
        {isError && (
          <div className="text-center text-destructive bg-destructive/10 rounded-xl p-6 max-w-md mx-auto">
            <p className="font-medium">Failed to load users</p>
            <p className="text-sm mt-1 text-muted-foreground">Please try again</p>
          </div>
        )}

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <LoadingSkeleton key={i} />)
            : users?.map((user, index) => (
                <UserCard key={user.login.uuid} user={user} index={index} />
              ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>
            Powered by{" "}
            <a
              href="https://randomuser.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              RandomUser.me API
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
