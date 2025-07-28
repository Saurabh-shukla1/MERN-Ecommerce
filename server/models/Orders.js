
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,

    cartItems : [
        {
            productId: String,
            title : String,
            image : String,
            price :String,
            quantity : Number,
        }
    ],
    addressInfo : {
        addressId: String,
        address :String,
        city : String,
        state : String,
        country : String,
        pincode : String,
        phone : String,
        notes : String
    },
    orderStatus : String,
    paymentMethod : String,
    paymentStatus : String,
    totalAmount : String,
    orderDate : Date,
    orderUpdateDate : Date,
    paymentId : String,
    payerId : String,
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;