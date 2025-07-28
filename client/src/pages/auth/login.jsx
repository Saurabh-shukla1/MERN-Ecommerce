import CommonForm from "@/components/common/form";
import { useState } from "react";
import { loginFormControls } from "@/config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/store/auth-slice";
import { toast } from "react-toastify";

const initialState ={
    email: '',
    password: ''
}

const Login = () =>{

    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData)).then((data) =>{
            if(data?.payload?.success){
                toast.success('Login successful');
                navigate('/shop/home');
            }
            else{
                toast.error(data?.payload?.message || "Login failed");
            }
        });
        
    }

    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Login to Your Account</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <a href="/auth/register" className="font-semibold text-primary hover:text-primary/80">
                        Sign up
                    </a>
                </p>
            </div>
            <CommonForm 
              formControls={loginFormControls}
              buttonText={'Login'}
              onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}  
            />
        </div>
    )
}

export default Login;
