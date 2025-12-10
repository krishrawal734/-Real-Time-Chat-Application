import { Product } from "@/types/product";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex flex-col h-full">
      {/* Product Image */}
      <div className="h-40 flex items-center justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Product Title */}
      <h3 className="font-semibold text-foreground text-base mb-2 line-clamp-1">
        {product.title}
      </h3>

      {/* Product Description */}
      <p className="text-muted-foreground text-sm mb-3 line-clamp-3 flex-grow">
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        <Star className="h-4 w-4 fill-accent text-accent" />
        <span className="text-accent font-medium text-sm">{product.rating.toFixed(2)}</span>
      </div>

      {/* Price and View Button */}
      <div className="flex items-center justify-between mt-auto">
        <span className="text-foreground font-bold text-lg">
          ${product.price.toFixed(2)}
        </span>
        <Link to={`/products/${product.id}`}>
          <Button size="sm" className="px-6">
            View
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
