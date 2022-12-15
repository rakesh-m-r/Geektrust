import useCart from "../Hooks/useCart";
import { Link } from "react-router-dom";

import Card from "./Card";
import "./styles.scss";
const Cart = () => {
  const { cart } = useCart();
  return (
    <div className="cart-wrapper">
      {" "}
      {Object.values(cart)?.length === 0 ? (
        <div className="wrapper-col">
          <p className="no-data"> No Items in Cart.</p>
          <br />
          <p className="link-list">
            Visit <Link to="/">Product List</Link> to add item to cart.
          </p>
        </div>
      ) : (
        <>
          <p className="sub-heading">
            Shopping Cart{" "}
            <span>
              Total Amount: Rs{" "}
              {Object.values(cart)?.reduce((accumulator, current) => {
                return current.count * current.price + accumulator;
              }, 0)}
            </span>
          </p>
          <div className="cart">
            <div className="cart-items-list">
              <>
                {Object.values(cart)?.map((item) => (
                  <Card key={item.id} data={item} />
                ))}
              </>
            </div>
          </div>
        </>
      )}{" "}
    </div>
  );
};

export default Cart;
