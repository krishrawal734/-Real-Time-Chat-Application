import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/hooks/useProduct";
import { Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-24 mb-6" />
            <div className="bg-card rounded-lg border border-border p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="h-80 bg-muted rounded" />
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-20 bg-muted rounded" />
                  <div className="h-8 bg-muted rounded w-1/3" />
                  <div className="h-10 bg-muted rounded w-1/2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-destructive">Product not found</p>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/">
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>

        {/* Product Card */}
        <div className="bg-card rounded-lg border border-border p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-muted/30 rounded-lg p-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-80 object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <Star className="h-5 w-5 fill-accent text-accent" />
                <span className="text-accent font-medium">{product.rating.toFixed(2)}</span>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6 flex-grow">
                {product.description}
              </p>

              {/* Category & Brand */}
              <div className="mb-4 text-sm text-muted-foreground">
                <p>Category: <span className="text-foreground capitalize">{product.category}</span></p>
                {product.brand && (
                  <p>Brand: <span className="text-foreground">{product.brand}</span></p>
                )}
              </div>

              {/* Price */}
              <p className="text-3xl font-bold text-foreground mb-6">
                ${product.price.toFixed(2)}
              </p>

              {/* Buy Button */}
              <Button size="lg" className="w-full md:w-auto">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
