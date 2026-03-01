# Multi Vendor E-Commerce Frontend

Production-ready React “Marketplace” frontend built with Vite, React Router v6, Redux Toolkit, Tailwind CSS and Axios. Supports buyers, sellers, and admin roles with full multi‑vendor features and Stripe/Cloudinary integration.

## Features

- Buyer/Buyer authentication with HTTP-only JWT cookies
- Product listing & detail pages with search, filters, pagination
- Cart persisted in session storage
- Stripe Checkout redirect flow
- Vendor dashboard, sales, and product management
- Admin dashboard with user management and commission reports
- Role‑based routing and protections
- Tailwind CSS theming matching professional marketplace style
- Cloudinary unsigned image upload for vendor products

## Getting Started

1. **Clone and install dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Create environment file**
   Copy `.env.example` or edit `.env` with required keys:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Structure

Key directories under `src/`:

```
src/
 ├── app/            # Redux store
 ├── features/       # Redux slices
 ├── components/     # Reusable UI (Hero, ProductCard, Vendor* components, filters)
 ├── pages/          # Route views (landing, products, vendors, cart, checkout, dashboards)
 ├── routes/         # Protected/role route helpers
 ├── hooks/          # Custom hooks (toast)
 ├── utils/          # API and constants
 └── layouts/        # Vendor/admin layouts
```

### Key Routes

- `/` – Marketing landing page with hero, top‑rated products, featured vendors, and CTAs
- `/products` – Full product listing with search, filters, vendor chips, and pagination
- `/products/:id` – Product detail with gallery, vendor profile snippet, and “More from this seller”
- `/vendors` – Featured vendor directory
- `/vendors/:id` – Public vendor storefront with vendor profile and product grid
- `/cart` – Multi‑vendor cart view grouped by vendor
- `/checkout` – Checkout with grouped cart summary and Stripe session redirect

### Design System

- **Palette**: Indigo (primary), Emerald (success), Amber (accent/low‑stock), Red (danger), gray backgrounds
- **Typography**: Inter font, `font-semibold` headings, `text-gray-700` body copy
- **Layout**: `container max-w-7xl mx-auto px-4 md:px-6`, card components use `rounded-xl border border-gray-100 shadow-sm`
- **Buttons**: Primary actions use `bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg px-5 py-2 font-medium`
- **Badges**: Stock states—emerald (in stock), amber (low stock), red (out of stock)

## Tailwind CSS

Configuration lives in `tailwind.config.js`, with custom colors and Inter font imported in `index.html`. Base styles imported via `@tailwind` directives in `src/index.css`.

## Notes

- JWT is never stored on client; authentication uses `withCredentials: true` and `GET /api/auth/me` on refresh.
- Cart persists between reloads using `sessionStorage`.
- Vendor/admin routes require proper roles; unauthorized users see a 403 page.

## License

MIT