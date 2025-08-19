import ProductImageUpload from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImage } from "@/store/admin/feature-slice";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

 

const AdminDashboard = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const {featureImageList} = useSelector(state => state.commonFeature);
    console.log(uploadedImageUrl, 'Uploaded Image URL');

    const handleUploadFeatureImage = () => {
        dispatch(addFeatureImage(uploadedImageUrl))
        .then((data) => {
            if(data?.payload?.success) {
                dispatch(getFeatureImage())
                setImageFile(null);
                setUploadedImageUrl("");
                setImageLoadingState(false);
                toast.success('Feature image uploaded successfully');
            }
        })
    }

    const handleDeleteFeatureImage = (id) => {
        dispatch(deleteFeatureImage(id))
        .then((data) => {
            if(data?.payload?.success) {
                dispatch(getFeatureImage())
                toast.success('Feature image deleted successfully');
            }
        })
    }
    useEffect(() => {
        dispatch(getFeatureImage());
    }, [dispatch])
    console.log(featureImageList, 'Feature Image List');
    return <div className="p-4 justify-center items-center">
        <ProductImageUpload 
                imageFile={imageFile} 
                setImageFile={setImageFile} 
                uploadedImageUrl={uploadedImageUrl} 
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                isCustomStyling={true}
                />
        <Button onClick={handleUploadFeatureImage} className={`mt-4 w-3/4 ${!uploadedImageUrl ? "cursor-not-allowed" : "cursor-pointer"}`} 
        disabled={!uploadedImageUrl}>Upload Image</Button>
        <div>
            <h2 className="text-lg font-semibold mt-6">Uploaded Feature Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {
                    featureImageList.data && featureImageList.data.length > 0 ?
                    featureImageList.data.map((image, index) => (
                        <div key={index} className="border p-2 rounded-md">
                            <Button onClick={() => handleDeleteFeatureImage(image._id)} variant="ghost" className='bg-white hover:bg-rose-600' ><Trash /></Button>
                            <img src={image.image} alt={`Feature ${index + 1}`} className="w-full h-auto rounded-md" />
                        </div>
                    )) : (
                        <p>No feature images uploaded yet.</p>
                    )
                }
            </div>
        </div>  
    </div>
}

export default AdminDashboard;