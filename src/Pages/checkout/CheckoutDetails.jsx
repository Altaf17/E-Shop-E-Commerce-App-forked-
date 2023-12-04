import React, { useState } from "react";
import styles from "./CheckoutDetails.module.scss";
import { CountryDropdown } from "react-country-region-selector";
import Card from "../../Components/Card/Card";
import { useDispatch } from "react-redux";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "../../Redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../Components/CheckoutSummary/CheckoutSummary";
const initialAddressState = {
  name: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  postal_code: "",
  country: "",
  phone: "",
};
const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };
  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate("/checkout");
  };
  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card CardClass={styles.card}>
              <label htmlFor="name">Recipient Name</label>
              <input
                type="text"
                name="name"
                placeholder="Recipient Name"
                value={shippingAddress.name}
                onChange={(e) => handleShipping(e)}
              />
              <label> Address Line 1</label>
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                value={shippingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address Line 2</label>
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={shippingAddress.line2}
                onChange={(e) => handleShipping(e)}
              />
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="city"
                value={shippingAddress.city}
                onChange={(e) => handleShipping(e)}
              />
              <label>State</label>
              <input
                type="text"
                name="state"
                placeholder="state"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <label>Portal code</label>
              <input
                type="text"
                name="portal_code"
                placeholder="Portal code"
                value={shippingAddress.state}
                onChange={(e) => handleShipping(e)}
              />
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) =>
                  handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleShipping(e)}
              />
            </Card>
            {/* billing */}
            <br />
            <Card CardClass={styles.card}>
              <h3>Billing Address</h3>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={billingAddress.name}
                onChange={(e) => handleBilling(e)}
              />
              <label> Address Line 1</label>
              <input
                type="text"
                name="line1"
                placeholder="Address Line 1"
                value={billingAddress.line1}
                onChange={(e) => handleShipping(e)}
              />
              <label>Address Line 2</label>
              <input
                type="text"
                name="line2"
                placeholder="Address Line 2"
                value={billingAddress.line2}
                onChange={(e) => handleBilling(e)}
              />
              <label>City</label>
              <input
                type="text"
                name="city"
                placeholder="city"
                value={billingAddress.city}
                onChange={(e) => handleBilling(e)}
              />
              <label>State</label>
              <input
                type="text"
                name="state"
                placeholder="state"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <label>Portal code</label>
              <input
                type="text"
                name="portal_code"
                placeholder="Portal code"
                value={billingAddress.state}
                onChange={(e) => handleBilling(e)}
              />
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) =>
                  handleBilling({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={shippingAddress.phone}
                onChange={(e) => handleBilling(e)}
              />
              <button  disabled={true} type="submit" className="--btn ">
                Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
            <Card CardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
