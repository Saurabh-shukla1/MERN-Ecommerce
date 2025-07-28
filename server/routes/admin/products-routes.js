import express from 'express';
import {addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload} from '../../controllers/admin/products-controller.js';
import { upload } from '../../helpers/cloudinary.js';


const adminProductsRouter = express.Router();
adminProductsRouter.post('/upload-image', 
    upload.single('my-file'), 
    handleImageUpload);

adminProductsRouter.post('/add', addProduct);
adminProductsRouter.put('/edit/:id', editProduct);
adminProductsRouter.delete('/delete/:id', deleteProduct);
adminProductsRouter.get('/get', fetchAllProducts);


export default adminProductsRouter;
