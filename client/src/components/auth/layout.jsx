import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Outlet } from "react-router-dom";



const AuthLayout = () =>{
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex w-1/2 items-center justify-center bg-gray-800 px-12">
                <div className="w-150 h-150 text-center text-primary-foreground">
                        <DotLottieReact
                        src="https://lottie.host/12ba32ab-aa33-482a-bb31-7c43aa7b118b/Or2fR3fK1G.lottie"
                        loop
                        autoplay
                        />
                </div>
            </div>
            <div className="flex flex-auto item-center justify-center bg-background px-4 py-12 lg:px-8 sm:px-6 mt-25">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout;