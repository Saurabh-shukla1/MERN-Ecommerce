

import express from 'express';
import { addToCart,
    deleteCartItem,
    fetchCartItem,
    updateCartItemQty
 } from '../../controllers/shop/cart-controller.js';


const shopCartRouter = express.Router();

shopCartRouter.post('/add', addToCart);
shopCartRouter.get('/get/:userId', fetchCartItem);
shopCartRouter.put('/update', updateCartItemQty);
shopCartRouter.delete('/delete/:userId/:productId', deleteCartItem);

export default shopCartRouter;
