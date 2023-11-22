import { useEffect, useState } from "react";
import "./ViewProducts.module.scss";
import styles from "./ViewProducts.module.scss";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, storage } from "../../../Firebase/config";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../Loader/Loader";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {
  STORE_PRODUCTS,
  selectProducts
} from "../../../Redux/slice/productSlice";
import useFetchCollection from "../../../CustomHooks/useFetchCollection";

const ViewProducts = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data
      })
    );
  });

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // const getProducts = () => {
  //   setIsLoading(true);
  //   try {
  //     const productsRef = collection(db, "products");
  //     const q = query(productsRef, orderBy("createdAt", "desc"));
  //     onSnapshot(q, (snapshot) => {
  //       const allProducts = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setProducts(allProducts);
  //       setIsLoading(false);
  //       dispatch(
  //         STORE_PRODUCTS({
  //           products: allProducts
  //         })
  //       );
  //     });
  //   } catch (error) {
  //     setIsLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      const storageRef = ref(storage, imageURL);

      await deleteObject(storageRef);
      toast.success("Product Deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>ViewProducts</h2>
        {products.length === 0 ? (
          <p>No Product Found!!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            {products.map((prod, index) => {
              const { name, id, imageURL, category, price } = prod;
              return (
                <tbody key={id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => deleteProduct(id, imageURL)}
                      />
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        )}
      </div>
    </>
  );
};
export default ViewProducts;
