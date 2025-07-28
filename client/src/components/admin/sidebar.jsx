import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard,
         ChartNoAxesCombined, 
        ListOrdered,  
        ShoppingBasket 
        } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";



const adminSidebarMenuItems = [
    {
        id : 'dashboard',
        label: 'Dashboard',
        path : '/admin/dashboard',
        icon: <LayoutDashboard />
    },
    {
        id : 'products',
        label: 'Products',
        path : '/admin/products',
        icon : <ShoppingBasket />
    },
    {
        id : 'orders',
        label: 'Orders',
        path : '/admin/orders',
        icon: <ListOrdered />
    },
]


const MenuItems = ({setopen})=>{
    const navigate = useNavigate();
    return <nav className="mrt-8 flex-col flex gap-2">
        {
            adminSidebarMenuItems.map(menuItems => 
                <div key={menuItems.id} onClick={() => {
                    navigate(menuItems.path);
                    setopen? setopen(false) : null;
                }

                } className="flex text-xl cursor-pointer items-center rounded-md gap-2 px-3 py-2 text-muted-foreground 
                hover:bg-muted hover:text-foreground">
                    {menuItems.icon}
                    <span>
                        {menuItems.label}
                    </span>
                </div>
            )
        }
    </nav>
}
  
const AdminSidebar = ({open, setopen}) => {
    const navigate = useNavigate();
    return <Fragment>
        <Sheet open={open} onOpenChange={setopen}>
            <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full">
                    <SheetHeader className='border-b mb-5'>
                        <SheetTitle className='flex gap-2'>
                            <ChartNoAxesCombined size={30}/>
                            <h1 className="text-xl font-extrabold">Admin Panel</h1>
                        </SheetTitle>
                    </SheetHeader>
                    <MenuItems setopen={setopen} />
                </div>
            </SheetContent>
        </Sheet>
        <aside>
            <div className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
                <div onClick={() => navigate("/admin/dashboard")} className="flex text-2xl cursor-pointer items-center gap-2 mb-5">
                    <ChartNoAxesCombined size={30}/>
                    <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
                <MenuItems />
            </div>
        </aside>
    </Fragment>
}

export default AdminSidebar;