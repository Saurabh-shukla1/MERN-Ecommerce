import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Progress } from "../ui/progress";




const ProductImageUpload = ({
    imageFile, 
    setImageFile, 
    uploadedImageUrl, 
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
    isEditMode,
    isCustomStyling = false
}) =>{

    const inputRef = useRef(null);

    const handleImageChange = (e) => {
        console.log("Image file selected: ", e.target.files);
        const selectedFile = e.target.files?.[0];
        if(selectedFile) setImageFile(selectedFile);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
         e.preventDefault();
         const droppedFiles = e.dataTransfer.files?.[0];
         if(droppedFiles) {
             setImageFile(droppedFiles);
             // Optionally, you can also set the uploaded image URL here
             // setUploadedImageUrl(URL.createObjectURL(droppedFiles));
         }
    }

    const handleImageRemove = () => {
        setImageFile(null);
        setUploadedImageUrl("");
        if(inputRef.current) {
            inputRef.current.value = null; // Reset the input value
        }
    }

    const uploadImageToCloudinary = async () => {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('my-file', imageFile);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`, data)
            console.log("Upload response:", response.data); // Debug log
            if(response?.data?.success) {
                setUploadedImageUrl(response.data.result.secure_url);
                setImageLoadingState(false);
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if(imageFile !== null) uploadImageToCloudinary()
    }, [imageFile]);

    return (
        <div className={`w-3/4 ${isCustomStyling ? "" : "max-w-md mx-auto ml-4"}`}>
            <Label className='text-lg font-semibold mb-2 block'>Image Upload</Label>
            <div onDragOver={handleDragOver} onDrop={handleDrop}>
                <Input 
                id='image-upload'
                type='file'
                className='hidden'
                ref={inputRef}
                onChange={handleImageChange}
                disabled={isEditMode} // Disable input if in edit mode
                />
                {
                    !imageFile ? 
                    <Label htmlFor='image-upload' 
                    className={`${isEditMode ? "cursor-not-allowed" : "cursor-pointer"} flex flex-col items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-muted-foreground hover:bg-gray-200 transition-colors mr-4`}>
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2"/>
                        <span className="text-sm text-muted-foreground">Click or drag to upload an image</span>
                    </Label>:
                    (
                        imageLoadingState ? 
                        <Progress value={60}/>:
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {
                                uploadedImageUrl ? 
                                <img src={uploadedImageUrl} alt="Uploaded" className="w-[150px] h-[150px] object-cover rounded-md" />
                                : <FileIcon className="w-16 h-16 text-muted-foreground mr-2" />
                            }
                        </div>
                        <p className="text-sm font-medium">{imageFile?.name}</p>
                        <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-red-500 mr-5' onClick={handleImageRemove}>
                            <XIcon className="w-4 h-4 "/>
                            <span className="sr-only">Remove Image</span>
                        </Button>
                    </div>)
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;