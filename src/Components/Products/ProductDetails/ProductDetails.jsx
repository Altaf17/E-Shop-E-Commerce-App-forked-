import { Link, useParams } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../Firebase/config";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_CART_QUANTITY,
  DECREASE_CART,
  selectedCartItem,
  selectedCartTotalQuantity,
} from "../../../Redux/slice/cartSlice";

const ProductDetails = () => {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItemQuantity = useSelector(selectedCartItem);

  const cart = cartItemQuantity.find((cart) => cart.id === id);
const isCartAdded = cartItemQuantity.findIndex((cart)=>{
  return cart.id === id
})
  console.log(cart);

  const getSingleProduct = async () => {
    const productRef = doc(db, "products", id);

    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
      const obj = {
        id: id,
        ...productSnap.data(),
      };
      setSingleProduct(obj);
    } else {
      toast.error("Product not found");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const addToCart = (singleProduct) => {
    dispatch(ADD_TO_CART(singleProduct));
    dispatch(CALCULATE_CART_QUANTITY());
  };

  const decreaseCart = (singleProduct) => {
    dispatch(DECREASE_CART(singleProduct));
    dispatch(CALCULATE_CART_QUANTITY());
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div className="">
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {singleProduct === null ? (
          <img
            src={spinnerImg}
            alt="spinner"
            className="--center-all"
            style={{ width: "50px" }}
          />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={singleProduct.imageURL} alt={singleProduct.name} />
              </div>
              <div className={styles.content}>
                <h3>{singleProduct.name}</h3>
                <p className={styles.price}>{`$${singleProduct.price}`}</p>
                <p>{singleProduct.desc}</p>
                <p>
                  <b>SKU</b>&nbsp;
                  {singleProduct.id}
                </p>
                <p>
                  <b>Brand</b>&nbsp;
                  {singleProduct.brand}
                </p>
                <div className={styles.count}>
                  { isCartAdded < 0 ? null : (
                    <>
                      <button
                        className="--btn"
                        onClick={() => decreaseCart(singleProduct)}
                      >
                        -
                      </button>
                      <p>
                        <b>{cart.cartQuantity}</b>
                      </p>
                      <button
                        className="--btn"
                        onClick={() => addToCart(singleProduct)}
                      >
                        +
                      </button>
                    </>
                  )}
                </div>
                <button
                  className="--btn --btn-danger"
                  onClick={() => addToCart(singleProduct)}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
