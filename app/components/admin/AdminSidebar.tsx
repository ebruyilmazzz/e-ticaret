"use client"
import { usePathname } from "next/navigation";
import AdminSidebarItem from "./AdminSidebarItem"
import { MdDashboard, MdBorderOuter,MdOutlineCreate } from "react-icons/md";

const AdminSidebar = () => {
    const pathname = usePathname();
    const adminPanel = [
       
        {
            name: "Ürün Olustur",
            icon: MdOutlineCreate,
            url: "/admin/create"
        },
        {
            name: "Ürünleri Yönet",
            icon: MdOutlineCreate,
            url: "/admin/manage"
        },
       
    ]
  return (
    <div className="w-1/5 border-r h-screen p-4 bg-slate-700">
          <div className="space-y-4">
            {
                adminPanel.map((admin,i) => (
                    <AdminSidebarItem key={i} selected={pathname == admin.url} icon={admin.icon} name={admin.name} url={admin.url}/>
                ))
            }
          </div>
    </div>
  )
}

export default AdminSidebar