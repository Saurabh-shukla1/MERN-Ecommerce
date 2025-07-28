import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { toast } from "react-toastify";


const AdminHeader = ({setopen}) => {


    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
        toast.success("Logged out successfully");
    }

    return <header className="flex item-center justify-between px-4 py-3 bg-background border-b">
        <Button onClick={() => setopen(true)} className="lg:hidden sm:block">
            <AlignJustify />
            <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
            <Button onClick={handleLogout} className='inline-flex rounded-md gap-2 items-center px-4 py-2 text-sm font-medium shadow'>
             <LogOut />   
             LogOut
            </Button>
        </div>
    </header>
}

export default AdminHeader;