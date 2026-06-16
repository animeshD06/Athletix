# Backend Implementation Guide

## 📌 Overview
This document explains the complete migration of the Athletix project database from PostgreSQL (Supabase) to **MongoDB**. The backend has been carefully refactored using **Node.js, Express, and Mongoose** to provide a robust, scalable, and modern RESTful API replacing direct frontend database interactions.

## 🛠️ Tech Stack Used
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Middleware:** CORS, Helmet (Security), Morgan (Logging)
* **Environment Management:** dotenv

## 🤔 Why MongoDB was Chosen
1. **Schema Flexibility:** MongoDB's dynamic schemas allow for highly adaptable models, which is perfect for e-commerce stores where product attributes and cart variations often change.
2. **Embedded Documents:** MongoDB easily supports nesting documents. We can embed `addresses` directly inside a `User` document, and `order items` within an `Order` document, significantly reducing expensive SQL JOIN operations and matching real-world data structures intuitively.
3. **MERN Stack Ecosystem:** Integrating a MongoDB/Express backend seamlessly aligns with a React frontend (MERN stack paradigm) allowing unified JSON handling from the database straight to the client.

## 📁 Project Structure

```text
backend/
├── config/
│   └── db.js               # MongoDB connection logic using Mongoose
├── controllers/
│   ├── cartController.js   # Logic for cart items (add, update, clear, fetch)
│   ├── orderController.js  # Order creation, fetching, status updates
│   ├── userController.js   # User profiles, auth, and embedded address management
│   └── wishlistController.js # Wishlist management logic
├── models/
│   ├── Cart.js             # Mongoose schema for cart items
│   ├── Order.js            # Mongoose schema for orders and embedded order items
│   ├── User.js             # Mongoose schema for users and embedded addresses
│   └── Wishlist.js         # Mongoose schema for user wishlists
├── routes/
│   ├── cartRoutes.js       # Express routes for pointing to cart controllers
│   ├── orderRoutes.js      # Express routes for pointing to order controllers
│   ├── userRoutes.js       # Express routes for pointing to user controllers
│   └── wishlistRoutes.js   # Express routes for pointing to wishlist controllers
├── .env                    # Environment variables (Mongo URI, Port)
├── package.json            # Node dependencies and scripts
└── server.js               # Entry point, middleware, and route configuration
```

### Folder-wise Explanation
1. **models:** Defines the Mongoose schemas representing the core business entities. Includes data normalization and defaults.
2. **controllers:** Encapsulates core business logic so routes stay clean. Extracts request data, interacts with Mongoose models, and sends JSON responses back to the client.
3. **routes:** Maps HTTP verbs (GET, POST, PUT, DELETE) and endpoints to their respective controller functions.

---

## 🏗️ Database Design

### Collections and Schemas

#### 1. Users Collection (`User` Model)
* **Description:** Represents a registered customer.
* **Fields:** `firebaseUid` (unique identifier tied to Firebase Auth), `email`, `displayName`, `phone`, `photoUrl`, `authProvider`, `lastLogin`.
* **Embedded Relationship:** `addresses` array. Each address holds `name`, `street`, `city`, `pincode`, `state`, `phone`, and a boolean `isDefault`.

#### 2. Orders Collection (`Order` Model)
* **Description:** Records an entire transactional purchase.
* **Fields:** `orderNumber` (unique), `userId` (ref User), totals (`subtotal`, `shippingCost`, `tax`, `total`), payment details (`paymentMethod`, `paymentStatus`), `shippingAddress` object, status tracking (`orderStatus`, `shippedAt`, etc.).
* **Embedded Relationship:** `items` array. Every order captures a snapshot of the products using inner objects: `productId`, `name`, `price`, `quantity`, `selectedColor`, `selectedSize`.

#### 3. Cart Collection (`Cart` Model)
* **Description:** Temporary shopping cart data.
* **Fields:** `userId` (ref User), `productId`, `quantity`, `selectedColor`, `selectedSize`.
* **Constraint:** Enforces a unique combination of `userId`, `productId`, `selectedColor`, and `selectedSize` (composite index) so modifying a variant updates quantity rather than making duplicate items.

#### 4. Wishlist Collection (`Wishlist` Model)
* **Description:** Saves user's favorite products.
* **Fields:** `userId` (ref User), `productId`.

### Relationships
* **1-to-Many (Referenced):** `User` to `Order`, `User` to `Cart`, `User` to `Wishlist` (Linked via `userId` referencing `User` ObjectIds).
* **1-to-Many (Embedded):** `User` contains multiple `Address` documents. `Order` contains multiple `OrderItem` documents.

---

## 🚀 MongoDB Setup

### 1. Installation Steps
1. Navigate to the newly created backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install express mongoose dotenv cors helmet morgan
   ```
3. Install development dependencies (optional but recommended):
   ```bash
   npm install -D nodemon
   ```

### 2. Connection String Setup
Create a `.env` file in the `backend/` root:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/athletix_db
NODE_ENV=development
```
_Note: Replace `mongodb://127.0.0.1:27017/athletix_db` with your MongoDB Atlas connection string if deploying to the cloud._

---

## 🌐 API Endpoints

### User & Addresses
| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| POST | `/api/users` | Upsert User Profile | `{ "firebaseUid": "...", "email": "test@test.com" }` |
| GET | `/api/users/:uid` | Get User Profile | - |
| PUT | `/api/users/:uid` | Update Profile | `{ "displayName": "New Name", "phone": "123" }` |
| POST | `/api/users/:uid/addresses` | Add Address | `{ "name": "Work", "city": "NYC", ... }` |
| GET | `/api/users/:uid/addresses` | List Addresses | - |

### Orders
| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| POST | `/api/orders` | Create an Order | `{ "firebaseUid": "...", "items": [...], "total": 100 }` |
| GET | `/api/orders/myorders/:uid`| Get User's Orders | - |
| GET | `/api/orders/:id` | Get Order by Mongo ID | - |
| PUT | `/api/orders/:id/status` | Update Order Status | `{ "status": "shipped" }` |

### Cart
| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| POST | `/api/cart` | Add to Cart | `{ "firebaseUid": "...", "productId": "1", "quantity": 1 }` |
| GET | `/api/cart/:uid` | Fetch Cart Items | - |
| PUT | `/api/cart/:id` | Update Item Quantity | `{ "quantity": 3 }` |
| DELETE| `/api/cart/:id` | Drop Item from Cart | - |

### Wishlist
| Method | Endpoint | Description | Request Body Example |
|---|---|---|---|
| POST | `/api/wishlist` | Add to Wishlist | `{ "firebaseUid": "...", "productId": "1" }` |
| GET | `/api/wishlist/:uid` | Fetch Wishlist Items | - |
| DELETE| `/api/wishlist/:uid/:productId` | Remove Wishlist Item | - |

---

## 💻 Code Explanation

### 1. `server.js` (The Entry Point)
Loads environment variables, initializes Express middleware (CORS, body parser, helmet), manages the MongoDB `connectDB()` call, and mounts all major routing modules (`/api/users`, `/api/orders`, etc.). It also has a final middleware catch-all that neatly formats API errors.

### 2. `config/db.js`
Utilizes `mongoose.connect()` asynchronously, connecting to `MONGO_URI` gracefully and logging connected status.

### 3. `models/User.js`
Defines the structure for the User. It uniquely relies on the `firebaseUid` from the frontend Google/Firebase Auth setup. A `mongoose.Schema` for `addresses` is initiated natively before the User schema allowing for the creation of `addresses: [addressSchema]`.

### 4. Controllers (e.g. `orderController.js`)
Takes the `.catch()` wrapping patterns and puts them inside simple `async/await` try/catch blocks. For instance, `createOrder` cross-verifies checking the user against the provided `firebaseUid`, dynamically builds a snapshot array out of request items mimicking a SQL JOIN, and creates the parent order efficiently.

---

## 🏃‍♂️ How to Run Backend

### Step 1: Open Terminal
Navigate to the backend directory:
```bash
cd backend
```

### Step 2: Start MongoDB
Ensure that your local MongoDB daemon (`mongod`) is running, or that your `.env` contains a valid MongoDB Atlas URI.

### Step 3: Run the Development Server
```bash
npm run dev
# OR
npm start
```

You should see output indicating successful connection:
```bash
Server running in development mode on port 5000
MongoDB Connected: 127.0.0.1
```

---

## 🔮 Future Improvements
1. **JSON Web Tokens (JWT):** Validate the Firebase tokens on the backend using `firebase-admin` to fully secure all `/api` endpoints rather than relying solely on `uid` passed via request bodies.
2. **Pagination Strategy:** Add `limit` and `skip` query support in the `getUserOrders` controller for high-volume purchasing customers.
3. **Product Inventory Model:** Introduce a separate `Product` schema in the backend to manage real-time inventory checks over relying strictly on frontend snapshots.
4. **Validation Library:** Insert `Joi` or `express-validator` middleware layer across routes to guarantee flawless input validation before Mongoose kicks into operations.
