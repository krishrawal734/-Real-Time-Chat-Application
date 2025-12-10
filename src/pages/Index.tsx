import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";

const Index = () => {
  const { data: products, isLoading, isError } = useProducts(12);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-foreground text-center mb-8">
          Products
        </h1>

        {/* Error State */}
        {isError && (
          <div className="text-center text-destructive bg-destructive/10 rounded-lg p-6 max-w-md mx-auto">
            <p className="font-medium">Failed to load products</p>
            <p className="text-sm mt-1 text-muted-foreground">Please try again later</p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <ProductSkeleton key={i} />)
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
