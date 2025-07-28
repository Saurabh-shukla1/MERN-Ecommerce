import { useDispatch, useSelector } from 'react-redux';
import Img from '../../assets/banners/AccImg.jpg';
import Address from './address';
import UserCartItemContent from '@/components/shopping/cart-itemsContent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { createNewOrder } from '@/store/shop/order-slice';
import { toast } from 'react-toastify';

const ShoppingCheckout = () => {
    const {cartItems, cartId} = useSelector(state => state.shopCart);
    const {user} = useSelector(state => state.auth);
    const {approvalURL} = useSelector(state => state.shopOrder);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [isPaymentInitiated, setIsPaymentInitiated] = useState(false);
    const dispatch = useDispatch();
    
    console.log('Current Selected Address:', currentSelectedAddress);
    const handleInitiatePaypalPayment = () => {
        if(!cartItems || cartItems.length === 0) {
            toast.error('Your cart is empty. Please add items to your cart before proceeding to checkout.');
            return;
        }
        if (!currentSelectedAddress) {
            toast.error('Please select an address to proceed with payment.');
            return;
        }

        const orderData = {
            userId : user?.id, 
            cartId: cartId,
            cartItems : cartItems.map(singleCartItem => ({
                productId: singleCartItem?.productId,
                title : singleCartItem?.title,
                image : singleCartItem?.image,
                price : parseFloat(singleCartItem?.salePrice > 0 ? singleCartItem?.salePrice : singleCartItem?.price),
                quantity : parseInt(singleCartItem?.quantity),
            })), 
            addressInfo: {
                addressId: currentSelectedAddress?._id,
                address : currentSelectedAddress?.address,
                city : currentSelectedAddress?.city,
                state : currentSelectedAddress?.state,
                country : currentSelectedAddress?.country,
                pincode : currentSelectedAddress?.pincode,
                phone : currentSelectedAddress?.phone,
                notes : currentSelectedAddress?.notes
            }, 
            orderStatus : 'Pending', 
            paymentMethod : 'paypal', 
            paymentStatus : 'Pending', 
            totalAmount : parseFloat(cartItems.reduce((total, item) => total + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity, 0).toFixed(2)),
            orderDate : new Date(),
            orderUpdateDate : new Date(),
            paymentId : '',
            payerId : '',
        };
        console.log('Order Data:', orderData);
        dispatch(createNewOrder(orderData)).then((data) => {
            console.log('Order Creation Response:', data);
            if (data.payload?.success && data.payload?.approvalURL) {
                toast.success('Order created successfully. Redirecting to PayPal...');
                sessionStorage.setItem('currentOrderId', JSON.stringify(data.payload.orderId));
                setIsPaymentInitiated(true);
            } else {
                setIsPaymentInitiated(false);
                console.error('Order creation failed:', data);
                toast.error('Failed to initiate payment. Please try again.');
            }
        }).catch((error) => {
            console.error('Order creation error:', error);
            alert('An error occurred. Please try again.');
        });
    }

    if(approvalURL){
        window.location.href = approvalURL;
        return null; // Prevent rendering the component while redirecting
    }
    return (
        <div className="flex flex-col">
           <div className="relative h-[400px] w-full overflow-hidden">
               <img src={Img} alt="Shopping Checkout" className="object-cover w-full h-[400px] object-center" />
           </div>
           <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 p-5'>
               <Address 
                   setCurrentSelectedAddress={setCurrentSelectedAddress} 
                   selectedId={currentSelectedAddress}
               />
               <div className='flex flex-col gap-2'>
                {
                    cartItems && cartItems.length > 0 ?
                    cartItems.map(items => (
                        <UserCartItemContent cartItem={items} key={items._id} />
                    )) : <p className='text-center text-gray-500'>No items in the cart</p>
                }
                <div className="mt-2 space-y-4">
                <div className="flex justify-between items-center border-t pt-4 ml-4 mr-4">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-sm font-medium">
                        ${
                            cartItems.reduce((total, item) => total + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity, 0).toFixed(2)
                        }
                    </span>
                </div>
                </div>
                <div className='flex mt-4 w-full'>
                    <Button onClick={handleInitiatePaypalPayment} className='w-full'>
                        {
                            isPaymentInitiated ? 'Redirecting to PayPal...' : 'Pay with PayPal'
                        }
                    </Button>
                </div>
               </div>
               
           </div>
        </div>
    );
}   
export default ShoppingCheckout;