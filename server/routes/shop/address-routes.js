

import express from 'express';
import { 
    fetchAllAddress, 
    addAddress, 
    updateAddress, 
    deleteAddress 
} from '../../controllers/shop/address-controller.js';

const router = express.Router();

router.post('/add', addAddress);
router.get('/get/:userId', fetchAllAddress);
router.put('/update/:userId/:addressId', updateAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

export default router;