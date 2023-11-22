import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Contact,
  Login,
  Register,
  Reset,
  Admin,
  ProductDetails,
  Cart,
  CheckoutDetails,
  Checkout,
  CheckoutSuccess,
} from "./Pages/index";
import { Header, Footer } from "./Components/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOnlyRoute from "./Components/AdmineOnlyRoute/AdminOnly";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute>
                <Admin />
              </AdminOnlyRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-detail" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
