import { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import bcrypt from 'bcryptjs';


//register
const UserRegister = async (req, res) => {
    const{ username, email, password } = req.body;

    try {
        const checkUser = await User.findOne({email});
        if (checkUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await hash(password,12);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if(!isPasswordValid){
            return res.status(400)
            .json({ 
                message: "Invalid password! Please try again.",
                success: false 
            });   
        }
        const token = jwt.sign(
            {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                username: checkUser.username
            },
            'CLIENT_SECRET_KEY',
            { expiresIn: '1h' } // Token expiration time
        ) 
        res.cookie('token', token, {httpOnly: false, secure: false}).json({
            success: true,
            message: "Login successful",
            user: {
                id: checkUser._id,
                username: checkUser.username,
                email: checkUser.email,
                role: checkUser.role
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//logout
const logout = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logout successful"
    })
}
 //Auth-Middleware
 const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({ 
            message: "Unauthorized access",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(401).json({ 
            message: "Unauthorized access",
            success: false
        });
        
    }
 }

0
export { loginUser, UserRegister, logout, authMiddleware };