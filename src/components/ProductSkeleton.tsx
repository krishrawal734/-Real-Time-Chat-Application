const ProductSkeleton = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-40 bg-muted rounded mb-4" />

      {/* Title Skeleton */}
      <div className="h-5 bg-muted rounded w-3/4 mb-2" />

      {/* Description Skeleton */}
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>

      {/* Rating Skeleton */}
      <div className="h-4 bg-muted rounded w-16 mb-3" />

      {/* Price and Button Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-6 bg-muted rounded w-16" />
        <div className="h-8 bg-muted rounded w-20" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
