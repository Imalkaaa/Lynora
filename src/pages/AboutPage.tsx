import { Heart, Award, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-black text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Lynora</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Crafting beautiful, unique dresses that celebrate your individuality and style.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="About Lynora"
              className="rounded-lg shadow-xl"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Founded in 2020, Lynora began with a simple vision: to make high-quality,
                customizable fashion accessible to everyone. We believe that every person
                deserves to express their unique style through clothing that makes them feel
                confident and beautiful.
              </p>
              <p>
                What started as a small operation has grown into a thriving business, serving
                thousands of customers worldwide. Our commitment to quality, creativity, and
                customer satisfaction remains at the heart of everything we do.
              </p>
              <p>
                Today, we offer a curated collection of elegant dresses alongside our custom
                printing services, allowing you to either choose from our designs or create
                something entirely your own.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Passion</h3>
                <p className="text-gray-600 text-sm">
                  We love what we do and it shows in every piece we create.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality</h3>
                <p className="text-gray-600 text-sm">
                  Premium materials and craftsmanship in every dress.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Community</h3>
                <p className="text-gray-600 text-sm">
                  Building relationships that go beyond transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Constantly evolving to bring you the latest in fashion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            To empower individuals to express their unique style through high-quality,
            customizable fashion that celebrates diversity, creativity, and self-expression.
            We're committed to sustainable practices and creating pieces that our customers
            will love and cherish for years to come.
          </p>
        </div>
      </div>

      <div className="bg-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <p className="text-xl">Happy Customers</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-xl">Unique Designs</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-xl">Countries Served</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
