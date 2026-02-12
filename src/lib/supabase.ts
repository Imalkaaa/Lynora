import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category_id: string;
  featured: boolean;
  new_arrival: boolean;
  best_seller: boolean;
  stock: number;
  sizes: string[];
  colors: string[];
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
};

export type CartItem = {
  id: string;
  session_id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  created_at: string;
  updated_at: string;
};

export type ProductWithImages = Product & {
  product_images: ProductImage[];
  categories: Category | null;
};
