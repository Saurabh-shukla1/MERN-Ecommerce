import express from 'express';
import {
    addProductReview,
    getProductReviews
} from '../../controllers/shop/product-review-controller.js';



const shopSearchRouter = express.Router();

shopSearchRouter.post('/add', addProductReview);
shopSearchRouter.get('/:productId', getProductReviews);

export default shopSearchRouter;