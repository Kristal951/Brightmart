import { MdDashboard } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";

export const AdminSidebarLinks = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: MdDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: AiOutlineProduct,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: GiShoppingCart,
  },
];

export const categories = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home"
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listings"
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listings"
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listings"
  },
  {
    id: "unisex",
    label: "Unisex",
    path: "/shop/listings"
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listings"
  },
  {
    id: "gadgets",
    label: "Gadgets",
    path: "/shop/listings"
  },
];
