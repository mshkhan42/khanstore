# Khan Store Backend

Node.js + Express backend for Khan Store e-commerce website.

## Features
- RESTful API for products, users, cart, and orders
- MongoDB database
- JWT authentication
- Cart and order management
- Payment method field (Easypaisa, JazzCash, COD)

## Setup

1. Copy `.env.example` to `.env` and fill in your MongoDB URI and JWT secret.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /api/users/signup` – Register
- `POST /api/users/login` – Login
- `GET /api/products` – List products
- `POST /api/products/demo` – Add demo products
- `GET /api/cart` – Get cart (auth)
- `POST /api/cart/add` – Add to cart (auth)
- `PUT /api/cart/update` – Update cart (auth)
- `DELETE /api/cart/remove` – Remove from cart (auth)
- `POST /api/orders` – Place order (auth)
- `GET /api/orders` – List orders (auth)
