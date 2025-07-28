import Feature from "../../models/Feature.js";

export const addFeatureImage = async (req, res) => {
    try {
        const {image} = req.body
        console.log(image, 'Feature Image Data');
        const featureImages = new Feature({
            image
        });
        await featureImages.save();
        res.status(201).json({
            message: "Feature image added successfully",
            success: true,
            data: featureImages
        });
    } catch (error) {
        console.error("Error adding feature image:", error);
        res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
        
    }
}

export const getFeatureImages = async (req, res) => {
try {
    const images = await Feature.find();
    if (!images || images.length === 0) {
        res.status(404).json({
            message: "No feature images found",
            success: false
        });
    }
    return res.status(200).json({
        message: "Feature images fetched successfully",
        success: true,
        data: images
    });
} catch (error) {
    console.error("Error fetching feature images:", error);
    return res.status(500).json({ 
        message: "Internal server error",
        success: false
     });
    
    }

}


export const deleteFeatureImage = async (req, res) => {
    try {
        const {id} = req.params;
        const image = await Feature.findByIdAndDelete(id);
        if (!image) {
            return res.status(404).json({
                message: "Feature image not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Feature image deleted successfully",
            success: true,
            data: image
        });
    } catch (error) {
        console.error("Error deleting feature image:", error);
        return res.status(500).json({ 
            message: "Internal server error",
            success: false
         });
    }
}