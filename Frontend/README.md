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
 ├── components/     # Reusable UI
 ├── pages/          # Route views
 ├── routes/         # Protected/role route helpers
 ├── hooks/          # Custom hooks (toast)
 ├── utils/          # API and constants
 └── layouts/        # Vendor/admin layouts
```

## Tailwind CSS

Configuration lives in `tailwind.config.js`, with custom colors and Inter font imported in `index.html`. Base styles imported via `@tailwind` directives in `src/index.css`.

## Notes

- JWT is never stored on client; authentication uses `withCredentials: true` and `GET /api/auth/me` on refresh.
- Cart persists between reloads using `sessionStorage`.
- Vendor/admin routes require proper roles; unauthorized users see a 403 page.

## License

MIT