
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import ShoppingOrderDetails from "./orderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getALLOrdersByUser, getOrderDetails, resetOrderDetails } from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {orderList, orderDetails} = useSelector((state) => state.shopOrder);

    const handleFetchOrderDetails = (getId) => {
        dispatch(getOrderDetails(getId))
    };

    useEffect(() =>{
        dispatch(getALLOrdersByUser(user?.id));
    },[dispatch])

    useEffect(() => {
        if(orderDetails !== null) setOpenDetailsDialog(true);
    },[orderDetails])

    console.log(orderDetails, 'Order Details');
    
    return (
        <Card>
            <CardHeader>
               <CardTitle>Your Orders</CardTitle>
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
                                }} >
                                    <Button onClick={() => handleFetchOrderDetails(orderItems?._id)}>View Details</Button>
                                    <ShoppingOrderDetails orderDetails={orderDetails} />
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

export default ShoppingOrders;
