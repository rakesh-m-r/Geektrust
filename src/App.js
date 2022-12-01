import { Link, Route, Routes } from "react-router-dom";
import "./styles.scss";
import Home from "./Home";
import Cart from "./Cart";
import React from "react";
import "boxicons";
import useCart from "./Hooks/useCart";

export default function App() {
  const { cart } = useCart();
  return (
    <>
      {/*Header*/}
      <div className="heading">
        <div className="heading-title">TeeRex</div>
        <div className="heading-options">
          <span className="heading-options-item">
            <Link to="/">Products List</Link>
          </span>
          <span className="heading-options-item">
            <Link to="/cart">
              <box-icon name="cart-alt" color="#32225a"></box-icon>{" "}
              <sup>
                {Object.values(cart)?.reduce((accumulator, current) => {
                  return accumulator + current?.count;
                }, 0)}
              </sup>
            </Link>
          </span>
        </div>
      </div>
      {/* Routes setup using React router library */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
