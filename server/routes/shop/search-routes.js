import express from 'express';
import {
    searchProducts
} from '../../controllers/shop/search-controller.js';



const shopSearchRouter = express.Router();

shopSearchRouter.get('/:keyword', searchProducts);


export default shopSearchRouter;