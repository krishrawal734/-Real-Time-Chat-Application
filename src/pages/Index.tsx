import { useRandomUsers } from "@/hooks/useRandomUsers";
import UserCard from "@/components/UserCard";
import UserCardSkeleton from "@/components/UserCardSkeleton";
import Layout from "@/components/Layout";

const Index = () => {
  const { data: users, isLoading, isError } = useRandomUsers(12);

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h1 className="text-3xl font-bold text-foreground text-center mb-8">
            Users
          </h1>

          {/* Error State */}
          {isError && (
            <div className="text-center text-destructive bg-destructive/10 rounded-lg p-6 max-w-md mx-auto">
              <p className="font-medium">Failed to load users</p>
              <p className="text-sm mt-1 text-muted-foreground">Please try again later</p>
            </div>
          )}

          {/* Users Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => <UserCardSkeleton key={i} />)
              : users?.map((user, index) => (
                  <UserCard key={user.login.uuid} user={user} index={index} />
                ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
