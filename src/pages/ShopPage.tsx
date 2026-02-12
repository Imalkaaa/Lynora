import { useEffect, useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { ProductCard } from '@/components/ProductCard';
import { supabase, ProductWithImages, Category } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';

export function ShopPage() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductWithImages[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductWithImages[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Black', 'White', 'Red', 'Blue', 'Pink', 'Beige', 'Navy'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, selectedCategories, priceRange, selectedSizes, selectedColors, sortBy]);

  const loadData = async () => {
    setLoading(true);

    const [{ data: productsData }, { data: categoriesData }] = await Promise.all([
      supabase.from('products').select('*, product_images(*), categories(*)'),
      supabase.from('categories').select('*'),
    ]);

    if (productsData) setProducts(productsData as ProductWithImages[]);
    if (categoriesData) setCategories(categoriesData);

    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.category_id && selectedCategories.includes(p.category_id)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((p) =>
        p.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter((p) =>
        p.colors.some((color) => selectedColors.includes(color))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'new':
        filtered.sort((a, b) => (b.new_arrival ? 1 : 0) - (a.new_arrival ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 300]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSortBy('featured');
  };

  const handleQuickAdd = (product: ProductWithImages) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, 1, product.sizes[0] || '', product.colors[0] || '');
    toast.success('Added to cart!');
  };

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700"
          >
            Clear All
          </Button>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((id) => id !== category.id)
                    );
                  }
                }}
              />
              <Label htmlFor={category.id} className="cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h4>
        <Slider
          min={0}
          max={300}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
        />
      </div>

      <div>
        <h4 className="font-medium mb-3">Sizes</h4>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Button
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (selectedSizes.includes(size)) {
                  setSelectedSizes(selectedSizes.filter((s) => s !== size));
                } else {
                  setSelectedSizes([...selectedSizes, size]);
                }
              }}
              className={
                selectedSizes.includes(size)
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'border-gray-300'
              }
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Colors</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <Button
              key={color}
              variant={selectedColors.includes(color) ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                if (selectedColors.includes(color)) {
                  setSelectedColors(selectedColors.filter((c) => c !== color));
                } else {
                  setSelectedColors([...selectedColors, color]);
                }
              }}
              className={
                selectedColors.includes(color)
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'border-gray-300'
              }
            >
              {color}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Dresses</h1>
          <p className="text-gray-600 text-lg">
            Discover our complete collection of beautiful dresses
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20">
              <FilterSection />
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterSection />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-gray-600">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm">
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort" className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="new">New Arrivals</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">
                  No products found matching your filters.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleQuickAdd(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
