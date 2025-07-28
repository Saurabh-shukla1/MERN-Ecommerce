import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const initialFormData = {
    image: null,
    title: '',
    description: '',
    price: "",
    salePrice:'',
    brand: '',
    category: '',
    totalStock: '',
};

const AdminProducts = () => {

    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { products } = useSelector((state) => state.adminProducts);
    const dispatch = useDispatch();


    const onSubmit = (e) => {
        e.preventDefault();
        currentEditedId !== null ? 
            dispatch(editProduct({
                id: currentEditedId, 
                formData: {
                    ...formData,
                    image: uploadedImageUrl
                }
            })).then((data) => {
                console.log("Product updated successfully", data);
                if(data?.payload?.success){
                    dispatch(fetchAllProducts());
                    // Reset form data and state
                    setFormData(initialFormData);
                    setImageFile(null);
                    setCurrentEditedId(null);
                    setOpenCreateProductsDialog(false);
                    alert("Product updated successfully!");
                }
            })
        : 
        dispatch(addNewProduct({
            ...formData,
            image : uploadedImageUrl,
        })).then((data) => {
            console.log("Product added successfully", data);
            if (data.type.endsWith('/fulfilled')) {
                dispatch(fetchAllProducts());
                // Reset form data and state
                setFormData(initialFormData);
                setImageFile(null);
                setUploadedImageUrl("");
                setOpenCreateProductsDialog(false);
                alert("Product added successfully!");
            }
        })
    }

    //Handle product Delete
    const handleDelete = (getCurrentProductId) => {
        console.log("Delete product with ID: ", getCurrentProductId);
        dispatch(deleteProduct(getCurrentProductId))
        .then(data => {
            console.log("Product deleted successfully", data);
            if(data?.payload?.success){
                dispatch(fetchAllProducts());
                alert("Product deleted successfully!");
            }
        })
    }

    //Validate form data before submission
    const isFormValid = () => {
        return Object.keys(formData)
        .map((key) => formData[key] !== "")
        .every((value) => value === true);

    }

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch]);

    console.log("Products in Admin Products: ", products, "Image File: ", imageFile, "Uploaded Image URL: ", uploadedImageUrl);

    return <Fragment>
        <div className="mb-5 w-full flex justify-end">
            <Button onClick={() => setOpenCreateProductsDialog(true)}>Add New Product</Button>
        </div>
        <div className="grid gap-4 ms:grid-cols-3 lg:grid-cols-4">
            {
                products && products.length > 0 ?
                products.map((productItems) => <AdminProductTile 
                setFormData={setFormData} 
                setCurrentEditedId={setCurrentEditedId} 
                setOpenCreateProductsDialog={setOpenCreateProductsDialog} 
                key={productItems._id} 
                product={productItems}
                handleDelete={handleDelete}
                />):null
            }
        </div>
        <Sheet 
        open={openCreateProductsDialog} 
        onOpenChange={() => {
            setOpenCreateProductsDialog(false)
            setCurrentEditedId(null);
            setFormData(initialFormData);
        }}>
            <SheetContent side="right" className="overflow-auto" >
                <SheetHeader>
                    <SheetTitle>
                        {
                            currentEditedId !== null ? "Edit Product" : "Add New Product"
                        }
                    </SheetTitle>
                </SheetHeader>
                <ProductImageUpload 
                imageFile={imageFile} 
                setImageFile={setImageFile} 
                uploadedImageUrl={uploadedImageUrl} 
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                isEditMode={currentEditedId !== null}
                />
                <div className="py-6 m-4">
                    <CommonForm 
                    formControls={addProductFormElements}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={ currentEditedId !== null ? "Update Product" : "Add Product"}
                    onSubmit={onSubmit}
                    isButtonDisabled={!isFormValid()}
                    />
                </div>
            </SheetContent>
        </Sheet>
    </Fragment>
}

export default AdminProducts;