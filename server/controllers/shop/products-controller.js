import Product from "../../models/Product.js";


export const getFilteredProducts = async (req, res) => {
    try {
        const {category = [], brand = [], sortBy = 'price-asc'} = req.query;
        let filters = {};
        if(category.length){
            filters.category = { $in: category.split(',') };
        }
        if(brand.length){
            filters.brand = { $in: brand.split(',') };
        }

        let sort = {};
        switch (sortBy) {
            case 'price-asc':
                sort.price = 1; // Ascending order
                break;
            case 'price-desc':
                sort.price = -1; // Descending order
                break;
            case 'newest':
                sort.createdAt = -1; // Newest first
                break;
            case 'popularity':
                sort.popularity = -1; // Most popular first
                break;
            case 'title-atoz':
                sort.title = 1; // Title A to Z
                break;
            case 'title-ztoa':
                sort.title = -1; // Title Z to A
                break;
            default: 
                sort.price = 1; // Default to ascending price if no valid sort option is provided
                break;
        }


        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products,
            message: "Filtered products fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        res.status(500).json({ 
            error: "Internal Server Error",
            success: false,
            message: "Failed to fetch filtered productss"
         });
        
    }
}

export const getProductsDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: product,
            message: "Product details fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).json({ 
            error: "Internal Server Error",
            success: false,
            message: "Failed to fetch product details"
         });
        
    }
}

