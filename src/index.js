import './index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import Home from './components/Home';
import Login from './components/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Signup from './components/Signup';
import AddProduct from './components/AddProduct';
import LikedProducts from './components/LikedProducts';
import ProductDetails from './components/ProductDetails';
import CategoryPage from './components/CategoryPage';
import MyProducts from './components/MyProducts';
import MyProfile from './components/MyProfile';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home />),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path: "/login",
    element: (<Login />),
  },
  {
    path: "/signup",
    element: (<Signup />),
  },
  {
    path: "/add-product",
    element: (<AddProduct />),
  },
  {
    path: "/liked-products",
    element: (<LikedProducts />),
  },
  {
    path: "/product/:pId",
    element: (<ProductDetails />),
  },
  {
    path: "/category/:catName",
    element: (<CategoryPage />),
  },
  {
    path: "/my-products",
    element: (<MyProducts />),
  },
  {
    path: "/my-profile",
    element: (<MyProfile />),
  }
  
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
  );