import { useState } from "react";
import CommonForm from "../common/form";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { getALLOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from "@/store/admin/orders-slice";

const initialFormData = {
    status: '',
};

const AdminOrderDetails = ({ orderDetails }) => {
    const [formData, setFormData] = useState(initialFormData);
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleUpdateOrderStatus = (e) => {
        e.preventDefault();
        const {Status} = formData;
        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus : Status }))
        .then((data) => {
            
            if (data?.payload?.success) {
                console.log(data, "123")
                dispatch(getOrderDetailsForAdmin(orderDetails?._id));
                dispatch(getALLOrdersForAdmin());
                setFormData(initialFormData);
            }
        })
    };
    return(
        <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
            <div className="grid gap-6 p-4">
               <div className="grid gap-2">
                    <div className="flex mt-6 items-center justify-between">
                        <p className="font-md">Order Id</p>
                        <Label>{orderDetails?._id}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-md">Order Date</p>
                        <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-md">Order Status</p>
                        <Label>
                            <Badge className={`${
                                        orderDetails?.orderStatus === 'confirmed' ? "bg-green-500" :
                                        orderDetails?.orderStatus === "pending" ? "bg-yellow-500" :
                                        orderDetails?.orderStatus === "processing" ? "bg-blue-500" :
                                        orderDetails?.orderStatus === "shipped" ? "bg-purple-500" :
                                        orderDetails?.orderStatus === "delivered" ? "bg-teal-500" :
                                        "bg-red-500"
                                    }`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-md">Order Price</p>
                        <Label>${orderDetails?.totalAmount}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-md">Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-md">Payment Status</p>
                        <Label className={`${
                                        orderDetails?.paymentStatus === 'paid' ? "bg-green-500" :
                                        orderDetails?.paymentStatus === "Pending" ? "bg-yellow-500" :
                                        "bg-red-500"
                                    } p-1  rounded-md`}>
                            {orderDetails?.paymentStatus}
                        </Label>
                    </div>
                </div> 
                <Separator/>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {
                                orderDetails?.cartItems && orderDetails.cartItems.length > 0 ?
                                orderDetails.cartItems.map((item, index) =>{
                                    return (
                                        <li key={index} className="flex items-center justify-between">
                                            <span>{item.title}</span>
                                            <span>{item.quantity}</span>
                                            <span>${item.price}</span>
                                        </li>
                                    )
                                }):null
                            }
                            <li className="flex items-center justify-between">
                                <span>Total</span>
                                <span>${orderDetails?.totalAmount}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Details</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user?.username}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}, {orderDetails?.addressInfo?.state} - {orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.country}</span>
                            <span>Phone: {orderDetails?.addressInfo?.phone}</span>
                            <span>Notes: {orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <CommonForm 
                    formControls={[
                        {
                            name: 'Status',
                            label: 'Status',
                            componentType: 'select',
                            Options: [
                                { id: 'pending', label: 'Pending' },
                                { id: 'processing', label: 'Processing' },
                                { id: 'shipped', label: 'Shipped' },
                                { id: 'delivered', label: 'Delivered' },
                                { id: 'cancelled', label: 'Cancelled' },
                            ],
                        },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        submitButtonText="Update Order Status"
                        onSubmit={handleUpdateOrderStatus}
                    />
                </div>
            </div>
        </DialogContent>
    )
}
export default AdminOrderDetails;