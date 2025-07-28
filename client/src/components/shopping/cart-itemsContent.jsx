import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, fetchCartItem, updateCartItemQuantity } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

const UserCartItemContent = ({cartItem}) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const {cartItems} = useSelector(state=>state.shopCart);
    const {products} = useSelector(state => state.shoppingProducts);


    const handleRemoveItem = (getCartItem) => {
        dispatch(deleteCartItem({
            userId: user?.id,
            productId: getCartItem?.productId || getCartItem?._id
        })).then((data) => {
            console.log("Delete response:", data);
            if (data?.payload?.success) {
                console.log("Refetching cart items...");
                dispatch(fetchCartItem(user?.id));
            }
        })
    }
    
    const handleUpdateQuantity = (getCartItem, action) => {
        if(action == "Plus"){                  
            let getCartItems = cartItems || [];
            
            if(getCartItems.length > 0) {
                const indexOfCurrentCartItem  = getCartItems.findIndex(
                    item => item.productId === getCartItem?.productId
                );
                const getCurrentProductIndex = products?.findIndex(
                    product=> product._id === getCartItem?.productId
                );
                const getTotalStock = products[getCurrentProductIndex]?.totalStock || 0;
                if(indexOfCurrentCartItem > -1){
                    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;

                    if(getQuantity + 1 > getTotalStock) {
                        toast.error(`Cannot add more than ${getTotalStock} items to the cart`);
                        return;
                    }
                }
            }
        }
    const newQuantity = action === "Plus"
        ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1;
            
        if (newQuantity <= 0) return; // Prevent negative quantities
        
        console.log("Updating quantity:", { item: getCartItem, newQuantity });
        dispatch(
            updateCartItemQuantity({
                userId: user?.id,
                productId: getCartItem?.productId || getCartItem?._id,
                quantity: newQuantity
            })
        ).then((data) => {
            console.log("Update response:", data);
            if (data?.payload?.success) {
                console.log("Refetching cart items...");
                dispatch(fetchCartItem(user?.id));
            }
        })
    }

    return(
        <div className="flex item-center space-x-4 m-4">
            <img
            src={cartItem?.image}
            alt={cartItem?.title}
            className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1">
                <h3 className="font-extrabold">{cartItem?.title}</h3>
                <div className="flex item-center mt-1">
                    <Button 
                    onClick={() => handleUpdateQuantity(cartItem , "Minus")} 
                    variant="outline" size="icon" 
                    disabled={cartItem?.quantity === 1}
                    className="m-1 h-8 w-8 rounded-full">
                        <Minus className="h-4 w-4" />
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <span className='m-2 font-semibold'>{cartItem?.quantity}</span>
                    <Button onClick={() => handleUpdateQuantity(cartItem , "Plus")} variant="outline" size="icon" className="m-1 h-8 w-8 rounded-full">
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col items-end">
                <p className="font-semibold">
                    ${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) * cartItem?.quantity)}
                </p>
                <Trash2 className="cursor-pointer mt-1" size={20} onClick={() => handleRemoveItem(cartItem)} />
            </div>
        </div>
    )
}

export default UserCartItemContent;