import { ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useRouter } from '@/lib/router';
import { ProductWithImages } from '@/lib/supabase';

type ProductCardProps = {
  product: ProductWithImages;
  onAddToCart?: () => void;
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { navigate } = useRouter();
  const primaryImage = product.product_images?.[0]?.image_url || '';

  return (
    <Card className="group overflow-hidden border-gray-200 hover:border-red-600 transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.new_arrival && (
            <Badge className="bg-red-600 hover:bg-red-700 text-white">New</Badge>
          )}
          {product.best_seller && (
            <Badge className="bg-black hover:bg-gray-800 text-white">Best Seller</Badge>
          )}
        </div>

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Button
            size="icon"
            className="bg-white text-black hover:bg-red-600 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.slug}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="bg-white text-black hover:bg-red-600 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.();
            }}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <button
          onClick={() => navigate(`/product/${product.slug}`)}
          className="w-full text-left"
        >
          <h3 className="font-semibold text-sm mb-1 group-hover:text-red-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">
            {product.description}
          </p>
        </button>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between">
        <span className="text-lg font-bold text-black">
          ${product.price.toFixed(2)}
        </span>
        {product.stock < 10 && product.stock > 0 && (
          <span className="text-xs text-red-600 font-medium">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="text-xs text-gray-500">Out of stock</span>
        )}
      </CardFooter>
    </Card>
  );
}
