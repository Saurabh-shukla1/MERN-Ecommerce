import express, { json } from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/auth/auth-route.js';
import adminProductsRouter from './routes/admin/products-routes.js';
import shopProductsRouter from './routes/shop/products-routes.js';
import shopCartRouter from './routes/shop/cart-routes.js';
import shopAddressRouter from './routes/shop/address-routes.js';
import shopOrderRouter from './routes/shop/order-routes.js';
import shopSearchRouter from './routes/shop/search-routes.js';
import adminOrderRouter from './routes/admin//order-routes.js';
import shopReviewRouter from './routes/shop/review-routes.js';
import commonFeatureRouter from './routes/common/feature-routes.js';


connect(process.env.MONGODB_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


const app = express()
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: 'http://localhost:5173', // Adjust this to your frontend URL
        credentials: true, // Allow cookies to be sent
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: [
            'Content-Type', 
            'Authorization', 
            'X-Requested-With', 
            'cache-control', 
            'Expires', 
            'Pragma'],
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', router);
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/shop/products', shopProductsRouter);
app.use('/api/shop/cart', shopCartRouter);
app.use('/api/shop/address', shopAddressRouter);
app.use('/api/shop/order', shopOrderRouter);
app.use('/api/admin/orders', adminOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/review', shopReviewRouter);
app.use('/api/common/feature', commonFeatureRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));