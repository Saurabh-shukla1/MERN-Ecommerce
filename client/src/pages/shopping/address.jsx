import CommonForm from "@/components/common/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addressFormControls } from "@/config";
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from "@/store/shop/address-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./address-card";
import { toast } from "react-toastify";


const initialFormData = {
    address : '',
    city : '',
    state : '',
    pincode : '',
    country : '',
    phone : '',
    notes : ''
}

const Address = ({ setCurrentSelectedAddress, selectedId }) => {
    const [formData, setFormData] = useState(initialFormData);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const {addressList} = useSelector(state => state.shopAddress);
    const [currentEditedId, setCurrentEditedId] = useState(null);


        const handleEditAddress = (addressInfo) => {
        setCurrentEditedId(addressInfo?._id);
        console.log('Editing address:', addressInfo);
        setFormData({
            ...formData,
            address : addressInfo?.address,
            city : addressInfo?.city,
            state : addressInfo?.state,
            pincode : addressInfo?.pincode,
            country : addressInfo?.country,
            phone : addressInfo?.phone,
            notes : addressInfo?.notes
        }) 
    }
    
    

    const handleManageAddress = (e) =>{
        e.preventDefault();
        //console.log(formData);
        if(addressList.length >= 3 && currentEditedId === null) {
             setFormData(initialFormData);
            return toast.error('You can only have up to 3 addresses. Please edit or delete an existing address before adding a new one.');
        }
        currentEditedId !==  null ? dispatch(
            updateAddress({
                userId: user?.id, 
                addressId: currentEditedId, 
                formData
            })).then((data) => {
        if(data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id));
            setCurrentEditedId(null);
            setFormData(initialFormData);
            toast.success('Address updated successfully');
        }
    }) 
       : dispatch(addNewAddress({
        ...formData,
        userId: user.id
    })).then((data) => {
        console.log('Address added successfully:', data);
        
        if(data?.payload?.success) {
            dispatch(fetchAllAddresses(user?.id))
            setFormData(initialFormData); // Reset form data after successful submission
            toast.success('Address added successfully');
        }
    })}

    const handleDeleteAddress = (addressInfo) => {
        console.log('Deleting address:', addressInfo);
        dispatch(deleteAddress({
            userId: user.id,
            addressId: addressInfo._id
        })).then((data) => {
            if(data?.payload.success) {
                dispatch(fetchAllAddresses(user?.id));
                toast.success('Address deleted successfully');
            }
        });
    }



    

    useEffect(() => {
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])

    const isFormValid = () => {
        return Object.keys(formData).map(key=> 
            formData[key] &&formData[key].trim() !== ''
        ).every(item=> item === true);
    }
    return <Card>
        <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-4">
            {
                addressList && addressList.length > 0 ?
                addressList.map(singleAddressitem => <AddressCard 
                    selectedId={selectedId}
                    handleDeleteAddress={handleDeleteAddress}
                    addressInfo={singleAddressitem}
                    setCurrentEditedId={setCurrentEditedId}           
                    handleEditAddress={handleEditAddress}
                    key={singleAddressitem._id}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                    />)
                :null
            }
        </div>
        <CardHeader>
            <CardTitle>
                {
                    currentEditedId ? 'Edit Address' : 'Add New Address'
                }
            </CardTitle>
        </CardHeader>
        <CardContent className={`space-y-3 ${addressList.length >= 3 && currentEditedId === null ? 'opacity-50 pointer-events-none' : ''}`}>
            <CommonForm
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={ currentEditedId  !== null? 'Edit Address' : 'Add Address'}
                onSubmit={handleManageAddress}
                isButtonDisabled={!isFormValid()}
            />
        </CardContent>
    </Card>
}
export default Address;