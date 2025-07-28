import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6    
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role : {
        type: String,
        default: 'user',
    } 
});

const User = mongoose.model('User', UserSchema);
export default User;