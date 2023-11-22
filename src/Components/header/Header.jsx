import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi/index";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import {
  SET_ACTIVE_USER,
  SET_REMOVE_ACTIVE_USER,
} from "../../Redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/HidenLinks";
import { AdminOnlyLink } from "../AdmineOnlyRoute/AdminOnly";
import {
  CALCULATE_CART_QUANTITY,
  selectedCartTotalQuantity,
} from "../../Redux/slice/cartSlice";

const Logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const ActiveLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartTotalQuantity = useSelector(selectedCartTotalQuantity);

  const Cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  const fixNavBar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_CART_QUANTITY());
  }, [dispatch]);

  window.addEventListener("scroll", fixNavBar);

  const ToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const HideMenu = () => {
    setShowMenu(false);
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully..");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        setUserName(user.displayName);
        if (user.displayName == null) {
          const U1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = U1.charAt(0).toUpperCase() + U1.slice(1);
          setUserName(uName);
        } else {
          setUserName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : userName,
            userId: user.uid,
          }),
        );
      } else {
        setUserName("");
        dispatch(SET_REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
      <div className={styles.header}>
        {Logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={HideMenu}
          ></div>
          <ul onClick={HideMenu}>
            <li className={styles["logo-mobile"]}>
              <Link to="/">{Logo}</Link>
              <FaTimes size={22} color="#fff" onClick={HideMenu} />
            </li>

            <li>
              <AdminOnlyLink>
                <Link to="./admin/home">
                  <button className="--btn --btn-primary">Admin</button>
                </Link>
              </AdminOnlyLink>
            </li>
            <li>
              <NavLink to="/" className={ActiveLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={ActiveLink}>
                Contact us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={HideMenu}>
            <span className={styles.links}>
              <ShowOnLogout>
                <NavLink to="/login" className={ActiveLink}>
                  Login
                </NavLink>
              </ShowOnLogout>

              <ShowOnLogin>
                <a href="#home" style={{ color: "orangeRed" }}>
                  <FaUserCircle size={16} />
                  Hi, {userName}
                </a>
              </ShowOnLogin>
              <ShowOnLogout>
                <NavLink to="/register" className={ActiveLink}>
                  Register
                </NavLink>
              </ShowOnLogout>
              <NavLink to="/order-history" className={ActiveLink}>
                My Orders
              </NavLink>
              <ShowOnLogin>
                <NavLink onClick={Logout}>LogOut</NavLink>
              </ShowOnLogin>
            </span>
            {Cart}
          </div>
        </nav>
        <div className={styles["menu-icon"]}>
          {Cart}
          <HiOutlineMenuAlt3 size={28} onClick={ToggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
