import paypal from 'paypal-rest-sdk';
import dotenv from 'dotenv';
dotenv.config();


paypal.configure({
    mode: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox', // Use 'live' for production
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});


export default paypal;