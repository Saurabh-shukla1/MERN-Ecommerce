import{Button} from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

const AdminProductTile = ({ product, 
    setFormData, 
    setCurrentEditedId, 
    setOpenCreateProductsDialog, 
    handleDelete }) => {
    return (
        <Card className='w-full mx-s-sm shadow-lg hover:shadow-2xl gap-2 py-0 transition-shadow duration-300 mx-auto mb-2'>
            <div>
                <div className="relative">
                    <img 
                    src={product?.image}
                    alt={product?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                </div>
                <CardContent>
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>${product?.price}</span>
                        {
                            product?.salePrice > 0 ? (
                            <span className="text-lg font-bold">
                                ${product?.salePrice}
                            </span>
                            ) : null
                        }
                    </div>
                </CardContent>
                <CardFooter className='flex justify-between items-center mb-2'>
                    <Button onClick={() =>{
                        setFormData(product);
                        setCurrentEditedId(product._id);
                        setOpenCreateProductsDialog(true);
                    }}>Edit</Button>
                    <Button onClick = {() => handleDelete(product?._id)}>Delete</Button>
                </CardFooter>
            </div>
        </Card>
    )
}
export default AdminProductTile;