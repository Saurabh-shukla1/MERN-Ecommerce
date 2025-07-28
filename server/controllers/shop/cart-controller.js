import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";



export const addToCart = async (req, res) => {
    try {
        const {userId, productId, quantity} = req.body;
        //console.log("Adding to cart:", req.body);
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({ 
                message: "User ID, Product ID and Quantity are required",
                success: false
            });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ 
                message: "Product not found",
                success: false
            });
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if(findCurrentProductIndex === -1){
            cart.items.push({ productId, quantity });
        }else{
            cart.items[findCurrentProductIndex].quantity += quantity;
        }
        await cart.save();
        
        // Populate the cart items with product details
        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice totalStock image'
        });
        
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            image: item.productId.image
        }));
        
        res.status(200).json({ 
            message: "Product added to cart successfully",
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
        });

    }
}

export const deleteCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        if (!userId || !productId) {
            return res.status(400).json({ 
                message: "User ID and Product ID are required",
                success: false
            });
        }

        const cart = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice totalStock image'
        })
        if (!cart) {
            return res.status(404).json({ 
                message: "Cart not found",
                success: false
            });
        }

        cart.items = cart.items.filter(item => item.productId._id.toString() !== productId);
        await cart.save();
        await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice totalStock image'
        })
        const populateCartItems = cart.items.map(item => ({
            productId: item.productId? item.productId._id : null,
            quantity: item.quantity,
            title: item.productId? item.productId.title : null,
            price: item.productId? item.productId.price : null,
            salePrice: item.productId? item.productId.salePrice : null,
            image: item.productId? item.productId.image : null
        }));
        res.status(200).json({ 
            message: "Product removed from cart successfully",
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });

    } catch (error) {
        console.error("Error Deleting from cart:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
        });

    }
}


export const updateCartItemQty = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                message: "User ID, Product ID and Quantity are required",
                success: false
            });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if( findCurrentProductIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
                success: false
            });
        }
        cart.items[findCurrentProductIndex].quantity = quantity;
        await cart.save();
        // Populate the product details for the response
         await cart.populate({
            path: 'items.productId',
            select: 'title price salePrice totalStock image'
         })
         const populateCartItems = cart.items.map(item => ({
            productId: item.productId? item.productId._id : null,
            quantity: item.quantity,
            title: item.productId? item.productId.title : null,
            price: item.productId? item.productId.price : null,
            salePrice: item.productId? item.productId.salePrice : null,
            image: item.productId? item.productId.image : null
        }));

        res.status(200).json({
            message: "Cart item updated successfully",
            success: true,
            data: {
                ...cart._doc,
                items: populateCartItems
            }
        });
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });

    }
}
export const fetchCartItem = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                success: false
            });
        }
        const card = await Cart.findOne({ userId }).populate({
            path: 'items.productId',
            select: 'title price salePrice totalStock image'
        })
        if (!card) {
            return res.status(404).json({
                message: "Cart not found",
                success: false
            });
        }

        const validItems = card.items.filter(productItem => productItem.productId);
        if(validItems.length < card.items.length){
            card.items = validItems; // Remove invalid items
            await card.save(); // Save the updated cart
        }

        const populateCartItems = validItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            image: item.productId.image
        }))
        res.status(200).json({
            message: "Cart fetched successfully",
            success: true,
            data: {
                ...card._doc,
                items: populateCartItems
            }
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });

    }
}
