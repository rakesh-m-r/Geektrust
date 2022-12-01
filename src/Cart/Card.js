import { useState, useEffect } from "react";
import useCart from "../Hooks/useCart";
import "./card.scss";
const Card = ({ data }) => {
  const { cart, dispatch } = useCart();
  const [itemCount, setItemCount] = useState(
    cart[data.id] === undefined ? 1 : cart[data.id].count
  );

  useEffect(() => {
    cart[data.id] === undefined
      ? setItemCount(1)
      : setItemCount(cart[data.id]?.count);
  }, [cart]);

  return (
    <div className="cart-card">
      <img className="cart-card-image" src={data?.imageURL} alt={data?.name} />
      <div className="wrapper">
        <p className="cart-card-title">{data?.name}</p>

        <p className="cart-card-price">Rs {data?.price}</p>
      </div>
      <div className="item-count">
        <div className="wrapper">
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
        {data?.quantity === itemCount && (
          <p className="info">Only {data?.quantity} item(s) in stock.</p>
        )}
      </div>

      {(cart[data.id] && (
        <div className="wrapper">
          <button
            className="cart-card-delete"
            onClick={() => dispatch({ data: data, count: 0, type: "delete" })}
          >
            <box-icon name="trash" type="solid" color="#ef3f0a"></box-icon>
          </button>
        </div>
      )) || (
        <button
          className="cart-btn"
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
