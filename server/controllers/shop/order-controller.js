import paypal from '../../helpers/paypal.js';
import Order from '../../models/Orders.js';
import Cart from '../../models/Cart.js';
import Product from '../../models/Product.js';


export const createOrder = async (req, res) => {
    try {
        const { 
            userId, 
            cartItems, 
            addressInfo, 
            orderStatus, 
            paymentMethod, 
            paymentStatus, 
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId,
            cartId
        } = req.body;

         console.log('Received order data:', req.body);

         // Enhanced validation
         if (!userId || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0 || !addressInfo || !totalAmount) {
            return res.status(400).json({
                message: 'Missing required fields or invalid data',
                success: false
            });
        }

         // Validate cartItems structure
         for (const item of cartItems) {
            if (!item.productId || !item.title || !item.price || !item.quantity) {
                return res.status(400).json({
                    message: 'Invalid cart item structure',
                    success: false
                });
            }
         }

        const create_payment_json = {
            intent : 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: 'http://localhost:5173/shop/paypal-return',
                cancel_url: 'http://localhost:5173/shop/paypal-cancel',
            },
            transactions : [
                {
                    item_list: {
                        items: cartItems.map((item) => ({
                            name: item.title,
                            sku: item.productId,
                            price: parseFloat(item.price).toFixed(2),
                            currency: 'USD',
                            quantity: parseInt(item.quantity),
                        }))
                    },
                    amount: {
                        currency: 'USD',
                        total: parseFloat(totalAmount).toFixed(2),
                    },
                    description: 'Order payment',
                },
            ]
        };

        console.log('PayPal payment JSON:', JSON.stringify(create_payment_json, null, 2));
        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if (error) {
                console.error('Error creating PayPal payment:', error);
                console.error('PayPal error details:', JSON.stringify(error, null, 2));
                return res.status(500).json({ 
                    message: 'PayPal payment creation failed',
                    success: false,
                    error: error.message
                });
            } else {
                try {
                    // Convert cartItems to match Order schema (prices as strings)
                    const formattedCartItems = cartItems.map(item => ({
                        productId: item.productId,
                        title: item.title,
                        image: item.image,
                        price: item.price.toString(), // Convert to string as per schema
                        quantity: item.quantity,
                    }));

                    const newOrder = new Order({
                        userId,
                        cartId,
                        cartItems: formattedCartItems,
                        addressInfo,
                        orderStatus: orderStatus || 'Pending',
                        paymentMethod: paymentMethod || 'paypal',
                        paymentStatus: paymentStatus || 'Pending',
                        totalAmount: totalAmount.toString(), // Convert to string as per schema
                        orderDate: orderDate || new Date(),
                        orderUpdateDate: orderUpdateDate || new Date(),
                        paymentId: paymentId || '',
                        payerId: payerId || '',
                    });

                    await newOrder.save();

                    const approvalURL = paymentInfo.links.find(
                        link => link.rel === 'approval_url')?.href;

                    if (!approvalURL) {
                        throw new Error('No approval URL found in PayPal response');
                    }

                    res.status(201).json({ 
                        message: 'Order created successfully',
                        success: true,
                        approvalURL,
                        orderId: newOrder._id
                    });
                } catch (dbError) {
                    console.error('Database error:', dbError);
                    return res.status(500).json({ 
                        message: 'Database error while saving order',
                        success: false,
                        error: dbError.message
                    });
                }
            }
        });
        
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false
        });

    }
}

export const captureOrder = async (req, res) => {
    try {
        const { orderId, paymentId, payerId } = req.body;

        console.log('Capturing order:', { orderId, paymentId, payerId });

        let order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({
                message: 'Order not found',
                success: false
            });
        }

        // Update order with payment details
        order.paymentStatus = 'paid';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for(let item of order.cartItems){
            let product = await Product.findById(item.productId);
            if(!product){
                return res.status(404).json({
                    message: `Product Out of Stock ${product.title}`,
                    success: false
                });
            }
            product.totalStock -= item.quantity;

            await product.save();
        }

        order.orderStatus = 'Confirmed';
        order.orderUpdateDate = new Date();

        await order.save();

        // Only delete cart after successful payment capture
        if (order.cartId) {
            try {
                await Cart.findByIdAndDelete(order.cartId);
                console.log('Cart deleted successfully:', order.cartId);
            } catch (cartError) {
                console.error('Error deleting cart:', cartError);
                // Don't fail the whole operation if cart deletion fails
            }
        }

        console.log('Order captured successfully:', order._id); 

        res.status(200).json({
            message: 'Order captured successfully',
            success: true,
            data: order
        });

        
    } catch (error) {
        console.error('Error capturing order:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false,
            error: error.message
        });

    }
}


export const getAllOrdersByUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const orders = await Order.find({userId});

        if(!orders.length){
            return res.status(404).json({
                message: 'No orders found for this user',
                success: false
            });
        }
        res.status(200).json({
            message: 'Orders fetched successfully',
            success: true,
            data: orders
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false,
            error: error.message
        });
        
    }
}

export const getOrderDetails = async (req, res) => {
    try {
        const {id} = req.params;
        const order = await Order.findById(id);

        if(!order){
            return res.status(404).json({
                message: 'Order not found',
                success: false
            });
        }
        res.status(200).json({
            message: 'Order Details fetched successfully',
            success: true,
            data: order
        });

    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false,
            error: error.message
        });

    }
}
