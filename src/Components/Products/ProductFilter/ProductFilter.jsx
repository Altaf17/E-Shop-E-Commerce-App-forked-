import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductFilter.module.scss";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../../Redux/slice/filterSlice";
import { useEffect, useState } from "react";
import {
  GET_PRICE_RANGE,
  selectMaxPrice,
  selectMinPrice,
  selectProducts,
} from "../../../Redux/slice/productSlice";

const ProductFilter = () => {
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState(10000);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const maxPrice = useSelector(selectMaxPrice);
  const minPrice = useSelector(selectMinPrice);

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  const allBrands = [
    "All",
    ...new Set(products.map((product) => product.brand)),
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
  };

  useEffect(() => {
    dispatch(
      FILTER_BY_BRAND({
        products,
        brand,
      }),
    );
  }, [brand, products, dispatch]);

  useEffect(() => {
    dispatch(
      FILTER_BY_PRICE({
        products,
        price,
      }),
    );
  }, [price, dispatch]);

  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice(maxPrice);
  };
  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map((cat, index) => {
          return (
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${styles.active}` : null}
              onClick={() => filterProducts(cat)}
            >
              &#8250; {cat}
            </button>
          );
        })}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, index) => {
            return (
              <option key={index} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
        <h4>Price</h4>
        <p>{`${price}`}</p>
        <div className={StyleSheet.price}>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />
        </div>
        <br />
        <button className="--btn --btn-danger" onClick={clearFilter}>
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
