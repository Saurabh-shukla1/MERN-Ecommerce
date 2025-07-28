import { Card, CardHeader } from "@/components/ui/card";
import { capturePayment, getALLOrdersByUser } from "@/store/shop/order-slice";
import { clearCart } from "@/store/shop/cart-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";


const PaypalReturn = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const { user } = useSelector(state => state.auth);

    const param = new URLSearchParams(location.search);
    const paymentId = param.get('paymentId');
    const payerId = param.get('PayerID');


    useEffect(()=>{
        if(paymentId && payerId){
            const getCurrentOrderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

            dispatch(capturePayment({
                orderId: getCurrentOrderId,
                paymentId,
                payerId
            })).then((data) => {
                if (data.payload?.success) {
                    // Clear the cart from Redux store
                    dispatch(clearCart());
                    
                    // Refresh the orders list to include the new order
                    if (user?.id) {
                        dispatch(getALLOrdersByUser(user.id));
                    }
                    
                    sessionStorage.removeItem('currentOrderId');
                    toast.success('Payment successfully processed');
                    window.location.href = '/shop/payment-success';
                } else {
                    console.error('Payment capture failed:', data?.payload?.message);
                    toast.error('Payment capture failed. Please try again.');
                    window.location.href = '/shop/payment-failed';
                }
            }).catch((error) => {
                console.error('Payment capture error:', error);
                toast.error('Payment failed. Please try again.');
                window.location.href = '/shop/payment-failed';
            })
        }
    },[paymentId, payerId, dispatch]);
    return(
        <Card>
            <CardHeader>Processing Payment...Please Wait!</CardHeader>
        </Card>
    )
}

export default PaypalReturn;