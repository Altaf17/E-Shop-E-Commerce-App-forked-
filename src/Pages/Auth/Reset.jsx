import styles from "./Auth.module.scss";
import ResetImg from "../../assets/forgot.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Navigate = useNavigate();

  const resetPassowrd = (e) => {
    e.preventDefault();
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.info("password Reset mail sent please check your email");
        setEmail("");
        Navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className={` container ${styles.auth}`}>
          <div className={styles.img}>
            <img src={ResetImg} alt="" width="400" />
          </div>
          <Card>
            <div className={styles.form}>
              <h2>Reset Password</h2>
              <form action="" onSubmit={resetPassowrd}>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <button
                  className="--btn --btn-primary --btn-block"
                  type="submit"
                >
                  Reset Password
                </button>
                <div className={styles.links}>
                  <p>
                    <Link to="/login"> - Login</Link>
                  </p>
                  <p>
                    <Link to="/register"> - Register</Link>
                  </p>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};
export default Reset;
