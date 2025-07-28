import express from 'express';
import {
    getFilteredProducts,
    getProductsDetails
} from '../../controllers/shop/products-controller.js';



const shopProductsRouter = express.Router();

shopProductsRouter.get('/get', getFilteredProducts);
shopProductsRouter.get('/get/:id', getProductsDetails);


export default shopProductsRouter;