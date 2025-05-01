import Home from "../pages/Home";
import About from "../pages/About";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import { PATH } from "../constants/const";
import { Navigate } from "react-router-dom";

export const publicRouter = [
  {
    path: PATH.home, // Đường dẫn root "/"
    element: Home,
  },
  {
    path: "/home", // Đường dẫn "/home"
    element: Home,
  },
  {
    path: PATH.about,
    element: About,
  },
  {
    path: PATH.product,
    element: Product,
  },
  {
    path: PATH.cart,
    element: Cart,
  },
];
