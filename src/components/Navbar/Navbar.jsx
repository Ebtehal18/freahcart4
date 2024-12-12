import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import logoDark from "../../assets/images/fresgcart-dark.svg";
import { UserContext } from "../../context/UserContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from "../../context/WishListContext";
import { DarkModeContext } from "../../context/DarkModeContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { numOfCartItems,clearAll } = useContext(CartContext);
  let { setWishProducts, setwishCount,wishcount } = useContext(WishListContext);
  let {isDarkMode,toogleDarkMode } = useContext(DarkModeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  let navigate = useNavigate();

  function logOut() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    clearAll()
    setwishCount(0);
    setWishProducts([]);
   setMenuOpen(false)
    navigate("/login");
  }

  const navLinkStyles = ({ isActive }) => {
    return `block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 
   md:hover:text-green-700 xl:p-0 dark:text-white  
   pb-0
   dark:hover:bg-orange-700 dark:hover:text-white md:dark:hover:bg-transparent 
   relative before:absolute before:w-0 before:h-0.5 before:left-0 before:-bottom-1 
  xl:hover:before:w-full before:duration-200 before:transition-all before:bg-primary-800  dark:before:bg-orange-400 
   ${isActive ? "before:w-full font-semibold text-green-500 before:w-fit  " : ""}`;
  };

  return (
    <>
      <nav className={`bg-slate-100 border-gray-200 md:dark:bg-gray-800 dark:bg-gray-600 dark:border-gray-700  md:fixed top-0 start-0 end-0 z-50 shadow-md ${isDarkMode ? 'dark' : ''}`}>
        <div className="max-w-screen-xl flex flex-wrap justify-between items-center mx-auto p-4 gap-4  lg:flex-nowrap">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={isDarkMode?logoDark:logo} alt="flashcart logo" width={120} />
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded={menuOpen ? "true" : "false"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
           className={`${
            menuOpen ? "block" : "hidden"
          } w-full lg:flex lg:w-auto lg:justify-between flex-grow items-center`}
            id="navbar-dropdown"
          >
            {userLogin !== null ? (
              <ul className={`${style.links}  xl:bg-transparent  font-medium p-4 xl:p-0 mt-4 border border-gray-100 rounded-lg  xl:space-x-8 rtl:space-x-reverse  md:mt-0 xl:border-0   dark:bg-gray-800 md:dark:bg-transpanrent dark:border-gray-800 text-center` }>
                <li>
                  <NavLink to="" className={navLinkStyles} onClick={()=>setMenuOpen(false)}>
                    Home
                  </NavLink>
                </li>
     
                <li>
                  <NavLink
                  onClick={()=>setMenuOpen(false)}
                    to="products"
                    className={navLinkStyles}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                  onClick={()=>setMenuOpen(false)}
                    to="categories"
                    className={navLinkStyles}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                  onClick={()=>setMenuOpen(false)}
                    to="brands"
                    className={navLinkStyles}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                  onClick={()=>setMenuOpen(false)}
                    to="/allorders"
                    className={navLinkStyles}
                  >
                    All Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}

            <ul className={`${style.links}  xl:bg-transparent  font-medium p-4 xl:p-0 mt-4 border border-gray-100 rounded-lg  lg:space-x-8 rtl:space-x-reverse  xl:mt-0 xl:border-0 ml-auto dark:bg-gray-800 xl:dark:bg-transparent dark:border-gray-800 text-center  space-x-0` }>
              {userLogin !== null ? (
                <>
                <NavLink to="cart" className="cart cursor-pointer relative" onClick={()=>setMenuOpen(false)}>
                  <i class="fa-solid fa-cart-shopping text-lg dark:text-white"></i>
                  <span className="absolute h-5 w-5 rounded-full bg-green-500 text-white end-0 top-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-sm dark:bg-orange-500">
                    {numOfCartItems}
                  </span>
                </NavLink>
                <NavLink to="wishlist" className="wishlist cursor-pointer relative" onClick={()=>setMenuOpen(false)}>
                  <i class="fa-solid fa-heart text-lg dark:text-white"></i>
                  <span className="absolute h-5 w-5 rounded-full bg-green-500 text-white end-0 top-0 translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-sm dark:bg-orange-500">
                    {wishcount}
                  </span>
                </NavLink>
                </>
              ) : null}

              <li>
                <a href="https://facebook.com" target="_blank">
                  <i className="fab fa-facebook px-3 py-2 dark:text-white"></i>
                </a>
                <a href="https://tiktok.com" target="_blank">
                  <i className="fab fa-tiktok px-3 py-2 dark:text-white"></i>
                </a>
                <a href="https://twitter.com" target="_blank">
                  <i className="fab fa-twitter px-3 py-2 dark:text-white"></i>
                </a>
              </li>

              {userLogin == null ? (
                <>
                  <li>
                    <NavLink
                    onClick={()=>setMenuOpen(false)}
                      to="register"
                      className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                    onClick={()=>setMenuOpen(false)}
                      to="login"
                      className="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent  md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-orange-400 dark:hover:bg-gray-700  dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <span
           
                    className="block py-2 px-3 text-gray-900 rounded  md:hover:bg-transparent md:border-0 md:hover:text-green-500 md:p-0 dark:text-white md:dark:hover:text-orange-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer"
                    onClick={logOut}
                  >
                    Logout
                  </span>
                </li>
              )}

              <li>
                <DarkModeSwitch
                  checked={isDarkMode}
                  onChange={toogleDarkMode}
                  size={25}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
