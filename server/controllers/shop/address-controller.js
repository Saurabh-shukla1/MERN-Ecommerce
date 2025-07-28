import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        

        const { userId, address, city, state, country, pincode, phone, notes } = req.body;

        if (!userId || !address || !city || !state || !country || !pincode || !phone) {
            return res.status(400).json({ 
                message: "All fields are required",
                success: false
             });
        }

        const newAddress = new Address({
            userId,
            address,
            city,
            state,
            country,
            pincode,
            phone,
            notes
        });

        await newAddress.save();

        res.status(201).json({ 
            message: "Address added successfully",
            success: true,
            data: newAddress
         });
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
        
    }
}


export const fetchAllAddress = async (req, res) => {
    try {
        const { userId} = req.params;
        if(!userId) {
            return res.status(400).json({ 
                message: "User ID is required",
                success: false
             });
        }
        const address = await Address.find({ userId: userId });
        
        res.status(200).json({
            message: "Addresses fetched successfully",
            success: true,
            data: address
        });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
        
    }
}

export const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        if(!userId || !addressId) {
            return res.status(400).json({ 
                message: "User ID and Address ID are required",
                success: false
             });
        }
        const address = await Address.findOneAndDelete({ userId: userId, _id: addressId });
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Address deleted successfully",
            success: true,
            data: address
        });
    } catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
        
    }
}

export const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const formData = req.body;
        if(!userId || !addressId) {
            return res.status(400).json({ 
                message: "User ID and Address ID are required",
                success: false
             });
        }
        const address = await Address.findOneAndUpdate({ userId: userId, _id: addressId }, formData, { new: true });
        if (!address) {
            return res.status(404).json({
                message: "Address not found",
                success: false
            });
        }
        res.status(200).json({
            message: "Address updated successfully",
            success: true,
            data: address
        });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
        
    }
}