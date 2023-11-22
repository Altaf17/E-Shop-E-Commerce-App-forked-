import { useState } from "react";
import { selectUserName } from "../../../Redux/slice/authSlice";
import styles from "./AdminNavbar.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ActiveLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const AdminNavbar = () => {
  const userName = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{userName}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink className={ActiveLink} to="/admin/home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={ActiveLink} to="/admin/all-products">
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink className={ActiveLink} to="/admin/add-product/ADD">
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink className={ActiveLink} to="/admin/orders">
              orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default AdminNavbar;
