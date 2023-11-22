import React from "react";
import styles from "./Admin.module.scss";
import AdminNavbar from "../../Components/Admin/AdminNavbar/AdminNavbar";
import { Route, Routes } from "react-router-dom";
import ViewProducts from "../../Components/Admin/view-products/ViewProducts";
import Orders from "../../Components/Admin/orders/Orders";
import AddProduct from "../../Components/Admin/add-product/AddProduct";
// import AdminHome from "../../Components/Admin/home/AdminHome";
import Home from "../home/Home";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <AdminNavbar />
      </div>
      <div className={styles.content}>
        <Routes>
          {/* <Route path="Admin-home" element={<AdminHome />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
