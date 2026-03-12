# Multi‑Vendor E‑Commerce System

A comprehensive MERN stack (MongoDB, Express, React, Node.js) multi-vendor marketplace platform. This system allows independent sellers to create their own stores, manage products, and handle sales, while providing buyers with a seamless shopping experience featuring secure checkout via Stripe and AI-powered assistance.

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

---

## 3. Project Structure

```text
multiVendorSystem/
├── Backend/                # Express API
│   ├── config/             # Database connection & configurations
│   ├── controllers/        # Business logic for endpoints
│   ├── middleware/         # Authentication & authorization logic
│   ├── models/             # Mongoose schemas (User, Vendor, Product, etc.)
│   ├── routes/             # API route definitions
│   ├── .env                # Backend environment variables
│   └── server.js           # Main entry point
├── Frontend/               # React Application
│   ├── src/
│   │   ├── app/            # Redux store configuration
│   │   ├── components/     # Reusable UI components
│   │   ├── features/       # Redux slices (auth, products, cart, etc.)
│   │   ├── layouts/        # Page layouts (Admin, Vendor, Buyer)
│   │   ├── pages/          # Application pages/views
│   │   ├── routes/         # Routing logic and guards
│   │   └── utils/          # API helper (Axios instance)
│   ├── .env                # Frontend environment variables
│   └── tailwind.config.js  # Styling configuration
└── README.md
```

---

## 4. Architecture Overview

### System Design
The application follows a standard **MERN** architecture:
1.  **Frontend**: A SPA (Single Page Application) built with React that communicates with the backend via RESTful APIs.
2.  **State Management**: Redux Toolkit manages global states like user authentication, cart items, and product listings.
3.  **Backend**: An Express server handles routing, business logic, and interacts with MongoDB.
4.  **Data Flow**:
    -   Requests are sent from React using Axios.
    -   Backend validates requests using custom middleware (Auth/Role).
    -   Controllers process data and interact with MongoDB via Mongoose.
    -   Responses are returned as JSON.

---

## 5. Frontend Documentation

### Navigation & Routing
Uses `react-router-dom` with role-based access control:
-   **Public Routes**: Home, Products, Vendor Storefronts, Login, Register.
-   **Protected Routes**:
    -   `BuyerLayout`: Dashboard, Orders, Completed Profile.
    -   `VendorLayout`: Dashboard, Product Management, Sales Tracking.
    -   `AdminLayout`: User Management, Commission Tracking, Vendor Management.

### Important UI Logic
-   **Infinite Scroll/Pagination**: Implemented in product listings.
-   **Interactive Components**: Carousels for featured vendors and top products.
-   **Toast Notifications**: Global alert system for success/error feedback.

---

## 6. Backend Documentation

### Key API Endpoints
| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Register a new user | No |
| **POST** | `/api/auth/login` | Login user & get cookie/token | No |
| **GET** | `/api/auth/me` | Get current authenticated user | Yes |
| **POST** | `/api/products` | Create a new product (Seller only) | Yes |
| **GET** | `/api/products` | Get all products with filters/pagination | No |
| **POST** | `/api/orders` | Create Stripe Checkout session | Yes |
| **GET** | `/api/vendors` | List all active vendors | No |
| **POST** | `/api/chat` | AI Chatbot interaction | No |

### Middleware
-   `protect`: Verifies the JWT token from cookies.
-   `authorizeRoles`: Restricts access based on user role (`admin`, `seller`, `buyer`).

---

## 7. Database Schema

### Models & Relationships
-   **User**: Stores base credentials, roles, and status.
-   **Vendor**: Extended profile for sellers (store name, revenue, bio). Linked to `User` (1:1).
-   **Buyer**: Extended profile for purchasers (followed vendors, stats). Linked to `User` (1:1).
-   **Product**: Contains details, price, stock, and links to `Vendor` (N:1).
-   **Order**: Tracks customer, items, total amount, and Stripe session status.
-   **Admin**: Tracks global system commission and revenue.

---

## 8. Environment & Configuration

### Backend (.env)
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
OPENROUTER_API_KEY=your_ai_key
CLOUDINARY_CLOUD_NAME=...
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=...
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
