import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/lib/router';

export function Footer() {
  const { navigate } = useRouter();

  return (
    <footer className="bg-black text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">LYNORA</h3>
            <p className="text-gray-400 text-sm mb-4">
              Modern dress printing and selling. Creating beautiful, customizable fashion for everyone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-600 hover:bg-white/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-600 hover:bg-white/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-red-600 hover:bg-white/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">
                  All Products
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/customize')} className="hover:text-white transition-colors">
                  Customize
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers and style updates.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© 2024 Lynora. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button className="hover:text-white transition-colors">Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
