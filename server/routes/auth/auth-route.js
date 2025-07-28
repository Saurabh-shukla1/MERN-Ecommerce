
import { Router } from 'express';
import User from '../../models/User.js';
import { UserRegister, loginUser, logout, authMiddleware } from '../../controllers/auth/auth-controller.js';



const router = Router();

router.post('/register', UserRegister);
router.post('/login', loginUser);
router.post('/logout', logout);
router.get('/check-auth', authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message : "User is authenticated",
        user,
    })
})
export default router;
