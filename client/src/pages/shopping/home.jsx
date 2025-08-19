import { Card, CardContent } from '@/components/ui/card';
import header1 from '../../assets/banners/banner1.jpg';
import header2 from '../../assets/banners/banner2.webp';
import header3 from '../../assets/banners/banner3.jpg';
import header4 from '../../assets/banners/banner4.png';
import { Button } from "@/components/ui/button";
import { BabyIcon, ChevronLeft, ChevronRight, CloudLightning, Footprints, Section, ShirtIcon, UmbrellaIcon, WatchIcon } from "lucide-react";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItem } from '@/store/shop/cart-slice';
import ProductDetails from '@/components/shopping/ProductDetails';
import { toast } from 'react-toastify';
import { getFeatureImage } from '@/store/admin/feature-slice';
const ShoppingHome = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [openProductDetails, setOpenProductDetails] = useState(false);
    const {products, productDetails} = useSelector(state => state.shoppingProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector(state => state.auth);
    const {featureImageList} = useSelector(state => state.commonFeature);

    const slides = [header3, header2, header1, header4];

    const categories = [
        {id : 'men', label: 'Men', icon: ShirtIcon},
        {id : 'women', label: 'Women', icon: CloudLightning},
        {id : 'children', label: 'Children', icon: BabyIcon},
        {id : 'footwear', label: 'Footwear', icon: Footprints},
        {id : 'accessories', label: 'Accessories', icon: UmbrellaIcon},
    ]

    const brandsWithIcons =[
        {id : 'nike', label: 'Nike', icon: <img src='/Nike.svg' className='h-20 w-20'/>},
        {id : 'adidas', label: 'Adidas', icon: <img src='/Adidas.svg' className='h-20 w-20'/>},
        {id : 'puma', label: 'Puma', icon: <img src='/Puma.svg' className='h-20 w-20'/>},
        {id : 'reebok', label: 'Reebok', icon: <img src='/Reebok.svg' className='h-20 w-20'/>},
        {id : 'under-armour', label: 'Under Armour', icon: <img src='/Under_Armour.svg' className='h-20 w-20'/>},
    ]


    const handleNavigateToListingPage = (getCurrentItem, section) =>{
        sessionStorage.removeItem('filters');
        const currentFilter = {
            [section] : [getCurrentItem.id]
        }

        sessionStorage.setItem('filters', JSON.stringify(currentFilter));
        navigate('/shop/listing')
    }
    const handleGetProductDetails = (getCurrentProductId) => {
            dispatch(fetchProductDetails(getCurrentProductId));
    }
    const handleAddToCart = (getCurrentProductId) => {
            console.log(getCurrentProductId,"Adding to cart");
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
        if( productDetails !== null ) setOpenProductDetails(true);
    }, [productDetails]);
    useEffect(()=> {
        const timer = setInterval(()=>{
            setCurrentSlide(prevSlide => (prevSlide + 1) % featureImageList.data.length)
        }, 3000)
        return () => clearInterval(timer)
    },[featureImageList.data]);

    useEffect(() => {
        dispatch(fetchAllFilteredProducts({filterParams: {}, sortParams: 'price-asc'}))
    },[dispatch])
    console.log(products, 'products');

    useEffect(() => {
            dispatch(getFeatureImage());
        }, [dispatch])

    return(
        <div className="flex flex-col min-h-screen">
            <div className="relative w-full h-[600px] overflow-hidden">
                {   
                    featureImageList.data && featureImageList.data.length > 0 ?
                    featureImageList.data.map((image, index) => (
                    <div key={index} className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                        <img
                        src={image.image}
                        key={image._id}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>
                    )) : null
                }
                <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}
                className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black'
                >
                    <ChevronLeft className="h-6 w-6 text-white" />
                </Button>
                <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)}
                className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black'
                >
                    <ChevronRight className="h-6 w-6 text-white" />
                </Button>
            </div>
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Shop by category
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                        {
                            categories.map((categoryItem) => (
                                <Card onClick={() => handleNavigateToListingPage(categoryItem, 'category')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                                    <CardContent className='flex flex-col justify-center p-6'>
                                        <categoryItem.icon className='h-12 w-12 text-gray-500 mb-2' />
                                        <span className='font-bold'>{categoryItem.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Shop by Brand
                    </h2>
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
                        {
                            brandsWithIcons.map((brandItem) => (
                                <Card onClick={() => handleNavigateToListingPage(brandItem, 'brand')} className='cursor-pointer hover:shadow-lg transition-shadow'>
                                    <CardContent className='flex flex-col justify-center items-center  p-6'>
                                        {brandItem.icon}
                                        <span className='font-bold'>{brandItem.label}</span>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className='py-12'>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Feature Products
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 '>
                        {
                            products && products.length > 0
                            ? products.map((productItem) => (
                                <ShoppingProductTile 
                                handleGetProductDetails={handleGetProductDetails}
                                handleAddToCart={handleAddToCart}
                                key={productItem.id} product={productItem} />
                            ))
                            : null
                        }
                    </div>
                </div>    
            </section>
             <ProductDetails
            open={openProductDetails} 
            setOpen={setOpenProductDetails} 
            ProductDetails={productDetails} />
        </div>
    )
}
export default ShoppingHome;