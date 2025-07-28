
import Order from '../../models/Orders.js';


export const getAllOrdersOfAllUser = async (req, res) => {
    try {
        const orders = await Order.find({});

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
};

export const getOrderDetailsForAdmin = async (req, res) => {
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


export const updateOrderStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {orderStatus} = req.body;

        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                message: 'Order not found',
                success: false
            });
        }

        await Order.findByIdAndUpdate(id,{orderStatus});
        res.status(200).json({
            message: 'Order status updated successfully',
            success: true,
            //data: { orderId: id, orderStatus }
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ 
            message: 'Internal server error',
            success: false,
            error: error.message
        });
        
    }
}