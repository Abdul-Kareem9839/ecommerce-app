# Aurora — E-Commerce Product App

A full-stack product listing app: React (Vite + Tailwind + Framer Motion) frontend, Express/Node backend, MongoDB via Mongoose. Search, category/price filters, a persistent shopping cart, and a JWT-protected admin panel with full product CRUD.

## Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, React Router, Axios, lucide-react
- **Backend:** Node.js, Express, Mongoose, JWT (jsonwebtoken), bcryptjs
- **Database:** MongoDB (Atlas recommended)
- **Deployment:** Frontend → Vercel, Backend → Render

## Project structure

```
ecommerce-app/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # authController, productController
│   ├── middleware/         # auth (JWT + admin guard), errorHandler
│   ├── models/             # Product, User (Mongoose schemas)
│   ├── routes/             # authRoutes, productRoutes
│   ├── seed.js             # seeds sample products + admin user
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js         # axios instance, attaches JWT
    │   ├── context/             # CartContext (localStorage), AuthContext
    │   ├── components/          # Navbar, ProductCard, ProductGrid,
    │   │                        # SearchFilterBar, CartDrawer,
    │   │                        # ProductFormModal, ProtectedRoute
    │   └── pages/                # Home, AdminLogin, AdminDashboard
    └── .env.example
```

## Local setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# edit .env: MONGO_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, CLIENT_ORIGIN
npm run seed   # creates 10 sample products + the admin user
npm run dev    # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_BASE_URL=http://localhost:5000/api
npm run dev    # starts on http://localhost:5173
```

Admin login is at `/admin/login`, using the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from the backend `.env` (seeded by `npm run seed`).

## API reference

| Method | Route                     | Auth        | Description                              |
|--------|----------------------------|-------------|-------------------------------------------|
| GET    | /api/products               | Public      | List products (`search`, `category`, `minPrice`, `maxPrice`, `sort` query params) |
| GET    | /api/products/categories    | Public      | Distinct list of categories |
| GET    | /api/products/:id           | Public      | Single product |
| POST   | /api/products                | Admin JWT   | Create product |
| PUT    | /api/products/:id            | Admin JWT   | Update product |
| DELETE | /api/products/:id             | Admin JWT   | Delete product |
| POST   | /api/auth/login               | Public      | Returns JWT for admin/user |
| GET    | /api/auth/me                  | JWT         | Current user |

## Deployment

**Backend on Render**
1. New Web Service → connect this repo, root directory `backend`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add env vars: `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLIENT_ORIGIN` (your Vercel URL), `PORT` (Render sets this automatically).
4. After first deploy, run `npm run seed` once via Render's shell (or a one-off job) to create the admin user and sample products.

**Frontend on Vercel**
1. Import this repo, root directory `frontend`.
2. Framework preset: Vite. Build command: `npm run build`. Output dir: `dist`.
3. Add env var: `VITE_API_BASE_URL=https://<your-render-service>.onrender.com/api`.
4. Deploy. Update `CLIENT_ORIGIN` on Render to the resulting Vercel URL and redeploy the backend.

No localhost URLs are hardcoded anywhere — both sides read from environment variables (`VITE_API_BASE_URL` on the frontend, `MONGO_URI`/`CLIENT_ORIGIN` on the backend).

## Interesting feature

The cart is fully client-persisted (`localStorage`) and survives refreshes without a backend cart model, while quantity is clamped live against each product's live `stock` count — so you can never add more than what's actually in inventory. The admin dashboard's CRUD updates flow straight through the same `/api/products` endpoints the storefront reads, so edits (price, stock, new products) appear on the live grid without any cache invalidation logic.
