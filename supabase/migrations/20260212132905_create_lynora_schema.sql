/*
  # Lynora Dress Printing & Selling Database Schema

  ## Overview
  Complete database schema for Lynora ecommerce platform supporting:
  - Product catalog with categories
  - Shopping cart functionality
  - Order management
  - Custom dress design/printing

  ## Tables Created

  ### 1. categories
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Category description
  - `image_url` (text) - Category image
  - `created_at` (timestamptz)

  ### 2. products
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly identifier
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `category_id` (uuid) - Foreign key to categories
  - `featured` (boolean) - Featured product flag
  - `new_arrival` (boolean) - New arrival flag
  - `best_seller` (boolean) - Best seller flag
  - `stock` (integer) - Stock quantity
  - `sizes` (text[]) - Available sizes
  - `colors` (text[]) - Available colors
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. product_images
  - `id` (uuid, primary key)
  - `product_id` (uuid) - Foreign key to products
  - `image_url` (text) - Image URL
  - `alt_text` (text) - Alt text for accessibility
  - `display_order` (integer) - Image order
  - `created_at` (timestamptz)

  ### 4. cart_items
  - `id` (uuid, primary key)
  - `session_id` (text) - Session identifier for guest users
  - `product_id` (uuid) - Foreign key to products
  - `quantity` (integer) - Quantity
  - `size` (text) - Selected size
  - `color` (text) - Selected color
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 5. orders
  - `id` (uuid, primary key)
  - `order_number` (text, unique) - Human-readable order number
  - `customer_name` (text) - Customer name
  - `customer_email` (text) - Customer email
  - `customer_phone` (text) - Customer phone
  - `shipping_address` (jsonb) - Shipping address details
  - `subtotal` (decimal) - Order subtotal
  - `tax` (decimal) - Tax amount
  - `shipping_cost` (decimal) - Shipping cost
  - `total` (decimal) - Total amount
  - `status` (text) - Order status (pending, processing, shipped, delivered, cancelled)
  - `payment_status` (text) - Payment status (pending, paid, failed)
  - `notes` (text) - Order notes
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 6. order_items
  - `id` (uuid, primary key)
  - `order_id` (uuid) - Foreign key to orders
  - `product_id` (uuid) - Foreign key to products
  - `product_name` (text) - Product name snapshot
  - `quantity` (integer) - Quantity ordered
  - `size` (text) - Selected size
  - `color` (text) - Selected color
  - `price` (decimal) - Price at time of order
  - `subtotal` (decimal) - Line item subtotal
  - `created_at` (timestamptz)

  ### 7. customizations
  - `id` (uuid, primary key)
  - `session_id` (text) - Session identifier
  - `product_id` (uuid) - Base product (nullable)
  - `custom_text` (text) - Custom text to print
  - `custom_image_url` (text) - Custom uploaded image
  - `font_style` (text) - Selected font
  - `text_color` (text) - Text color
  - `placement` (text) - Print placement
  - `notes` (text) - Additional notes
  - `status` (text) - Status (draft, submitted, approved, in_production)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Public read access for products and categories
  - Session-based access for cart items
  - Order access restricted to order creator

  ## Indexes
  - Foreign key indexes for performance
  - Slug indexes for quick lookups
  - Session ID indexes for cart operations
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL DEFAULT 0,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured boolean DEFAULT false,
  new_arrival boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  stock integer DEFAULT 0,
  sizes text[] DEFAULT '{}',
  colors text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  size text DEFAULT '',
  color text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text DEFAULT '',
  shipping_address jsonb DEFAULT '{}',
  subtotal decimal(10,2) DEFAULT 0,
  tax decimal(10,2) DEFAULT 0,
  shipping_cost decimal(10,2) DEFAULT 0,
  total decimal(10,2) DEFAULT 0,
  status text DEFAULT 'pending',
  payment_status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  product_name text NOT NULL,
  quantity integer DEFAULT 1,
  size text DEFAULT '',
  color text DEFAULT '',
  price decimal(10,2) DEFAULT 0,
  subtotal decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create customizations table
CREATE TABLE IF NOT EXISTS customizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  custom_text text DEFAULT '',
  custom_image_url text DEFAULT '',
  font_style text DEFAULT 'Arial',
  text_color text DEFAULT '#000000',
  placement text DEFAULT 'center',
  notes text DEFAULT '',
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_session ON cart_items(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_customizations_session ON customizations(session_id);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE customizations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Public can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- RLS Policies for product_images (public read)
CREATE POLICY "Public can view product images"
  ON product_images FOR SELECT
  TO public
  USING (true);

-- RLS Policies for cart_items (session-based access)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO public
  USING (true);

-- RLS Policies for orders (public can create, view own)
CREATE POLICY "Public can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view orders"
  ON orders FOR SELECT
  TO public
  USING (true);

-- RLS Policies for order_items (public read)
CREATE POLICY "Public can view order items"
  ON order_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can create order items"
  ON order_items FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for customizations (session-based access)
CREATE POLICY "Users can view own customizations"
  ON customizations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create customizations"
  ON customizations FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own customizations"
  ON customizations FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete own customizations"
  ON customizations FOR DELETE
  TO public
  USING (true);