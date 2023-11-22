import React from "react";
import styles from "./CheckoutSummary.module.scss";
import {
  selectedCartItem,
  selectedCartTotalAmount,
  selectedCartTotalQuantity,
} from "../../Redux/slice/cartSlice";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

const CheckoutSummary = () => {
  const cartItems = useSelector(selectedCartItem);
  const cartTotalAmount = useSelector(selectedCartTotalAmount);
  const cartTotalQuantity = useSelector(selectedCartTotalQuantity);
  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.length === 0 ? (
          <>
            <p>No items in your cart</p>
            <button className="--btn">
              <Link to="/#products">Back to shop</Link>
            </button>
          </>
        ) : (
          <>
            <p>
              <b>{`Cart item(s) : ${cartTotalQuantity}`}</b>
            </p>
            <div className={styles.text}>
              <h4>Subtotal:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartQuantity } = item;
              return (
                <Card CardClass={styles.card} key={id}>
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartQuantity}</p>
                </Card>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
