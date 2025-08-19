# 🛒 MERN E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring modern UI/UX, secure authentication, payment integration, and comprehensive admin panel.

## ✨ Features

### 🔐 Authentication & Authorization
- **User Registration & Login** - Secure user authentication with JWT tokens
- **Role-based Access Control** - Separate admin and user dashboards
- **Password Encryption** - Bcrypt for secure password hashing
- **Protected Routes** - Route-level authentication guards

### 🛍️ Shopping Experience
- **Product Catalog** - Browse products with categories, brands, and filters
- **Advanced Search** - Search products by name, category, or brand
- **Product Details** - Detailed product views with images and descriptions
- **Shopping Cart** - Add, remove, and update cart items
- **Wishlist** - Save products for later
- **User Reviews** - Rate and review purchased products

### 📦 Order Management
- **Secure Checkout** - Streamlined checkout process
- **Address Management** - Multiple shipping addresses
- **Order Tracking** - Real-time order status updates
- **Order History** - Complete purchase history
- **PayPal Integration** - Secure payment processing

### 🎛️ Admin Dashboard
- **Product Management** - Add, edit, delete products
- **Order Management** - View and update order statuses
- **User Management** - Oversee user accounts
- **Analytics Dashboard** - Sales and performance metrics
- **Feature Management** - Control site banners and features

### 🎨 Modern UI/UX
- **Responsive Design** - Mobile-first responsive layout
- **Dark/Light Theme** - Toggle between themes
- **Modern Components** - Radix UI components with Tailwind CSS
- **Smooth Animations** - Enhanced user experience
- **Toast Notifications** - Real-time feedback

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Beautiful icons
- **React Toastify** - Notification system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image upload and management
- **PayPal SDK** - Payment processing
- **Multer** - File upload middleware

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- PayPal Developer Account
- Cloudinary Account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Saurabh-shukla1/MERN-Ecommerce.git
cd MERN-Ecommerce
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

### Environment Configuration

Create a `.env` file in the `server` directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/mern-ecommerce
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-ecommerce

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Server Configuration
PORT=5000
CLIENT_BASE_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# PayPal Configuration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

### Running the Application

1. **Start the server** (from server directory)
```bash
npm run dev
```

2. **Start the client** (from client directory, in new terminal)
```bash
npm run dev
```

3. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
MERN-Ecommerce/
├── client/                     # React frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── admin/          # Admin-specific components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── common/         # Shared components
│   │   │   ├── shopping/       # Shopping components
│   │   │   ├── theme/          # Theme provider
│   │   │   └── ui/             # UI components (Radix UI)
│   │   ├── pages/              # Page components
│   │   │   ├── admin/          # Admin pages
│   │   │   ├── auth/           # Auth pages
│   │   │   ├── shopping/       # Shopping pages
│   │   │   └── landingPage/    # Landing page
│   │   ├── store/              # Redux store
│   │   │   ├── admin/          # Admin state slices
│   │   │   ├── shop/           # Shopping state slices
│   │   │   └── auth-slice/     # Authentication state
│   │   ├── lib/                # Utilities
│   │   └── config/             # Configuration files
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express.js backend
│   ├── controllers/            # Route controllers
│   │   ├── admin/              # Admin controllers
│   │   ├── auth/               # Auth controllers
│   │   ├── common/             # Common controllers
│   │   └── shop/               # Shop controllers
│   ├── models/                 # Mongoose models
│   ├── routes/                 # API routes
│   │   ├── admin/              # Admin routes
│   │   ├── auth/               # Auth routes
│   │   ├── common/             # Common routes
│   │   └── shop/               # Shop routes
│   ├── helpers/                # Helper functions
│   ├── middleware/             # Custom middleware
│   ├── package.json
│   └── server.js               # Entry point
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check-auth` - Check authentication status

### Products
- `GET /api/shop/products/get` - Get all products
- `GET /api/shop/products/get/:id` - Get product by ID
- `GET /api/shop/search/:keyword` - Search products
- `POST /api/admin/products/add` - Add product (Admin)
- `PUT /api/admin/products/edit/:id` - Edit product (Admin)
- `DELETE /api/admin/products/delete/:id` - Delete product (Admin)

### Cart
- `POST /api/shop/cart/add` - Add item to cart
- `GET /api/shop/cart/get/:userId` - Get user cart
- `PUT /api/shop/cart/update-cart` - Update cart item
- `DELETE /api/shop/cart/:userId/:productId` - Remove from cart

### Orders
- `POST /api/shop/order/create` - Create order
- `GET /api/shop/order/list/:userId` - Get user orders
- `GET /api/shop/order/details/:id` - Get order details
- `GET /api/admin/orders/get` - Get all orders (Admin)
- `PUT /api/admin/orders/update/:id` - Update order status (Admin)

### Reviews
- `POST /api/shop/review/add` - Add product review
- `GET /api/shop/review/:productId` - Get product reviews

### Address
- `POST /api/shop/address/add` - Add address
- `GET /api/shop/address/get/:userId` - Get user addresses
- `PUT /api/shop/address/update/:userId/:addressId` - Update address
- `DELETE /api/shop/address/delete/:userId/:addressId` - Delete address

## 👥 User Roles

### Regular User
- Browse and search products
- Add products to cart and wishlist
- Place orders and make payments
- Manage shipping addresses
- View order history
- Write product reviews

### Admin User
- All user capabilities
- Manage products (CRUD operations)
- View and manage all orders
- Update order statuses
- View analytics and reports
- Manage site features and banners

## 🔧 Configuration

### Database Setup
1. **Local MongoDB**: Install MongoDB locally or use MongoDB Atlas
2. **Connection**: Update `MONGODB_URI` in server `.env` file

### Payment Setup
1. Create PayPal Developer Account
2. Get Client ID and Secret from PayPal Developer Dashboard
3. Update PayPal credentials in server `.env` file

### Image Upload Setup
1. Create Cloudinary Account
2. Get Cloud Name, API Key, and Secret
3. Update Cloudinary credentials in server `.env` file

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

### Linting
```bash
# Client
cd client
npm run lint

# Server
cd server
npm run lint
```

## 📱 Screenshots

*Add screenshots of your application here*

## 🚀 Deployment

### Heroku Deployment
1. Create Heroku app
2. Set environment variables in Heroku
3. Deploy using Git or GitHub integration

### Vercel/Netlify (Frontend)
1. Build the client application
2. Deploy the `dist` folder
3. Set environment variables

### MongoDB Atlas
1. Create MongoDB Atlas cluster
2. Update connection string in environment variables
3. Whitelist your deployment IP

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the database
- PayPal for payment integration
- Cloudinary for image management
- All open-source contributors

---

**Made with ❤️ by [Saurabh Shukla](https://github.com/Saurabh-shukla1)**