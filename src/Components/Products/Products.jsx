import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter/ProductFilter";
import ProductList from "./ProductList/ProductList";
import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
import useFetchCollection from "../../CustomHooks/useFetchCollection";
import {
  GET_PRICE_RANGE,
  STORE_PRODUCTS,
  selectProducts,
} from "../../Redux/slice/productSlice";
import spinnerImg from "../..//assets/spinner.jpg";
import { FaCogs } from "react-icons/fa";
const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      }),
    );

    dispatch(
      GET_PRICE_RANGE({
        products: data,
      }),
    );
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="spinner"
              className="--center-all"
              style={{ width: "50px" }}
            />
          ) : (
            <ProductList products={products} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
