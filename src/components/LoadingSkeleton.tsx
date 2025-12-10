const LoadingSkeleton = () => {
  return (
    <div className="card-gradient card-shadow rounded-2xl p-6 animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="mx-auto mb-5 h-28 w-28 rounded-full bg-muted" />

      {/* Name Skeleton */}
      <div className="mx-auto mb-4 h-6 w-36 rounded-lg bg-muted" />

      {/* Email Skeleton */}
      <div className="mx-auto mb-2 h-4 w-48 rounded-lg bg-muted" />

      {/* Location Skeleton */}
      <div className="mx-auto h-4 w-32 rounded-lg bg-muted" />
    </div>
  );
};

export default LoadingSkeleton;
