
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItem } from "@/store/shop/cart-slice";
import { setProductDetails } from "@/store/shop/products-slice";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import StarRating from "../common/starRating";
import { useEffect, useState } from "react";
import { addReview, getReview } from "@/store/shop/review-slice";


const ProductDetails = ({ open, setOpen, ProductDetails }) => {
    if (!ProductDetails && !setOpen) {
        return null; // or a loading state
    }
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    console.log(user, "Current User");
    const {cartItems} = useSelector(state=>state.shopCart);
    const {reviews} = useSelector(state => state.shopReview);

    const handleRatingChange = (getRating) => {
        setRating(getRating);
        console.log(getRating, "Selected Rating");
    }

    const handleAddReview = () =>{
        dispatch(addReview({
            productId: ProductDetails?._id,
            userId: user.id,
            username: user?.username, // ✅ Fixed: Use correct field name
            reviewMessage: reviewMsg,
            reviewValue: rating
        })).then((data) => {
            if(data?.payload?.success) {
                toast.success('Review added successfully');
                setReviewMsg("");
                setRating(0);
                dispatch(getReview(ProductDetails?._id));
            }
        });
    }
    console.log(user?.username, "User Name in Product Details");

    useEffect(() => {
        if(ProductDetails !== null ) dispatch(getReview(ProductDetails?._id));
    },[ProductDetails])

    console.log(reviews, 'reviews');
    const averageReview = reviews && reviews.length > 0 ?
    reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) / reviews.length : 0;

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
    const handleDialogClose = () => {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }
    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className='grid grid-cols-2 sm:p-12 gap-8 max-w-[90vw] sm:max-w-[20vw] lg:max-w-[70vw] md:max-w-[60vw]'>
                <div className="relative rounded-lg overflow-hidden">
                    <img
                    src={ProductDetails?.image}
                    alt={ProductDetails?.title}
                    width={600}
                    height={600}
                    className="aspect-square w-full object-cover md:scale-105 transition-transform duration-300 hover:scale-110 hover:shadow-lg rounded-lg shadow-sm md:shadow-none md:hover:shadow-none md:hover:scale-100"
                    />
                </div>
                <div className="">
                    <div>
                        <h1 className="text-3xl font-extrabold">{ProductDetails?.title}</h1>
                        <p className="text-muted-foreground text-2xl mb-5 mt-2">{ProductDetails?.description}</p>
                    </div>
                    <div className="flex items-center gap-4 justify-between">
                        <p className={`text-3xl font-bold text-primary ${ProductDetails?.salePrice > 0 ? "line-through" : ""}`}>${ProductDetails?.price}</p>
                        {ProductDetails?.salePrice > 0 ?
                            <p className="text-2xl font-bold text-muted-foreground">${ProductDetails?.salePrice}</p>
                            : null}
                    </div>
                    <div>
                        <div className="flex flex-row items-center gap-0.5">
                            <StarRating rating={averageReview} />
                            <p className="text-xl text-muted-foreground m-1">({averageReview.toFixed(1)})</p>
                        </div>
                    </div>
                    <div className="mt-5 mb-5">
                        {
                            ProductDetails?.totalStock === 0 ? (
                            <Button disabled className='w-full mb-3 cursor-not-allowed'>Out of Stock</Button>
                            ) : (
                            <Button onClick={() => handleAddToCart(ProductDetails?._id, ProductDetails?.totalStock)} className='w-full mb-3'>Add to Cart</Button>
                            )
                        }
                        
                    </div>
                    <Separator />
                    <div className="max-h-[300px] overflow-auto">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        <div className="gap-6">
                            {
                                reviews && reviews.length > 0 ? 
                                reviews.map((reviewItem) => (
                                    <div className="flex gap-4">
                                <Avatar className='w-10 h-10 border'>
                                    <AvatarFallback>{user?.username.charAt(0)?.toUpperCase() || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <div className="flex item-center gap-2">
                                        <h3 className="font-semibold">{user?.username}</h3>
                                    </div>
                                    <div className="flex items-center gap-0.5">
                                        <StarRating rating={reviewItem?.reviewValue} />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{reviewItem.reviewMessage}</p>
                                </div>
                            </div>
                                ))
                                : <p className="text-muted-foreground">No reviews yet</p>
                            }
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <Label>Write a Review</Label>
                    <div className="flex gap-1 mt-3">
                        <StarRating 
                        rating={rating}
                        handleRatingChange={handleRatingChange}
                        />
                    </div>
                    <Input name='reviewMsg' value={reviewMsg} onChange={(e) => setReviewMsg(e.target.value)} placeholder="Write a review..." className='mt-3' />
                    <Button onClick={handleAddReview} className="w-full mt-2" disabled={reviewMsg.trim() === ""}>Submit Review</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
export default ProductDetails;