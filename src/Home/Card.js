import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";
import "./card.scss";
const Card = ({ data }) => {
  const { cart, dispatch } = useCart();
  const [itemCount, setItemCount] = useState(
    cart[data.id] === undefined ? 1 : cart[data.id].count
  );
  //updating the counter based on whether the item present in cart or not
  useEffect(() => {
    cart[data.id] === undefined
      ? setItemCount(1)
      : setItemCount(cart[data.id]?.count);
  }, [cart]);

  return (
    <div className="card">
      <p className="card-title">{data?.name}</p>
      <img className="card-image" src={data?.imageURL} alt={data?.name} />
      <div className="wrapper">
        <p className="card-price">Rs {data?.price}</p>
        <div className="item-count">
          <button
            className="count-btn"
            disabled={itemCount === 1}
            onClick={() => {
              console.log(cart, "cart");
              if (cart[data.id]) {
                dispatch({ data: data, count: itemCount - 1, type: "add" });
              } else setItemCount(itemCount - 1);
            }}
          >
            <box-icon name="minus" color="#32225a"></box-icon>
          </button>
          <span className="count">{itemCount}</span>
          <button
            className="count-btn"
            disabled={data?.quantity === itemCount}
            onClick={() => {
              if (cart[data.id]) {
                dispatch({ data: data, count: itemCount + 1, type: "add" });
              } else setItemCount(itemCount + 1);
            }}
          >
            <box-icon name="plus" color="#32225a"></box-icon>
          </button>
        </div>
      </div>
      {data?.quantity === itemCount && (
        <p className="info">Only {data?.quantity} item(s) in stock.</p>
      )}
      {(cart[data.id] && (
        <div className="wrapper">
          <Link className="card-btn" to="/cart">
            <button className="card-btn-link">Go to Cart</button>
          </Link>
          <button
            className="card-delete"
            onClick={() => dispatch({ data: data, count: 0, type: "delete" })}
          >
            <box-icon name="trash" type="solid" color="#ef3f0a"></box-icon>
          </button>
        </div>
      )) || (
        <button
          className="card-btn"
          onClick={() =>
            dispatch({ data: data, count: itemCount, type: "add" })
          }
        >
          Add to Card
        </button>
      )}
    </div>
  );
};
export default Card;
