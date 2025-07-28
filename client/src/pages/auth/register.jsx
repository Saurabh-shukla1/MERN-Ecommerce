import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState ={
    username: '',
    email: '',
    password: ''
}

const Register = () =>{

    const [formData, setFormData] = useState(initialState); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData))
        .then((data) => {
           if(data?.payload?.success){
                toast.success('Registration successful');
                navigate('/auth/login');
            }else{
                console.error("Registration failed:", data.payload);
                alert(data?.payload?.message || "Registration failed");
                toast.error(data?.payload?.message || "Registration failed");
            }
        })
        console.log("Form submitted with data:", formData);
    }
    console.log(formData);
    return (
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Create an Account</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <a href="/auth/login" className="font-semibold text-primary hover:text-primary/80">
                        Sign in
                    </a>
                </p>
            </div>
            <CommonForm 
              formControls={registerFormControls}
              buttonText={'Sign Up'}
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
            />
        </div>
    )
}

export default Register;
