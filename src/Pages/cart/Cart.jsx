import React, { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { selectIsLoggedIn } from "../../Redux/slice/authSlice";
import {
  ADD_TO_CART,
  CALCULATE_CART_QUANTITY,
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectedCartItem,
  selectedCartTotalAmount,
  selectedCartTotalQuantity,
} from "../../Redux/slice/cartSlice";
import styles from "./Cart.module.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectedCartItem);
  const cartTotalQuantity = useSelector(selectedCartTotalQuantity);
  const cartTotalAmount = useSelector(selectedCartTotalAmount);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cartItem) => {
    dispatch(REMOVE_FROM_CART(cartItem));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_CART_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  const url = window.location.href;

  const checkout = () => {
    if (isLoggedIn) {
      navigate("/checkout-detail");
    } else {
      dispatch(SAVE_URL(url));
      navigate("/login");
    }
  };

  return (
    <section className={`container ${styles.table}`}>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <>
          <p>Your Cart is currently empty</p>
          <br />
          <div>
            <Link to="/#products">&larr; Continue Shopping</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem, index) => {
                const { id, name, price, imageURL, cartQuantity } = cartItem;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{price}</td>
                    <td>
                      <div className={styles.count}>
                        <button
                          className="--btn"
                          onClick={() => decreaseCart(cartItem)}
                        >
                          -
                        </button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button
                          className="--btn"
                          onClick={() => increaseCart(cartItem)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{(price * cartQuantity).toFixed(2)}</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => removeFromCart(cartItem)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <button className="--btn --btn-danger" onClick={clearCart}>
              Clear cart
            </button>
            <div className={styles.checkout}>
              <div>
                <Link to="/#products">&larr; Continue Shopping</Link>
              </div>
              <br />
              <Card CardClass={styles.card}>
                <p>
                  <b> {`Cart Item(s):  ${cartTotalQuantity}`}</b>
                </p>
                <div className={styles.text}>
                  <h4>Subtotal :</h4>
                  <h3>{`$${cartTotalAmount.toFixed(2)}`}</h3>
                </div>
                <p>Tax an shipping calculated at checkout</p>
                <button
                  className="--btn --btn-primary --btn-block"
                  onClick={checkout}
                >
                  Check Out
                </button>
              </Card>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
