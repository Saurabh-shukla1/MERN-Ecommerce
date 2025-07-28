import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AdminOrderDetails from "./orderDetails";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALLOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from "@/store/admin/orders-slice";
import { Badge } from "../ui/badge";


const AdminOrders = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
    const dispatch = useDispatch();

    const handleFetchOrderDetails = (getId) => {
        dispatch(getOrderDetailsForAdmin(getId));
    }

    useEffect(() => {
        dispatch(getALLOrdersForAdmin());
    }, [dispatch]);
    console.log(orderDetails, 'orderDetails');

    useEffect(() => {
        if (orderDetails) {
            setOpenDetailsDialog(true);
        } else {
            setOpenDetailsDialog(false);
        }
    }, [orderDetails]);

    console.log(orderList, 'orderList');
    return (
        <Card>
            <CardHeader>
               <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                            orderList.map((orderItems) => 
                            <TableRow key={orderItems?._id}>
                                <TableCell>{orderItems?._id}</TableCell>
                                <TableCell>{orderItems?.orderDate.split("T")[0]}</TableCell>
                                <TableCell>
                                    <Badge className={`${
                                        orderItems?.orderStatus === 'Confirmed' ? "bg-green-500" :
                                        orderItems?.orderStatus === "Pending" ? "bg-yellow-500" :
                                        orderItems?.orderStatus === "processing" ? "bg-blue-500" :
                                        orderItems?.orderStatus === "shipped" ? "bg-purple-500" :
                                        orderItems?.orderStatus === "delivered" ? "bg-teal-500" :
                                        "bg-red-500"
                                    }`}>
                                        {orderItems?.orderStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{orderItems?.totalAmount}</TableCell>
                                <TableCell>
                                <Dialog 
                                open={openDetailsDialog} 
                                onOpenChange={() =>{
                                    setOpenDetailsDialog(false);
                                    dispatch(resetOrderDetails());
                                }}
                                className="w-full max-w-2xl">
                                
                                    <Button onClick={() => handleFetchOrderDetails(orderItems?._id)}
                                    >View Details</Button>
                                    <AdminOrderDetails orderDetails={orderDetails} />
                                </Dialog>
                            </TableCell>
                            </TableRow>):null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
    )
}
export default AdminOrders;