### E‑Commerce NEXT.js

A full‑stack, production‑ready e‑commerce application built with Next.js (App Router), React, Tailwind CSS, PostgreSQL, JWT auth, Cloudinary asset management, and Flutterwave payments. Includes an admin dashboard for product/catalog management and a public storefront with cart, checkout, and order verification.

## Folder Structure

```bash
e-commerce_NEXTJS/
├─ app/
│  ├─ eslint.config.mjs
│  ├─ jsconfig.json
│  ├─ next.config.mjs
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public/
│  │  ├─ assets.js
│  │  ├─ product.js
│  │  └─ ...static images
│  └─ src/
│     ├─ app/
│     │  ├─ (admin)/
│     │  │  ├─ admin-add-product/
│     │  │  ├─ admin-dashboard/
│     │  │  ├─ admin-edit-brand/
│     │  │  ├─ admin-edit-categories/
│     │  │  ├─ admin-edit-hero-page/
│     │  │  ├─ admin-edit-icons/
│     │  │  ├─ admin-edit-product/
│     │  │  ├─ globals.css
│     │  │  └─ layout.js
│     │  ├─ (auth)/
│     │  │  ├─ globals.css
│     │  │  ├─ layout.js
│     │  │  └─ login/
│     │  ├─ (public)/
│     │  │  ├─ all-products/
│     │  │  ├─ cart/
│     │  │  ├─ product/[id]/
│     │  │  ├─ verifyPayment/
│     │  │  ├─ globals.css
│     │  │  └─ layout.js
│     │  ├─ api/v1/
│     │  │  ├─ admin/
│     │  │  │  ├─ brand/
│     │  │  │  ├─ category/
│     │  │  │  ├─ dashboard/
│     │  │  │  │  ├─ analytics/
│     │  │  │  │  └─ orders_summary/
│     │  │  │  ├─ hero_carousel/
│     │  │  │  ├─ products/
│     │  │  │  └─ trust_signals/
│     │  │  ├─ auth/
│     │  │  │  ├─ checkUserLogin/
│     │  │  │  ├─ login-user/
│     │  │  │  ├─ logout/
│     │  │  │  └─ register/
│     │  │  ├─ cart/
│     │  │  │  ├─ [id]/
│     │  │  │  └─ route.js
│     │  │  ├─ general/
│     │  │  │  ├─ brand/
│     │  │  │  ├─ category/
│     │  │  │  ├─ hero_carousel/
│     │  │  │  ├─ products/
│     │  │  │  │  ├─ [id]/
│     │  │  │  │  └─ featured/
│     │  │  │  └─ trust_signals/
│     │  │  ├─ payment/
│     │  │  └─ verify_transaction/
│     │  ├─ globals.css
│     │  ├─ layout.js
│     │  └─ not-found.jsx
│     ├─ components/
│     │  ├─ (admin)/
│     │  └─ (public)/
│     ├─ context/
│     │  ├─ cartContext.jsx
│     │  ├─ generalContext.jsx
│     │  └─ userContext.jsx
│     ├─ lib/
│     │  ├─ cloudinary.js
│     │  ├─ db.js
│     │  ├─ models/
│     │  └─ utils/
│     └─ middleware.ts
├─ LICENSE
└─ README.md
```

## Short Description

- A modern e‑commerce platform with a clean UX, SEO‑friendly pages, server‑side APIs, and an admin suite.
- Uses PostgreSQL for data persistence, JWT for authentication via cookies, Cloudinary for media, and Flutterwave for payments and post‑payment verification.

## Key Features

- **Public Storefront**
  - Product listing, sorting, and detail pages
  - Cart and quantity management
  - Secure checkout with Flutterwave
  - Transaction verification and order finalization
- **Admin Dashboard**
  - Create, edit, and manage products
  - Manage categories, brands, hero carousel, and trust signals
  - Analytics and orders overview
- **Authentication & Authorization**
  - JWT‑based auth stored in HTTP‑only cookies
  - Admin‑only routes protected by token verification
- **Media & Assets**
  - Cloudinary integration for optimized media handling
- **Tech Stack**
  - Next.js 15 (App Router), React 19
  - Tailwind CSS 4 with DaisyUI
  - PostgreSQL (`pg`) with support for Neon serverless
  - Axios, React‑Toastify, Lucide icons

## Installation

1) **Prerequisites**
- Node.js 18+ (recommended 20+)
- npm 9+ (or pnpm/yarn)
- PostgreSQL database (local or managed like Neon)
- Cloudinary account
- Flutterwave account

2) **Clone and install**

```bash
git clone <your-repo-url> e-commerce_NEXTJS
cd e-commerce_NEXTJS/app
npm install
```

3) **Environment variables**

Create an `.env.local` file in `app/` with:

```bash
# Database
DATABASE_URL=postgres://user:password@host:port/dbname

# Auth
SECRET_JWT_TOKEN=your_jwt_secret

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# Flutterwave
FLW_PUBLIC_KEY=your_public_key
FLW_SECRET_KEY=your_secret_key

# Optional: set NODE_ENV to production in production environments
# NODE_ENV=production
```

Ensure your database has the required tables (`users`, `products`, `product_images`, `category`, `brand`, `hero_carousel`, `trust_signal`, `carts`, `orders`, `order_items`). Provisioning/migrations are not bundled; create schema manually or via your preferred migration tool.

4) **Development**

```bash
npm run dev
```

- App runs at `http://localhost:3000`.

5) **Production build**

```bash
npm run build
npm run start
```

## Usage

- **Local development**
  - Visit the storefront at `http://localhost:3000`
  - Admin dashboard is under the `(admin)` routes; ensure your test user has `role=admin` or `role=demo-admin` in the JWT payload for access
- **Authentication**
  - Auth token is stored as `auth_token` in HTTP‑only cookies
- **Payments**
  - Checkout triggers Flutterwave payment initialization and redirects to `verifyPayment` for verification on return
- **Media**
  - Cloudinary configuration is loaded on server startup; uploads use your configured Cloudinary credentials

Common commands:

```bash
# Start dev server
npm run dev

# Lint
npm run lint

# Build (production)
npm run build

# Start (production)
npm run start
```

## Contribution Guidelines

- Open an issue describing proposed changes before submitting a PR
- Fork the repo and create feature branches from `main`
- Keep edits focused and well‑scoped; add tests where applicable
- Follow existing code style and formatting
- Ensure `npm run build` and `npm run lint` pass locally
- Provide clear PR descriptions and screenshots for UI changes

## License

This project is licensed under the terms of the LICENSE file included in the repository. See `LICENSE` for details.

## Authors or Credits

- Author: Winston  



