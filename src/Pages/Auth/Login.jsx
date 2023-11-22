import styles from "./Auth.module.scss";
import LoginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../Components/Card/Card";
import { FaGoogle } from "react-icons/fa/index";
import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { GoogleAuthProvider } from "firebase/auth";
import { useSelector } from "react-redux";
import { selectedPreviousURL } from "../../Redux/slice/cartSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isloggedIn: false,
  });

  const postData = async () => {
    const response = await fetch("", formData);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const previousURL = useSelector(selectedPreviousURL);

  const LoginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);
        toast.success("Login Successfull");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Login SuccessFully");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className={` container ${styles.auth}`}>
          <div className={styles.img}>
            <img src={LoginImg} alt="" width="400" />
          </div>
          <Card>
            <div className={styles.form}>
              <h2>Login</h2>
              <form action="" onSubmit={LoginUser}>
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
                <button
                  type="submit"
                  className="--btn --btn-primary --btn-block"
                >
                  Login
                </button>
                <div className={styles.links}>
                  <Link to="/reset">Reset Password</Link>
                </div>
                <p>--Or--</p>
              </form>
              <button
                className="--btn --btn-danger --btn-block"
                onClick={SignInWithGoogle}
              >
                <FaGoogle /> Login with Google
              </button>
              <span className={styles.register}>
                <p>Don't have an account?</p> &nbsp;
                <Link to="/register">Register</Link>
              </span>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};
export default Login;
