import ShoppingProductTile from "@/components/shopping/product-tile";
import ProductDetails from "@/components/shopping/ProductDetails";
import { Input } from "@/components/ui/input";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";



const SearchProducts = () =>{

    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const [openProductDetails, setOpenProductDetails] = useState(false);
    const dispatch = useDispatch();
    const {searchResults} = useSelector(state => state.shopSearch);
    const {cartItems} = useSelector(state => state.shopCart);
    const {products, productDetails} = useSelector(state => state.shoppingProducts);
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if(keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000)
            
        }
        else{
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults()); 
        }
    }, [keyword]);
    
    const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    
            if (!getTotalStock || getTotalStock <= 0) {
            toast.error("Product is out of stock");
            return;
        }
            
            let getCartItems = cartItems || [];
            console.log(getCartItems, "Cart Items in add to cart");
            if(getCartItems.length > 0) {
               const indexOfCurrentItem  = getCartItems.findIndex(item => item.productId === getCurrentProductId);
                console.log(indexOfCurrentItem, "Current index");
               if(indexOfCurrentItem > -1){
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                
                if(getQuantity + 1 > getTotalStock) {
                    toast.error(`Cannot add more than ${getTotalStock} items to the cart`);
                    return;
                }
               }
            }
            dispatch(addToCart({
                userId: user.id,
                productId: getCurrentProductId,
                quantity: 1
            }))
            .then((data) => {
                if(data?.payload?.success) {
                    toast.success('Product added to cart successfully');
                    dispatch(fetchCartItem(user.id));
                }
            })
        }

        const handleGetProductDetails = (getCurrentProductId) => {
                    dispatch(fetchProductDetails(getCurrentProductId));
            }

        useEffect(() => {
        if( productDetails!== null ) setOpenProductDetails(true);
    }, [productDetails]);
  
    console.log(searchResults, 'Search Results');
   
    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input 
                    value={keyword} 
                    onChange={(e) => setKeyword(e.target.value)} 
                    className='py-6' placeholder="Search products..."
                    name='keyword'
                    />
                </div>   
            </div>
            {
               !searchResults.length ? (
                <h1 className="text-center text-5xl font-extrabold">No Result Found</h1>
               ) : null
            }
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    searchResults.map(item => <ShoppingProductTile 
                        key={item.id} 
                        product={item} 
                        handleAddToCart={handleAddToCart}
                        handleGetProductDetails={handleGetProductDetails}
                        />)
                }
            </div>
            <ProductDetails 
            open={openProductDetails} 
            setOpen={setOpenProductDetails} 
            ProductDetails={productDetails} />
        </div>
    );
}

export default SearchProducts;