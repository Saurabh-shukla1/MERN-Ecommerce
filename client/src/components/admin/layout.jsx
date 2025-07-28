import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";


const AdminLayout = () => {

    const [open, setopen] = useState(false);
    return(
        <div className="flex min-h-screen w-full">
            {/* Admin Sidebar */}
            <AdminSidebar open={open} setopen={setopen} />
            <div className="flex flex-1 flex-col">
                {/* Admin header */}
                <AdminHeader setopen={setopen}/>
                <main className="flex flex-1 flex-col bg-muted/40 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
};

export default AdminLayout;