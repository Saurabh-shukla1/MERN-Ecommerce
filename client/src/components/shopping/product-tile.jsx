
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import React from 'react';


const ShoppingProductTile = ({ product, handleGetProductDetails, handleAddToCart }) => {
    return (
        <Card className='w-full max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 mt-0 py-0 rounded-lg'>
            <div onClick={() => handleGetProductDetails(product?._id)} className="cursor-pointer">
                <div className="relative">
                    <img 
                    src={product?.image} 
                    alt={product?.title} 
                    className="object-cover w-full h-[300px] rounded-t-lg"
                    />
                    {/* Conditional Badges */}
                    {
                        product?.totalStock === 0 ? (
                        <Badge className='absolute top-2 right-2 bg-gray-500 hover:bg-gray-600'>
                            Out of Stock
                        </Badge>
                        ):
                        product?.totalStock < 5 ? (
                        <Badge className='absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600'>
                            Only {product?.totalStock} left
                        </Badge>
                        )
                        : product?.salePrice > 0 ? (
                        <Badge className='absolute top-2 left-2 bg-red-500 hover:bg-red-600'>
                            sale
                        </Badge>
                        ) : null
                    }
                </div>
                <CardContent className='p-4'>
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex items-center justify-between mb-2">
                        <span className="test-sm text-muted-foreground">{categoryOptionsMap[product?.category]}</span>
                        <span className="test-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                            {product?.price}
                        </span>
                        {
                            product?.salePrice > 0 ? (
                            <span className="text-lg font-semibold text-primary">
                                {product?.salePrice}
                            </span>
                            ) : null
                        }
                    </div>
                </CardContent>
            </div>
            <CardFooter>
                {
                    product?.totalStock === 0 ?
                    <Button disabled className='w-full mb-3 cursor-not-allowed'>Out of Stock</Button>
                    :<Button onClick={() => handleAddToCart(product?._id, product?.totalStock)} className='w-full mb-3'>Add to Cart</Button>
                }
                
            </CardFooter>
        </Card>
    )
}

export default ShoppingProductTile;