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

export const DummyProductData = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description:
      "High-quality noise-canceling earbuds with a long battery life.",
    price: 50,
    stock: 100,
    category: "Accessories",
    image: "wireless_earbuds.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "Track your fitness and notifications with this stylish smartwatch.",
    price: 120,
    stock: 50,
    category: "Gadgets",
    image: "smart_watch.jpg",
  },
  {
    id: 3,
    name: "Men's Jacket",
    description: "Warm and durable jacket for the winter season.",
    price: 80,
    stock: 30,
    category: "Men",
    image: "mens_jacket.jpg",
  },
  {
    id: 4,
    name: "Women's Handbag",
    description: "Elegant and spacious handbag for all your essentials.",
    price: 70,
    stock: 20,
    category: "Women",
    image: "womens_handbag.jpg",
  },
  {
    id: 5,
    name: "Gaming Mouse",
    description: "Ergonomic mouse with customizable RGB lighting.",
    price: 40,
    stock: 80,
    category: "Gadgets",
    image: "gaming_mouse.jpg",
  },
  {
    id: 6,
    name: "Kids' Toy Car",
    description: "Fun and interactive toy car with remote control.",
    price: 25,
    stock: 150,
    category: "Kids",
    image: "kids_toy_car.jpg",
  },
  {
    id: 7,
    name: "Sunglasses",
    description: "UV-protective and stylish sunglasses for outdoor activities.",
    price: 30,
    stock: 60,
    category: "Unisex",
    image: "sunglasses.jpg",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    description: "Portable speaker with crystal-clear sound quality.",
    price: 60,
    stock: 40,
    category: "Accessories",
    image: "bluetooth_speaker.jpg",
  },
  {
    id: 9,
    name: "Laptop Backpack",
    description:
      "Durable backpack with multiple compartments for laptops and gadgets.",
    price: 90,
    stock: 25,
    category: "Accessories",
    image: "laptop_backpack.jpg",
  },
  {
    id: 10,
    name: "Digital Camera",
    description:
      "Capture high-resolution images with this compact digital camera.",
    price: 300,
    stock: 15,
    category: "Gadgets",
    image: "digital_camera.jpg",
  },
  {
    id: 10,
    name: "Digital Camera",
    description:
      "Capture high-resolution images with this compact digital camera.",
    price: 300,
    stock: 15,
    category: "Gadgets",
    image: "digital_camera.jpg",
  },
];
