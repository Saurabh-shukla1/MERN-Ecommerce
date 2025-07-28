import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"


const AddressCard = ({addressInfo, handleEditAddress, handleDeleteAddress, setCurrentSelectedAddress, selectedId}) => {
    return <Card onClick={setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo)
    : null}
    className={`cursor-pointer border ${selectedId?._id === addressInfo?._id ? 'border-blue-500 p-5 border-[2px]' : 'border-transparent'} rounded-md transition-all duration-200`}
    >
        <CardContent className={`grid p-4 gap-4 `}>
            <Label>Address : {addressInfo?.address}</Label>
            <Label>City : {addressInfo?.city}</Label>
            <Label>State : {addressInfo?.state}</Label>
            <Label>Pin Code : {addressInfo?.pincode}</Label>
            <Label>Country : {addressInfo?.country}</Label>
            <Label>Phone : {addressInfo?.phone}</Label>
            <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className='flex justify-between p-4'>
            <Button onClick={() => handleEditAddress(addressInfo)} variant="outline" className="mr-2">Edit</Button>
            <Button onClick={() => handleDeleteAddress(addressInfo)} variant="destructive">Delete</Button>
        </CardFooter>
    </Card>
}
export default AddressCard;