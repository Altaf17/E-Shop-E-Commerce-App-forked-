import styles from "./Auth.module.scss";
import RegisterImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import Loader from "../../Components/Loader/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const RegisterUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Password do Not Match");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Registration Successfully..");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className={` container ${styles.auth}`}>
          <Card>
            <div className={styles.form}>
              <h2>Register</h2>
              <form action="" onSubmit={RegisterUser}>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="Password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="Password"
                  placeholder="Confirm Password"
                  required
                  value={cPassword}
                  onChange={(e) => setCpassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Register
                </button>
              </form>

              <span className={styles.register}>
                <p>Already have a Account ?</p> &nbsp;
                <Link to="/login">Login</Link>
              </span>
            </div>
          </Card>
          <div className={styles.img}>
            <img src={RegisterImg} alt="" width="400" />
          </div>
        </div>
      </section>
    </>
  );
};
export default Register;
