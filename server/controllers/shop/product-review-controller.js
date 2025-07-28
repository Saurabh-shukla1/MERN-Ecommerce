import Order from '../../models/Orders.js';
import Product from '../../models/Product.js'
import ProductReview from '../../models/review.js';

export const addProductReview = async (req, res) => {
    try {
        const{
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        } = req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'Confirmed'
        })

        if(!order) {
            return res.status(403).json({
                message: 'You can only review omnly purchased products',
                success: false
            });
        }

            const checkExitReview = await ProductReview.findOne({
                productId,
                userId
            });
            if(checkExitReview) {
                return res.status(403).json({
                    message: 'You have already reviewed this product',
                    success: false
                });
            }

        const newReview = new ProductReview({
             productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });
        await newReview.save();
        const reviews = await ProductReview.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview = reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewsLength;

        await Product.findByIdAndUpdate (productId, {averageReview});
        res.status(200).json({
            message: 'Review added successfully',
            success: true,
            data: newReview
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message,
            success: false
        });

    }
}

export const getProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await ProductReview.find({ productId });
        return res.status(200).json({
            message: 'Product reviews fetched successfully',
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message,
            success: false
        });
    }
}