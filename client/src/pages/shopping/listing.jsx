import ProductFilter from "@/components/shopping/filter";
import ShoppingProductTile from "@/components/shopping/product-tile";
import ProductDetails from "@/components/shopping/ProductDetails";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { productSortOptions } from "@/config";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";


const createSearchParamsHelper = (filters) => {
    const queryParams = [];
    for(const [key, value] of Object.entries(filters)) {
        if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(',');

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
        }
    }
    console.log("Query Params: ", queryParams);
    return queryParams.join('&');
}

const ShoppingListing = () => {


    const dispatch = useDispatch();
    const {products, productDetails} = useSelector((state) => state.shoppingProducts);
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState(null);
    const [searchParam, setSearchParam] = useSearchParams();
    const [openProductDetails, setOpenProductDetails] = useState(false);
    const {cartItems} = useSelector(state=>state.shopCart)

    

    const {user} = useSelector(state => state.auth);
   

    const categorySerachParam = searchParam.get('category');
    //console.log(cartItems, "Cart Items");

    //fetch list of product
    useEffect(() => {
        if(filters !== null && sort !== null) 
        dispatch(fetchAllFilteredProducts({filterParams: filters, sortParams: sort}));
    },[dispatch, sort, filters]);

    
    // Handle sort change
    const handleSort = (value) => {
        console.log("Selected sort option:", value);
        setSort(value);
    }
    // Handle filter change
    const handleFilter = (getSectioId, getCurrentOptions) => {
        let cpyFilters = {...filters};
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectioId);
        if(indexOfCurrentSection === -1) {
            cpyFilters = {
                ...cpyFilters,
                [getSectioId]: [getCurrentOptions]
            }
        }
        else{
            const indexOfCurrentOption = cpyFilters[getSectioId].indexOf(getCurrentOptions);
            if(indexOfCurrentOption === -1) {
                cpyFilters[getSectioId].push(getCurrentOptions);
            }
            else cpyFilters[getSectioId].splice(indexOfCurrentOption, 1);
        }
        setFilters(cpyFilters);
        sessionStorage.setItem('filters', JSON.stringify(cpyFilters));
    }

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

    useEffect(() => {
        if(filters && Object.keys(filters).length > 0) {
            const createQueryString = createSearchParamsHelper(filters);
            setSearchParam(new URLSearchParams(createQueryString));
        }
    }, [filters, setSearchParam])

    useEffect(()=> {
        setSort('price-asc');
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {});
    },[categorySerachParam])

    const handleGetProductDetails = (getCurrentProductId) => {
        dispatch(fetchProductDetails(getCurrentProductId));
        //console.log("Fetching details for product ID: ", getCurrentProductId);
    }

    useEffect(() => {
        if( productDetails !== null ) setOpenProductDetails(true);
    }, [productDetails]);


    console.log(products, "Products in listing page");
    return(
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:p-6 p-4">
            <ProductFilter filters={filters} handleFilter={handleFilter} />
            <div className="bg-background w-full rounded-lg shadow-sm ">
                <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-lg">Products</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-muted-foreground">{products?.length} products</span>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='sm' className='flex items-center gap-1'>
                                <ArrowUpDownIcon className="h-4 w-4" />
                                <span>Sort By</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[200px]">
                            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                                {
                                    productSortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))
                                }
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {/* Product Cards */}
                    { 
                        products && products.length > 0 ? 
                        products.map((product) => <ShoppingProductTile 
                        handleGetProductDetails={handleGetProductDetails}
                        product={product} key={product.id}
                        handleAddToCart={handleAddToCart}
                        />)
                        : null
                    }
                </div>
            </div>
            <ProductDetails 
            open={openProductDetails} 
            setOpen={setOpenProductDetails} 
            ProductDetails={productDetails} />
        </div>
    )
}
export default ShoppingListing;
