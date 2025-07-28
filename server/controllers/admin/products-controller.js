import { ImageUploadUtils } from "../../helpers/cloudinary.js";
import Product from "../../models/Product.js";


export const handleImageUpload = async (req, res) => {
    try {
        const  b64 = Buffer.from(req.file.buffer).toString('base64');// Convert the file buffer to base64
        const url = "data:" + req.file.mimetype + ";base64," + b64; // Create a data URL from the base64 string
        const result = await ImageUploadUtils(url);

        res.json({
            success: true,
            result: result,
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            status: 'error',
            message: 'Error uploading image',
            error: error.message
        })
    }
}

//add new products
export const addProduct = async (req, res) => {
    try {
        console.log("Add product request body:", req.body); // Debug log
        
        const {image, 
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock} = req.body;
        
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price: parseFloat(price),
            salePrice: parseFloat(salePrice),
            totalStock: parseInt(totalStock)
        })
        await newlyCreatedProduct.save();
        res.status(201).json({
            success: true,
            status: 'success',
            message: 'Product added successfully',
            product: newlyCreatedProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Error adding product',
            error: error.message
        })
        
    }
}


//fetch all products

export const fetchAllProducts = async (req, res) => {
    try {
        const ListOfProducts = await Product.find({}).sort({createdAt: -1});
        res.status(200).json({
            success: true,
            data: ListOfProducts,
            status: 'success',
            message: 'Products fetched successfully',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Error fetching products',
            error: error.message
        })
        
    }
}
//edit product by id

export const editProduct = async (req, res) => {
    try {
        console.log("Edit product request body:", req.body); // Debug log
        console.log("Edit product request params:", req.params); // Debug log
        
        const { id } = req.params;
        const { image,
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock } = req.body;

    let findProduct = await Product.findById(id);
        if (!findProduct) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Product not found'
            })
        }
        findProduct.title = title || findProduct.title;
        findProduct.description = description || findProduct.description;
        findProduct.category = category || findProduct.category;
        findProduct.brand = brand || findProduct.brand;
        findProduct.price = price === '' ? '' : price || findProduct.price;
        findProduct.salePrice = salePrice === '' ? '' : salePrice || findProduct.salePrice;
        findProduct.totalStock = totalStock || findProduct.totalStock;
        findProduct.image = image || findProduct.image;

        await findProduct.save();
        res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product updated successfully',
            data: findProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Error editing product',
            error: error.message
        })

    }
}

//delete product by id

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id);

        if(!product) {
            return res.status(404).json({
                success: false,
                status: 'error',
                message: 'Product not found'
            });
        }
        await Product.findByIdAndDelete(id);// Delete the product by ID
        // Optionally, you can also delete the image from cloudinary if needed
        res.status(200).json({
            success: true,
            status: 'success',
            message: 'Product deleted successfully'
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            status: 'error',
            message: 'Error deleting product',
            error: error.message
        })
    }
}
