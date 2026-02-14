import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Palette, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { useRouter } from '@/lib/router';
import { ProductWithImages } from '@/lib/supabase';
import { useCart } from '@/lib/cart-context';
import { toast } from 'sonner';
export function HomePage() {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<ProductWithImages[]>([]);
  const [newArrivals, setNewArrivals] = useState<ProductWithImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Static products with local images
  const staticFeaturedProducts: ProductWithImages[] = [
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
    }
  ];

  const staticNewArrivals: ProductWithImages[] = [
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

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
      desktopImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2400&q=80',
      position: 'object-center',
      title: 'Elegant Fashion',
      highlight: 'Your Style',
      subtitle: 'Discover unique dresses and create custom prints that express your personality',
      cta: 'Shop Collection',
      ctaLink: '/shop'
    },
    {
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
      desktopImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=2400&q=80',
      position: 'object-center',
      title: 'New Collection',
      highlight: '2024',
      subtitle: 'Explore the latest trends in fashion with our exclusive new arrivals',
      cta: 'View New Arrivals',
      ctaLink: '/shop'
    },
    {
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80',
      mobileImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
      desktopImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=2400&q=80',
      position: 'object-center',
      title: 'Custom Designs',
      highlight: 'Made for You',
      subtitle: 'Create your perfect dress with personalized prints and designs',
      cta: 'Start Customizing',
      ctaLink: '/customize'
    }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    // Use static data with local images
    setTimeout(() => {
      setFeaturedProducts(staticFeaturedProducts);
      setNewArrivals(staticNewArrivals);
      setLoading(false);
    }, 500); // Small delay for loading effect
  };

  const handleQuickAdd = (product: ProductWithImages) => {
    if (product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product, 1, product.sizes[0] || '', product.colors[0] || '');
    toast.success('Added to cart!');
  };

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  // };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'Absolutely love my custom dress! The print quality is amazing and the fit is perfect.',
    },
    {
      name: 'Emily Chen',
      rating: 5,
      text: 'Fast shipping and excellent customer service. Will definitely order again!',
    },
    {
      name: 'Maria Garcia',
      rating: 5,
      text: 'The best online dress shopping experience. Beautiful designs and great quality.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Hero Section with Slider */}
      <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[750px] xl:h-[800px] overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30 md:to-transparent z-10"></div>
              <img
                srcSet={`
                  ${slide.mobileImage} 800w,
                  ${slide.image} 1600w,
                  ${slide.desktopImage} 2400w
                `}
                sizes="100vw"
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full ${slide.position}`}
                style={{ objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 sm:px-6 h-full flex items-center z-20">
              <div className="max-w-3xl">
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 animate-fade-in">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
                  <span className="text-xs sm:text-sm text-white font-medium">Limited Time Offer</span>
                </div>

                {/* Main Heading with Animation */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight text-white animate-slide-up">
                  {slide.title}
                  <br />
                  <span className="text-red-500 inline-block animate-fade-in-delay">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-100 max-w-2xl animate-slide-up-delay">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-delay-2">
                  <Button
                    size="lg"
                    onClick={() => navigate(slide.ctaLink)}
                    className="bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full shadow-2xl hover:shadow-red-600/50 transition-all hover:scale-105"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/shop')}
                    className="border-2 border-white text-white hover:bg-white hover:text-black text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 rounded-full backdrop-blur-sm bg-white/10 transition-all hover:scale-105"
                  >
                    Explore More
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 sm:gap-6 mt-8 sm:mt-12 animate-fade-in-delay-3">
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">4.9/5</div>
                      <div className="text-xs text-white/70">2000+ Reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/90">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm sm:text-base">10K+</div>
                      <div className="text-xs text-white/70">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {/* <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button> */}

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-6 sm:w-8 bg-red-500'
                  : 'w-1.5 sm:w-2 bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
                <p className="text-gray-600">
                  High-quality fabrics and materials for lasting comfort and style.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Custom Designs</h3>
                <p className="text-gray-600">
                  Create unique prints and personalize your dress exactly how you want.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Latest Trends</h3>
                <p className="text-gray-600">
                  Stay fashionable with our curated collection of trending styles.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Collection</h2>
              <p className="text-gray-600">Handpicked styles just for you</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/shop')}
              className="border-black hover:bg-black hover:text-white"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleQuickAdd(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Create Your Custom Dress
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-red-50">
            Design a one-of-a-kind dress with your own text, images, and style preferences.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/customize')}
            className="bg-white text-red-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            Start Designing
            <Palette className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600">Latest additions to our collection</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleQuickAdd(product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-red-600 text-red-600" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Subscribe to get special offers, style inspiration, and updates on new arrivals.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.6s ease-out 0.6s both;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}