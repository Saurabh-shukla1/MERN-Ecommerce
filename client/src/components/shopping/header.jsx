import { HomeIcon, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItem } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import logo from '../../assets/logo.PNG'
import { ModeToggle } from "../theme/mode-toggle";

const MenuItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleNavigate = (getCurrentMenuItem) => {
        sessionStorage.removeItem('filters');
        const currentFilter = getCurrentMenuItem.id !== 'home' 
        && getCurrentMenuItem.id !== 'products' && getCurrentMenuItem.id !== 'search'
        ? {
            category: [getCurrentMenuItem.id]
        } 
        : null;
        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        location.pathname.includes('listing') && currentFilter !== null 
        ? setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) 
        : navigate(getCurrentMenuItem.path);
    }
    return <nav className="flex flex-col mb-3 lg:mb-0 lg:item-center gap-6 lg:flex-row">
        {
            shoppingHeaderMenuItems.map((menuItems) => (
                <Label
                onClick={() => handleNavigate(menuItems)}
                key={menuItems.id} 
                className="text-sm font-medium text-primary ml-2 lg:mb-0 cursor-pointer hover:underline hover:underline-offset-4 hover:text-black">
                    {menuItems.label}
                </Label>
            ))
        }
    </nav>
}

const HeaderRightContent = () => {
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const {cartItems} = useSelector(state => state.shopCart);
    
    



    const handleLogout = () => {
        dispatch(logoutUser());
    }

    useEffect(() => {
        dispatch(fetchCartItem(user?.id))
    }, [dispatch, user?.id]);

    return <div className="flex lg:items-center lg:flex-row flex-row ml-2 lg:ml-0 gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
            {/* <ModeToggle /> */}
            <Button 
            onClick={() => setOpenCartSheet(true)} 
            variant='outline' 
            size='icon'
            className='relative'
            >
                <ShoppingCart className="h-6 w-6"/>
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {cartItems && cartItems.length > 0 ? cartItems.length : 0}
                </span>
                <span className="sr-only">Shopping Cart</span>
            </Button>
            <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItem={cartItems  && cartItems.length > 0 ? cartItems : []} />
        </Sheet>       
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='bg-black'>
                    <AvatarFallback className='bg-black text-white font-extrabold'>
                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                    <DropdownMenuSeparator />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='right' className='w-56'>
                <DropdownMenuLabel>Logged in as {user?.username || 'Guest'}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                    <UserCog className="mr-2 h-4 w-4"/>
                    Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggle />
    </div>
}

const ShoppingHeader = () => {
    const {isAuthenticated} = useSelector(state => state.auth)
    return(
        <header className="sticky top-0 z-40 w-full border-b bg-background">
            <div className="flex h-16 items-center justify-between px-4 ms:px-6">
                <Link className="flex items-center gap-2" to="/shop/home">
                    <img src={logo} alt="Logo" className="h-20 w-20 gap-0 mr-0" />
                    <span className="font-bold">ECommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='outline' size='icon' className="lg:hidden">
                            <Menu className="h-6 w-6"/>
                            <span className="sr-only">Toggle header only</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className='w-full max-w-xs lg:hidden'>
                        <MenuItems />
                        <HeaderRightContent />
                    </SheetContent>
                </Sheet>
                <div className="hidden lg:block">
                    <MenuItems />
                </div>
                
                <div className="hidden lg:block">
                    <HeaderRightContent />
                </div> 
            </div>
        </header>
    )
};

export default ShoppingHeader;