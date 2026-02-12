import { RouterProvider, useRouter } from './lib/router';
import { CartProvider } from './lib/cart-context';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomizePage } from './pages/CustomizePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Toaster } from 'sonner';

function AppContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    } else if (currentPath === '/shop') {
      return <ShopPage />;
    } else if (currentPath.startsWith('/product/')) {
      return <ProductDetailPage />;
    } else if (currentPath === '/customize') {
      return <CustomizePage />;
    } else if (currentPath === '/about') {
      return <AboutPage />;
    } else if (currentPath === '/contact') {
      return <ContactPage />;
    } else if (currentPath === '/cart') {
      return <CartPage />;
    } else if (currentPath === '/checkout') {
      return <CheckoutPage />;
    } else {
      return <HomePage />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <AppContent />
        <Toaster position="top-right" richColors />
      </CartProvider>
    </RouterProvider>
  );
}

export default App;
