# ⚡ Athletix - Premium Sports E-commerce Platform

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, feature-rich e-commerce platform for premium sports gear and athletic wear.**

[Live Demo](#) • [Features](#-features) • [Installation](#-installation) • [Tech Stack](#-tech-stack)

</div>

---

## 📸 Screenshots

<div align="center">
<table>
<tr>
<td><strong>🏠 Home Page</strong></td>
<td><strong>🛍️ Shop Page</strong></td>
</tr>
<tr>
<td>Modern hero section with featured products</td>
<td>Filter & sort products with ease</td>
</tr>
</table>
</div>

---

## ✨ Features

### 🛒 Shopping Experience
- **Product Catalog** - Browse through a wide range of sports products
- **Category Filtering** - Filter by category, price range, and brand
- **Product Search** - Quick search functionality
- **Product Details** - Detailed product pages with size selection
- **Shopping Cart** - Add, remove, and update quantities
- **Wishlist** - Save products for later

### 🔐 Authentication
- **Email/Password Login** - Traditional authentication
- **Google Sign-In** - One-click Google authentication via Firebase
- **Demo Account** - Quick demo access for testing
- **Persistent Sessions** - Stay logged in across sessions

### 👤 User Account
- **Profile Management** - Update personal information
- **Address Book** - Save multiple delivery addresses
- **Order History** - Track all your orders
- **Default Address** - Set preferred delivery address

### 💳 Checkout
- **Secure Checkout** - Streamlined checkout process
- **Multiple Payment Options** - UPI, Cards, Net Banking
- **Order Confirmation** - Instant order confirmation

### 🎨 Design & UX
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean, premium aesthetic
- **Smooth Animations** - Micro-interactions for better UX
- **Dark/Light Theme** - Eye-friendly color scheme

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, JavaScript ES6+ |
| **Build Tool** | Vite 7 |
| **Routing** | React Router DOM 7 |
| **Authentication** | Firebase Auth |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS with CSS Variables |
| **State Management** | React Context API + useReducer |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/animeshD06/Athletix.git
   cd Athletix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase** (Optional - for Google Auth)
   
   Create a Firebase project and update `src/firebase/config.js` with your credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     // ... other config
   };
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## Docker Setup

### Prerequisites

- Docker Desktop installed and running

### Start with Docker Compose

1. **Open a terminal in the project folder**
   ```bash
   cd Athletix
   ```

2. **Review backend environment values**
   The file `backend/.env` has been added with Docker-friendly defaults for MongoDB.
   Replace these placeholders before testing payments:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

3. **Build and start the containers**
   ```bash
   docker compose up --build
   ```

4. **Open the app**
   ```text
   Frontend: http://localhost:8080
   Backend:  http://localhost:5001
   MongoDB:  mongodb://localhost:27018
   ```

### Stop Docker

```bash
docker compose down
```

To remove the MongoDB volume too:

```bash
docker compose down -v
```

---

## 📁 Project Structure

```
athletix/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and media
│   ├── components/      # Reusable UI components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   └── ...
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── data/            # Static data (products)
│   ├── firebase/        # Firebase configuration
│   │   └── config.js
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Shop.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Auth.jsx
│   │   ├── Account.jsx
│   │   └── ...
│   ├── App.jsx          # Main app component
│   ├── App.css          # Global styles
│   ├── index.css        # CSS variables & base styles
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔐 Demo Credentials

For quick testing, use the demo account:

| Field | Value |
|-------|-------|
| **Email** | demo@athletix.com |
| **Password** | demo123 |

Or simply click **"Sign in with Google"** for instant access!

---

## 🎯 Roadmap

- [ ] Payment Gateway Integration (Razorpay/Stripe)
- [ ] Email Notifications
- [ ] Product Reviews & Ratings
- [ ] Admin Dashboard
- [ ] Inventory Management
- [ ] Coupon & Discount System
- [ ] PWA Support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Animesh D**

- GitHub: [@animeshD06](https://github.com/animeshD06)

---

<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ and ⚡ by Animesh

</div>
