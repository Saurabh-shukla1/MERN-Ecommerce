import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemContent from "./cart-itemsContent";


const UserCartWrapper = ({ cartItem, setOpenCartSheet }) => {
    const navigate = useNavigate();
    return(
        <SheetContent className='sm:max-w-md'>
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-4">
                {
                    cartItem && cartItem.length > 0 ? 
                    cartItem.map((items) => <UserCartItemContent cartItem={items} />)
                    :null
                }
            </div>
            <div className="mt-2 space-y-4">
                <div className="flex justify-between items-center border-t pt-4 ml-4 mr-4">
                    <span className="text-sm font-medium">Total</span>
                    <span className="text-sm font-medium">
                        ${
                            cartItem.reduce((total, item) => total + (item?.salePrice > 0 ? item?.salePrice : item?.price) * item?.quantity, 0).toFixed(2)
                        }
                    </span>
                </div>
            </div>
            <Button onClick={() => {
                navigate('/shop/checkout')
                setOpenCartSheet(false)
            }} 
            className='w-105 m-4 '
            >Checkout</Button>
        </SheetContent>
    )
}

export default UserCartWrapper;