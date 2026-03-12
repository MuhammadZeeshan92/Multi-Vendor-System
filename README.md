# Multi‑Vendor E‑Commerce System

A comprehensive MERN stack (MongoDB, Express, React, Node.js) multi-vendor marketplace platform. This system allows independent sellers to create their own stores, manage products, and handle sales, while providing buyers with a seamless shopping experience featuring secure checkout via Stripe and AI-powered assistance.

---

## 1. Project Overview
This project is a multi-tenant e-commerce platform designed to facilitate transactions between multiple vendors and customers. It features:
- **Three-Tier User Roles**: Admin, Seller (Vendor), and Buyer.
- **Vendor Storefronts**: Personalized pages for each seller with their specific products.
- **Product Discovery**: Global product search, filtering, and pagination.
- **Advanced Cart System**: Multi-vendor cart management with session persistence.
- **Secure Payments**: Integrated Stripe Checkout with webhook handling for order fulfillment.
- **AI Integration**: A dedicated chatbot for system assistance.
- **Admin Management**: Overview of system users, vendor approvals, and revenue tracking.

---

## 2. Tech Stack

### Frontend
- **React.js (Vite)**: Modern frontend library and build tool.
- **Redux Toolkit**: Centralized state management for auth, cart, and shop data.
- **Tailwind CSS**: Utility-first CSS framework for premium UI design.
- **React Router Dom**: Client-side routing with role-based guards.

### Backend
- **Node.js & Express.js**: Server-side runtime and web framework.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM).
- **JWT (JSON Web Token)**: Secure authentication and session management.
- **Stripe API**: Payment processing and webhook handling.
- **Cloudinary**: Cloud-based image management for product and profile media.
- **OpenRouter API**: Powering the system's AI chatbot.

---

## 3. Project Structure

```text
multiVendorSystem/
├── Backend/                # Express API
│   ├── config/             # DB connection & global configs
│   ├── controllers/        # Business logic for all modules
│   ├── middleware/         # Auth, Authorization & error handlers
│   ├── models/             # Mongoose Schemas (User, Vendor, Product, etc.)
│   ├── routes/             # API route definitions
│   ├── seedAdmin.js        # Script to initialize admin user
│   └── server.js           # Server entry point
├── Frontend/               # React Application
│   ├── src/
│   │   ├── app/            # Redux store setup
│   │   ├── components/     # UI components (Navbar, Sidebar, ProductCard, etc.)
│   │   ├── features/       # Redux slices logic (authSlice, productSlice, etc.)
│   │   ├── layouts/        # Role-specific layouts (Admin, Vendor, Buyer)
│   │   ├── pages/          # All view components
│   │   ├── routes/         # Protected and Role-based route guards
│   │   ├── utils/          # API helpers and constants
│   └── tailwind.config.js  # Styling system configuration
└── README.md
```

---

## 4. Architecture Overview

### Core Technologies
- **Frontend**: [React.js](https://reactjs.org/) (Vite), [Redux Toolkit](https://redux-toolkit.js.org/) for state management.
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/).
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/) ODM.

### Key Libraries & Tools
- **Authentication**: JWT (JSON Web Tokens), Bcrypt for password hashing.
- **Payments**: [Stripe API](https://stripe.com/).
- **Media Storage**: [Cloudinary](https://cloudinary.com/).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/).
- **AI**: [OpenRouter API](https://openrouter.ai/).
- **Other**: Axios (API requests), React Router Dom (Navigation), React Toastify (Notifications).

### MVC Pattern
The backend adheres to a strict MVC (Model-View-Controller) pattern, ensuring clean separation of data, logic, and routing.

### Data Flow
1.  **Client Request**: Frontend sends an Axios request to the REST API.
2.  **Middleware**: `protect` middleware validates the JWT from cookies; `authorizeRoles` checks permissions.
3.  **Controller**: Executes business logic (e.g., creating a product, processing a payment).
4.  **Database**: Interacts with MongoDB via Mongoose models.
5.  **Response**: Returns structured JSON to the client.

---

## 5. Frontend Documentation

### Navigation & Role-Based Routing
The application uses `React Router` with custom guards to control access:
- **Public**: Home, Product Discovery, Vendor Profiles, Authentication.
- **ProtectedRoute**: Ensures the user is logged in.
- **RoleRoute**: Restricted access based on roles:
    - **Buyer**: Dashboard, Order History, Followed Vendors.
    - **Seller (Vendor)**: Store Management, Product Creation, Sales Analytics.
    - **Admin**: System-wide User/Vendor management, Revenue stats.

### Core Layouts
- **BuyerLayout**: Sidebar-driven navigation for customer account management.
- **VendorLayout**: Modern dashboard layout with sales and inventory tools.
- **AdminLayout**: High-level system overview and management interface.

### State Management (Redux)
- **authSlice**: Manages user session, login/logout, and profile state.
- **productSlice**: Handles global product listing, filtering, and detail views.
- **cartSlice**: Client-side cart logic with session storage persistence.
- **orderSlice**: Manages order creation and tracking.
- **vendorSlice**: Handles vendor registration and storefront data.
- **adminSlice**: Manages system users and global stats.

---

## 6. Backend Documentation (Complete API Reference)

### 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/register` | Register a new user (Buyer/Seller) |
| **POST** | `/login` | Authenticate user and set JWT cookie |
| **POST** | `/logout` | Clear session cookies |
| **GET** | `/me` | Get currently logged-in user profile |

### 🛍️ Products (`/api/products`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Get all products (with pagination/filters) | Public |
| **GET** | `/:id` | Get single product details | Public |
| **GET** | `/top-rated` | Get featured/top-rated products | Public |
| **POST** | `/` | Create a new product | Seller |
| **GET** | `/vendor` | Get products belonging to the logged-in seller | Seller |
| **PUT** | `/:id` | Update product details | Seller |
| **DELETE** | `/:id` | Remove a product | Seller |

### 🏬 Vendors (`/api/vendors`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | List all active vendors | Public |
| **GET** | `/:id` | Get vendor storefront profile | Public |
| **GET** | `/:id/products` | Get products of a specific vendor | Public |
| **POST** | `/create` | Initialize vendor store | Seller |
| **PUT** | `/:id` | Update vendor profile (logo, banner, etc.) | Seller |

### 🛒 Orders (`/api/orders`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Create order & Stripe Checkout session | Buyer |
| **GET** | `/my` | Get current customer's order history | Buyer |
| **GET** | `/vendor` | Get sales orders for a specific seller | Seller |
| **GET** | `/success` | Retrieve order details via Stripe session ID | Public |

### 🛡️ Admin (`/api/admin`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/dashboard` | System-wide statistics and overview |
| **GET** | `/users` | List all registered users |
| **GET** | `/vendors` | List all vendor accounts |
| **GET** | `/active-users` | Count of currently active buyers |
| **GET** | `/active-sellers` | Count of currently active sellers |
| **PUT** | `/users/:id` | Toggle user status (Active/Inactive) |
| **PUT** | `/users/:id/block` | Block/Unblock a user account |
| **GET** | `/commission` | View system revenue from sales commissions |

### 👤 Buyer (`/api/buyers`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/dashboard` | Buyer account overview |
| **GET** | `/vendors` | List vendors followed by the buyer |
| **POST** | `/vendors/:id/follow` | Follow a specific vendor |
| **DELETE** | `/vendors/:id/follow` | Unfollow a vendor |
| **PUT** | `/profile` | Complete/Update buyer profile information |

### 🤖 Chatbot (`/api/chat`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/` | Send message to AI assistant (OpenRouter) |

### ☁️ Cloudinary (`/api`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| **GET** | `/cloudinary-signature` | Generate secure signature for uploads | Seller |

### 🪝 Webhooks (`/api`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/stripe-webhook` | Handles Stripe checkout fulfillment (Stock reduction, revenue split) |

---

## 7. Database Schema

- **User**: Name, Email, Password (hashed), Role (Admin/Seller/Buyer), Status (Active/Blocked).
- **Vendor**: Store details, revenue tracking, stats, and link to User.
- **Buyer**: Following list, purchase stats, and link to User.
- **Product**: Name, price, stock, images, category, and vendor link.
- **Order**: Customer link, items list, total amount, shipping info, payment status (Stripe tracking).
- **Admin**: Global platform revenue and commission records.

---

## 8. Environment Configuration

### Backend `.env`
```env
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=secure_session_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
OPENROUTER_API_KEY=sk-or-...
CLOUDINARY_CLOUD_NAME=name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
CLIENT_URL=http://localhost:5173
```

---

## 9. Setup & Installation Guide

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Stripe Account (for API keys)

### Steps

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd multiVendorSystem
    ```

2.  **Backend Setup**
    ```bash
    cd Backend
    npm install
    # Create .env and add variables
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd ../Frontend
    npm install
    # Create .env and add variables
    npm run dev
    ```

4.  **Database Connection**
    Ensure your MongoDB instance is running and the `MONGO_URI` is correctly set in the backend `.env`.

---

## 10. Key Features & Business Logic

### Ordering Flow
1.  Buyer adds items from one or more vendors to the cart.
2.  Redux persists the cart in session storage.
3.  On checkout, Backend creates an `Order` with `Pending` status and generates a Stripe session.
4.  User is redirected to Stripe; upon payment, Stripe sends a webhook to the backend.
5.  Backend updates order to `Paid` and updates vendor revenue/stock levels.

---

## 11. Dependencies

-   **Mongoose**: Simplifies MongoDB interactions with schema-based solutions.
-   **Stripe**: Handles the entire payment lifecycle securely.
-   **Redux Toolkit**: Standard toolset for efficient Redux development.
-   **Cloudinary**: Robust image management and transformation.
-   **Axios**: Promise-based HTTP client for the browser and node.js.
