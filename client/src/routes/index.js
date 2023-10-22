import Home from "~/Pages/Home";
import Login from "~/Pages/Login";
import Register from "~/Pages/Register";
import HomeMember from "~/Pages/HomeMember";
import Author from "~/components/Layout/Author";
import Shopping from "~/Pages/Shopping";
import Cart from "~/Pages/Cart";
import Checkout from "~/Pages/Checkout/Home";
import CheckoutOrder from "~/Pages/Checkout/OrderComplete";
import Product from "~/Pages/Product";
import Post from "~/Pages/Post";
import Message from "../Pages/Message";


const publicRoutes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
    Layout: Author,
  },
  {
    path: "/register",
    component: Register,
    Layout: Author,
  },
  {
    path: "/home",
    component: HomeMember,
  },
  {
    path: "/shop",
    component: Shopping,
  },
  {
    path: "/cart",
    component: Cart,
  },
  {
    path: "/checkout",
    component: Checkout,
  },
  {
    path: "/checkoutorder",
    component: CheckoutOrder,
  },
  {
    path: "/product/:id",
    component: Product,
  },
  {
    path: "/post",
    component: Post,
  },
  {
    path: "/messages",
    component: Message,
  },
];

export { publicRoutes };
