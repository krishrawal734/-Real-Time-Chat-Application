const UserCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
      <div className="h-40 flex items-center justify-center mb-4">
        <div className="h-32 w-32 rounded-full bg-muted" />
      </div>
      <div className="h-5 bg-muted rounded w-3/4 mx-auto mb-2" />
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded flex-1" />
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="h-4 w-4 bg-muted rounded" />
        <div className="h-4 bg-muted rounded w-2/3" />
      </div>
      <div className="flex justify-end">
        <div className="h-8 bg-muted rounded w-20" />
      </div>
    </div>
  );
};

export default UserCardSkeleton;
