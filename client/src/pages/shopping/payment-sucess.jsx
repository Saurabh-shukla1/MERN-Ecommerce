import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    return (
        <Card className="p-6 max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
            <p className="text-gray-700">Your payment has been processed successfully.</p>
            <p className="text-gray-700 mt-2">Thank you for your purchase!</p>
            <Button className='mt-5' onClick={() => navigate("/shop/account")}>View Order Details</Button>
        </Card>
    );
}

export default PaymentSuccessPage;

