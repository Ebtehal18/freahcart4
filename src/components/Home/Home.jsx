import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
// import { CounterCountext } from '../../context/CounterContext'
import axios from "axios";
import Products from "../Products/Products";
import Cart from "../Cart/Cart";

import RecentProuducts from "../RecentProuducts/RecentProuducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
     <Helmet>
      <title>Fresh Cart - Market</title>
         </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <RecentProuducts />
    
    </>
  );
}
