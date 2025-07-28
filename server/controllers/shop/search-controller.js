import Product from "../../models/Product.js";




export const searchProducts = async (req, res) => {
    try {
        const {keyword} = req.params;
        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                message: "Keyword is required and must be a string",
                success: false
            });
        }

        const regEx = new RegExp(keyword, 'i'); // 'i' for case-insensitive search
        const createSearchQuary = {
            $or : [
                {title : regEx},
                {description : regEx},
                {category : regEx},
                {brand : regEx}
            ]
        }

        const searchResults = await Product.find(createSearchQuary).limit(10);

        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: searchResults
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message || "Internal server error",
            success: false
         });
    }
}