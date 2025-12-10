import { useQuery } from "@tanstack/react-query";
import { Product, ProductsResponse } from "@/types/product";

const fetchProducts = async (limit: number = 12): Promise<Product[]> => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: ProductsResponse = await response.json();
  return data.products;
};

export const useProducts = (limit: number = 12) => {
  return useQuery({
    queryKey: ["products", limit],
    queryFn: () => fetchProducts(limit),
  });
};
