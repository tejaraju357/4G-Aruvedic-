# Aruvedic — Full-Stack Ayurveda E-Commerce App

A complete **React + Node/Express** e-commerce application for an Ayurvedic wellness brand.
Built with clean, well-structured code — no third-party UI libraries, just vanilla CSS-in-JS and Vite.

---

## Quick Start

### 1. Start the backend (Express API)

```bash
cd server
npm install
node index.js
# Server runs on http://localhost:4000
```

### 2. Start the frontend (React + Vite)

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

> Both must be running at the same time. Open **http://localhost:5173** in your browser.

---

## Project Structure

```
aruvedic/
│
├── server/                        ← Express REST API
│   ├── index.js                   ← Server entry point
│   ├── package.json
│   ├── data/
│   │   └── store.js               ← In-memory database (products, orders, etc.)
│   └── routes/
│       ├── products.js            ← GET /api/products, GET /api/products/:id
│       ├── orders.js              ← GET/POST /api/orders, PATCH /api/orders/:id
│       ├── customers.js           ← GET /api/customers
│       ├── coupons.js             ← GET/POST/DELETE /api/coupons
│       ├── reviews.js             ← GET/PATCH /api/reviews
│       └── dashboard.js           ← GET /api/dashboard
│
└── client/                        ← React SPA (Vite)
    ├── index.html                 ← HTML entry point
    ├── vite.config.js             ← Vite + proxy config
    ├── package.json
    └── src/
        ├── main.jsx               ← App entry (renders <App> inside <CartProvider>)
        ├── App.jsx                ← React Router — all routes defined here
        ├── index.css              ← Global CSS variables, reset, fonts, animations
        ├── data/
        │   └── products.js        ← All static data: PRODUCTS, CATEGORIES, ORDERS, etc.
        ├── theme/
        │   └── palettes.js        ← Colour palettes (Earth/Sage/Bone) + applyTheme()
        ├── context/
        │   └── CartContext.jsx    ← Global state: cart, wishlist, user, toast
        ├── components/
        │   ├── layout/
        │   │   ├── Header.jsx     ← Sticky header with nav, search, cart/wishlist badge
        │   │   └── Footer.jsx     ← Dark multi-column footer
        │   └── ui/
        │       ├── Icon.jsx       ← SVG icon system (35+ named icons)
        │       ├── Btn.jsx        ← Reusable button (primary/accent/ghost/bare)
        │       ├── Stars.jsx      ← Star rating display
        │       ├── Toast.jsx      ← Fixed-position toast notification
        │       ├── ProductVisual.jsx  ← Botanical SVG illustration per product
        │       ├── ProductCard.jsx    ← Product grid card
        │       ├── Empty.jsx          ← Empty-state placeholder
        │       ├── SectionEyebrow.jsx ← Section heading with eyebrow label
        │       └── TabPills.jsx       ← Pill-style tab switcher
        └── pages/
            ├── Home.jsx           ← Landing page
            ├── Listing.jsx        ← Product grid / list with filters
            ├── Product.jsx        ← Product detail page
            ├── Cart.jsx           ← Shopping cart
            ├── Checkout.jsx       ← 3-step checkout flow
            ├── Confirmation.jsx   ← Order confirmed page
            ├── Wishlist.jsx       ← Saved items
            ├── Auth.jsx           ← Sign in / Sign up
            ├── Profile.jsx        ← Account: orders, details, addresses
            └── admin/
                ├── AdminShell.jsx ← Admin sidebar layout
                ├── Dashboard.jsx  ← KPIs, revenue chart, best sellers
                ├── Orders.jsx     ← Order table with status filters
                ├── Products.jsx   ← Product table with stock status
                ├── Customers.jsx  ← Customer table with tier badges
                ├── Coupons.jsx    ← Create, toggle, delete coupons
                └── Reviews.jsx    ← Approve / reject reviews

```

---

## Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | `Home` | Hero slider, category strip, featured products, editorial section, reviews, email CTA |
| `/shop` | `Listing` | All products. Filter by category, sort by price/rating, grid or list view |
| `/shop?cat=skincare` | `Listing` | Filtered by category |
| `/shop?q=ashwa` | `Listing` | Search results |
| `/product/:id` | `Product` | Product detail, pack size selector, qty, tabs (how to use, ingredients, reviews) |
| `/cart` | `Cart` | Cart with qty controls, coupon input, order summary |
| `/checkout` | `Checkout` | Step 1: Address · Step 2: Payment · Step 3: Review & confirm |
| `/confirmation` | `Confirmation` | Thank-you page with order details and tracking status |
| `/wishlist` | `Wishlist` | Saved / hearted products |
| `/auth` | `Auth` | Sign in / Sign up split layout |
| `/profile` | `Profile` | Order history, account details, saved addresses |
| `/admin/dashboard` | `Dashboard` | KPI cards, revenue bar chart, best sellers, low stock |
| `/admin/orders` | `Orders` | Orders table with status filter + detail panel |
| `/admin/products` | `Products` | Products table with stock indicators |
| `/admin/customers` | `Customers` | Customer table with Gold/Silver/Bronze tiers |
| `/admin/coupons` | `Coupons` | Create, activate/pause, delete coupons |
| `/admin/reviews` | `Reviews` | Approve or reject customer reviews |

---

## API Endpoints (Express — port 4000)

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | All products. Supports `?cat=`, `?sort=`, `?q=` query params |
| GET | `/api/products/:id` | Single product by ID |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | All orders. Supports `?status=` filter |
| GET | `/api/orders/:id` | Single order |
| POST | `/api/orders` | Place a new order. Body: `{ items, address, payment, customer }` |
| PATCH | `/api/orders/:id` | Update order status. Body: `{ status }` |

### Customers
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/customers` | All customers |

### Coupons
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/coupons` | All coupons |
| POST | `/api/coupons` | Create coupon. Body: `{ code, off, cap }` |
| DELETE | `/api/coupons/:id` | Delete a coupon |

### Reviews
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/reviews` | All reviews |
| PATCH | `/api/reviews/:id` | Update review status. Body: `{ status }` |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard` | KPIs, 14-day sales chart, best sellers, recent orders, low stock |

---

## Design System

The entire app uses **CSS Custom Properties** (variables) defined in `src/index.css`.
No Tailwind, no styled-components — pure CSS variables everywhere.

### Colour Tokens

| Variable | Default (Earth palette) | Purpose |
|---|---|---|
| `--bg` | `#F6F0E4` | Page background |
| `--surface` | `#FFFCF5` | Cards, panels |
| `--ink` | `#1F1A12` | Primary text, buttons |
| `--mute` | `#7A6F5C` | Secondary text, labels |
| `--line` | `#E4DBC8` | Borders, dividers |
| `--accent` | `#B86A3F` | Highlights, CTAs, discounts |
| `--accent-ink` | `#FFFFFF` | Text on accent bg |
| `--leaf` | `#6B7F5C` | Success/green tones |
| `--soft` | `#EDE3CF` | Subtle background fills |

### Typography Tokens

| Variable | Value |
|---|---|
| `--font-display` | `'Cormorant Garamond', Georgia, serif` |
| `--font-body` | `'Outfit', system-ui, sans-serif` |

### Palettes (switchable via `applyTheme()`)
- **Earth** — warm parchment + terracotta accent (default)
- **Sage** — soft green tones + forest green accent
- **Bone** — neutral greige + dark ink accent

To switch palette at runtime:
```js
import { applyTheme } from './theme/palettes';
applyTheme('sage', 'classical'); // palette, font pair
```

---

## Global State — CartContext

Everything about the shopping session lives in `CartContext`.
Wrap any component with `useCart()` to access it.

```jsx
import { useCart } from '../context/CartContext';

const { cart, addToCart, removeFromCart, updateCartQty,
        wishlist, toggleWishlist,
        user, setUser,
        toast, showToast,
        lastOrder, placeOrder,
        cartCount } = useCart();
```

| Property | Type | Description |
|---|---|---|
| `cart` | `Array<{id, qty}>` | Items in cart |
| `addToCart(id, qty)` | function | Add item, shows toast |
| `removeFromCart(id)` | function | Remove item |
| `updateCartQty(id, qty)` | function | Change quantity |
| `wishlist` | `string[]` | Array of product IDs |
| `toggleWishlist(id)` | function | Add or remove from wishlist |
| `user` | `{name, email}` or `null` | Logged-in user |
| `setUser(user)` | function | Log in / log out |
| `toast` | `string` | Current toast message |
| `showToast(msg)` | function | Show toast for 2.2s |
| `lastOrder` | `{id, total}` | Most recent placed order |
| `placeOrder(addr, pay)` | function | Clears cart, creates order |
| `cartCount` | `number` | Total item quantity in cart |

---

## Data File — `src/data/products.js`

This is the single source of truth for all static data on the frontend.

| Export | Description |
|---|---|
| `PRODUCTS` | Array of 12 products (id, name, sub, cat, price, mrp, rating, etc.) |
| `CATEGORIES` | 7 categories with id, label, sub |
| `ORDERS` | 8 sample orders |
| `CUSTOMERS` | 6 sample customers with tier |
| `COUPONS` | 4 sample coupon codes |
| `REVIEWS` | 5 sample reviews |
| `SALES_14D` | 14-day revenue + order count array for the admin chart |
| `inr(n)` | Utility: formats number as Indian Rupees e.g. `inr(1240)` → `₹1,240` |

---

## Key Components Explained

### `Icon.jsx`
A single SVG component that renders any of 35+ named icons.
```jsx
<Icon name="cart" size={20} color="var(--accent)" stroke={1.5} />
```
Available names: `search, cart, heart, heartF, user, plus, minus, chev, chevD, star, starF, check, x, leaf, box, bag, arrow, home, grid, list, cog, chart, truck, tag, pencil, eye, trash, pin, lock, sparkle, filter, drop, flame`

### `Btn.jsx`
Reusable button with 4 variants and 3 sizes.
```jsx
<Btn variant="primary" size="lg" icon="cart" full onClick={handleAdd}>
  Add to cart
</Btn>
```
- **Variants**: `primary` (dark), `accent` (terracotta), `ghost` (outlined), `bare` (no border)
- **Sizes**: `sm` (32px), `md` (40px), `lg` (48px)
- `full` prop makes it 100% width
- `icon` prop adds an icon before the text

### `ProductCard.jsx`
Grid card for any product. Used on Home, Listing, and Wishlist pages.
```jsx
<ProductCard
  product={p}
  onOpen={id => navigate(`/product/${id}`)}
  onAdd={addToCart}
  onWish={toggleWishlist}
  wished={wishlist.includes(p.id)}
/>
```

### `ProductVisual.jsx`
Generates a unique botanical SVG illustration for each product based on its `swatch` colour.
No external images needed — works offline.
```jsx
<ProductVisual product={p} height={280} />
```

### `AdminShell.jsx`
Wraps every admin page with a dark sidebar nav. Receives a `section` prop to highlight the active link.
```jsx
<AdminShell section="orders">
  <Orders />
</AdminShell>
```

---

## How the Checkout Flow Works

1. **Cart page** → user reviews items, applies coupon, clicks "Checkout"
2. **Checkout page** (3 steps):
   - **Step 1** — Delivery address form (pre-filled from user state)
   - **Step 2** — Payment method (UPI / Card / EMI / COD). UPI shows app shortcuts.
   - **Step 3** — Review all items + place order
3. `placeOrder()` is called → clears cart → saves `lastOrder` in context
4. Navigates to **Confirmation page** which reads `lastOrder` for the order ID and total

---

## Adding a New Product

1. Open `src/data/products.js`
2. Add a new entry to the `PRODUCTS` array:

```js
{
  id: 'giloy',            // unique kebab-case ID
  name: 'Giloy Tablets',  // display name
  sub: 'Immunity · 60ct', // subtitle shown in small caps
  cat: 'supplements',     // must match a CATEGORIES id
  price: 380,             // selling price in INR
  mrp: 460,               // original MRP (for showing discount)
  rating: 4.6,            // 1–5
  reviews: 310,            // review count (display only)
  stock: 145,             // set to 0 to show "Out of stock"
  hue: 80,               // not used in SVG directly
  swatch: '#3F7A2E',      // hex colour for the SVG botanical
  blurb: 'Immunity-boosting herb, known as Amrita.',
  benefits: ['Boosts immunity', 'Anti-inflammatory', 'Liver support'],
  use: '1 tablet twice daily with water.',
  ingredients: 'Giloy (Tinospora cordifolia) extract 500mg.',
}
```

3. It automatically appears in the Listing page, search, and admin Products table.

---

## Scripts

### Client
| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (port 5173) |
| `npm run build` | Production build → `dist/` folder |
| `npm run preview` | Preview the production build locally |

### Server
| Command | Description |
|---|---|
| `node index.js` | Start Express server (port 4000) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 (via Vite) |
| Routing | React Router v7 |
| Styling | Vanilla CSS (CSS Custom Properties) |
| State management | React Context API |
| Build tool | Vite 8 |
| Backend | Node.js + Express 5 |
| Database | In-memory (JavaScript objects in `store.js`) |
| Fonts | Google Fonts — Cormorant Garamond + Outfit |
| HTTP proxy | Vite `server.proxy` → Express on port 4000 |

> **Note:** The data store (`server/data/store.js`) is in-memory only.
> All data resets when the server restarts. To make data persistent,
> replace the store with a real database like MongoDB, PostgreSQL, or SQLite.

---

*Built with React + Express · Aruvedic Wellness Pvt. Ltd. · 2026*
