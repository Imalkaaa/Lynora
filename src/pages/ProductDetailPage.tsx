import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';
import { ProductWithImages } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { ShoppingCart, Truck, Shield, RefreshCcw, Check } from 'lucide-react';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { params, navigate } = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<ProductWithImages | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductWithImages[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      loadProduct(params.slug);
    }
  }, [params.slug]);

  const loadProduct = async (slug: string) => {
    setLoading(true);

    // Static products data (same as HomePage)
    const staticProducts: ProductWithImages[] = [
      {
        id: '1',
        name: 'Elegant Floral Dress',
        slug: 'elegant-floral-dress',
        description: 'Beautiful floral pattern dress perfect for any occasion',
        price: 1500,
        category_id: '1',
        featured: true,
        new_arrival: false,
        best_seller: true,
        stock: 10,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Red', 'Blue', 'Green'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_images: [
          {
            id: '1-1',
            product_id: '1',
            image_url: '/Lynora/images/1.jpg',
            alt_text: 'Elegant Floral Dress',
            display_order: 1,
            created_at: new Date().toISOString()
          }
        ],
        categories: null
      },
      {
        id: '2',
        name: 'Classic Black Dress',
        slug: 'classic-black-dress',
        description: 'Timeless black dress for elegant evenings',
        price: 1500,
        category_id: '1',
        featured: true,
        new_arrival: false,
        best_seller: false,
        stock: 15,
        sizes: ['S', 'M', 'L'],
        colors: ['Black'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_images: [
          {
            id: '2-1',
            product_id: '2',
            image_url: '/Lynora/images/2.jpg',
            alt_text: 'Classic Black Dress',
            display_order: 1,
            created_at: new Date().toISOString()
          }
        ],
        categories: null
      },
      {
        id: '3',
        name: 'Summer Breeze Dress',
        slug: 'summer-breeze-dress',
        description: 'Light and comfortable dress for summer days',
        price: 1500,
        category_id: '1',
        featured: true,
        new_arrival: false,
        best_seller: false,
        stock: 20,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Yellow', 'Pink', 'Blue'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_images: [
          {
            id: '3-1',
            product_id: '3',
            image_url: '/Lynora/images/3.jpg',
            alt_text: 'Summer Breeze Dress',
            display_order: 1,
            created_at: new Date().toISOString()
          }
        ],
        categories: null
      },
      {
        id: '4',
        name: 'Modern Style Dress',
        slug: 'modern-style-dress',
        description: 'Contemporary design with a perfect fit',
        price: 1500,
        category_id: '1',
        featured: true,
        new_arrival: false,
        best_seller: true,
        stock: 8,
        sizes: ['M', 'L', 'XL'],
        colors: ['Navy', 'Gray'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_images: [
          {
            id: '4-1',
            product_id: '4',
            image_url: '/Lynora/images/4.jpg',
            alt_text: 'Modern Style Dress',
            display_order: 1,
            created_at: new Date().toISOString()
          }
        ],
        categories: null
      },
      {
        id: '5',
        name: 'Trendy New Arrival',
        slug: 'trendy-new-arrival',
        description: 'Latest fashion trend just arrived',
        price: 1500,
        category_id: '1',
        featured: false,
        new_arrival: true,
        best_seller: false,
        stock: 12,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Multi-color'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        product_images: [
          {
            id: '5-1',
            product_id: '5',
            image_url: '/Lynora/images/5.jpg',
            alt_text: 'Trendy New Arrival',
            display_order: 1,
            created_at: new Date().toISOString()
          }
        ],
        categories: null
      }
    ];

    const productData = staticProducts.find(p => p.slug === slug);

    if (productData) {
      setProduct(productData);
      setSelectedSize(productData.sizes[0] || '');
      setSelectedColor(productData.colors[0] || '');

      // Get related products (same category, excluding current product)
      const related = staticProducts.filter(p => 
        p.category_id === productData.category_id && p.id !== productData.id
      ).slice(0, 4);
      
      setRelatedProducts(related);
    }

    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;

    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success('Added to cart!');
  };

  const handleQuickAdd = (product: ProductWithImages) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, 1, product.sizes[0] || '', product.colors[0] || '');
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')} className="bg-red-600 hover:bg-red-700">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const images = product.product_images || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg border">
              <img
                src={images[selectedImage]?.image_url || ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-red-600'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={image.image_url}
                    alt={image.alt_text}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex gap-2">
              {product.new_arrival && (
                <Badge className="bg-red-600">New Arrival</Badge>
              )}
              {product.best_seller && (
                <Badge className="bg-black">Best Seller</Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            <div className="text-3xl font-bold text-black mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-semibold">Size:</Label>
                <span className="text-sm text-gray-600">Size Guide</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'border-gray-300 hover:border-black'
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label className="font-semibold mb-2 block">Color:</Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? 'default' : 'outline'}
                    onClick={() => setSelectedColor(color)}
                    className={
                      selectedColor === color
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'border-gray-300 hover:border-black'
                    }
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <Label className="font-semibold mb-2 block">Quantity:</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
                <span className="text-sm text-gray-600 ml-2">
                  {product.stock} available
                </span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg mb-4"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% secure payment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCcw className="h-5 w-5 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">30 days return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Product Details</h2>
          <div className="prose max-w-none">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>Premium quality fabric</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>Machine washable</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>True to size fit</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>Comfortable all-day wear</span>
              </li>
            </ul>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={() => handleQuickAdd(relatedProduct)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={className}>{children}</span>;
}
