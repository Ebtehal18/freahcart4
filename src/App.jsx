import { useEffect, useState } from "react";

// import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Notfound from "./components/Notfound/Notfound";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FreshCart from './components/FreshCart/FreshCart'
import WisListContextProvider from "./context/WishListContext";
import Payment from "./components/Payment/Payment";
import WhshList from "./components/WishList/WishList";
import AllOrders from "./components/AllOrders/AllOrders";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import VerifyRestCode from "./components/VerifyRestCode/VerifyRestCode";
import RestPassword from "./components/RestPassword/RestPassword";
import UserContextProvider from "./context/UserContext";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import ProtectRoutes from "./components/ProtectRoutes/ProtectRoutes";
import DetailsBrands from "./components/DetailsBrands/DetailsBrands";
import DetailsCategorey from "./components/DetailsCategorey/DetailsCategorey";
import CartContextProvider from "./context/CartContext";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import DarkMOdeProvider from "./context/DarkModeContext";

const queryClient = new QueryClient();
let routes = createBrowserRouter([
  {
    path: "",element: <Layout />,children: [
      {index: true,element: (<ProtectRoutes><Home /></ProtectRoutes>)},
      {path: "products",element: (<ProtectRoutes><Products /></ProtectRoutes>)},
      {
        path: "cart",
        element: (
          <ProtectRoutes>
            <Cart />
          </ProtectRoutes>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectRoutes>
            <Brands />
          </ProtectRoutes>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectRoutes>
            <ProductDetails />
          </ProtectRoutes>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectRoutes>
            <Categories />
          </ProtectRoutes>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectRoutes>
            <WhshList />
          </ProtectRoutes>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectRoutes>
            <Payment />
          </ProtectRoutes>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectRoutes>
            <AllOrders />
          </ProtectRoutes>
        ),
      },
      { path: "forgetpassword", element: <ForgetPassword /> },
      { path: "verifyrestcode", element: <VerifyRestCode /> },
      { path: "resetpassword", element: <RestPassword /> },
      {
        path: "detailscategorey/:categoryName",
        element: (
          <ProtectRoutes>
            <DetailsCategorey />
          </ProtectRoutes>
        ),
      },
      {
        path: "detailsbrand/:brandName",
        element: (
          <ProtectRoutes>
            <DetailsBrands />
          </ProtectRoutes>
        ),
      },
      { path: "*", element: <Notfound /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <WisListContextProvider>
              <DarkMOdeProvider>
       
            <RouterProvider router={routes} ></RouterProvider>

            <div>
              <Offline>
                <span className='fixed bottom-0 start-2 bg-red-500 text-white px-5 py-3 rounded-md shadow-lg'>
                  Your internet connection is slow or lost
                </span>
              </Offline>
            </div>

            <Toaster position="top-right" />
            <ReactQueryDevtools />
     
              </DarkMOdeProvider>
            </WisListContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
