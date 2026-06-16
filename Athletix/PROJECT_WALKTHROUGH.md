# ⚡ Athletix - Project Walkthrough & Developer Guide

## 📖 Introduction
This document serves as a comprehensive technical guide for developers and project reviewers exploring the **Athletix** codebase. It details the architecture, technology choices, state management patterns, and the current implementation status of this premium sports e-commerce platform.

---

## 🛠️ Technology Stack

**Athletix** is a modern Single Page Application (SPA) built for performance and user experience.

### Core Framework
- **Frontend Framework:** `React 19`
- **Build Tool:** `Vite 7` (Ensures fast Hot Module Replacement and optimized builds)
- **Language:** JavaScript (ES6+ Modules)
- **Routing:** `react-router-dom v7`

### User Interface & Styling
- **Styling Strategy:** Vanilla CSS with a global variable system (`index.css`) for consistent theming (colors, spacing, typography).
- **Animations:**
  - `framer-motion`: Used for complex component transitions.
  - `aos` (Animate On Scroll): Used for scroll-triggered reveal effects.
  - **Micro-interactions:** Custom CSS transitions for hover states and button clicks.
- **Icons:** `lucide-react` for a consistent, modern icon set.
- **Notifications:** `react-hot-toast` for non-intrusive user alerts.

### Backend & Services
- **Authentication:** `Firebase Auth` (Google Sign-In & Email/Password).
- **Primary Database:** `MongoDB` (Served via custom Node.js/Express backend).
- **Data Persistence (Current):** Backend database integration mapped to React components, replacing localized `localStorage` defaults.

---

## 🏗️ Architecture & Directory Structure

The project follows a feature-based modular structure within `src/`.

```text
src/
├── assets/             # Static media (images, videos)
├── components/         # Reusable UI components
│   ├── Footer.jsx      # Global Footer
│   ├── Header.jsx      # Global Navigation
│   ├── MicroInteractions.jsx # Toast & small UI utilities
│   └── ...
├── config/             # External service configurations
│   └── backendApi.js   # API client configuration (replaced supabase)
├── context/            # Global State Management (React Context)
│   ├── AuthContext.jsx # User session & profile state
│   ├── CartContext.jsx # Shopping cart logic
│   └── WishlistContext.jsx # Favorites logic
├── data/               # Static mock data (products list)
├── firebase/           # Firebase specific setup
│   └── config.js       # Auth initialization
├── pages/              # Main Route Views
│   ├── Home.jsx        # Landing page
│   ├── Shop.jsx        # Product listing with filters
│   ├── ProductDetails.jsx # Single product view
│   ├── Cart.jsx        # Cart management
│   ├── Checkout.jsx    # Order finalization
│   └── Auth.jsx        # Login/Register forms
├── services/           # Backend Interaction Layer
│   └── database.js     # Abstracted database operations
├── App.jsx             # Main Router & Provider composition
└── main.jsx            # Entry point
```

---

## 🧩 Key Implementation Details

### 1. State Management Pattern
The application uses the **Context Provider Pattern** to manage global state without prop drilling.
- **Providers:** Wrappers like `<authProvider>`, `<cartProvider>` enclose the application in `App.jsx`.
- **Logic:** Each context file (e.g., `AuthContext.jsx`) uses `useReducer` to handle complex state logic (Login, Logout, Add Address, etc.).

### 2. Service Layer Pattern (`src/services/`)
To decouple the UI from the backend, direct database calls are avoided in components. Instead, `src/services/database.js` defines static classes:
- `UserService`: Handles user profile creation and updates.
- `OrderService`: Manages order creation and history fetching.
- `AddressService`: CRUD operations for user delivery addresses.

*Note: The service layer seamlessly abstracts the internal API routes (`/api/users`, etc.) from the UI components via Axios/Fetch.*

### 3. Authentication Flow
1.  **Trigger:** User clicks "Sign in with Google" or submits the Login form.
2.  **Process:** `AuthContext` calls `firebase/auth`.
3.  **Session:** On success, the Firebase User object is normalized and stored in the global `user` state.
4.  **Persistence:** Session data is synced to `localStorage` to persist across interacting sessions.

### 4. Product Browsing & Filtering
- **Shop Page:** Implements client-side filtering for robust performance.
- **Filters:** Category, Price Range, and Brand.
- **Search:** Real-time filtering of the product array based on search input.

---

## 🚀 Setup & Execution Guide

### Prerequisites
- Node.js `v18+`
- npm or yarn

### Installation
1.  **Clone & Install:**
    ```bash
    git clone [repo-url]
    npm install
    ```

2.  **Environment Setup (Optional for Dev):**
    The app runs in "Demo Mode" without keys, but for full functionality, configure `src/firebase/config.js` with your Firebase credentials.

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

---

## 🔮 Roadmap / Pending Implementations

1.  **Full Database Wiring:** Complete migration of `AuthContext` to fetch directly from `localhost:5000/api` avoiding any remaining `localStorage` defaults.
2.  **Payment Gateway:** Integrate Stripe or Razorpay in `Checkout.jsx`.
3.  **Admin Dashboard:** Create a separate route/layout for product and order management.
