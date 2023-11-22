import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail } from "../../Redux/slice/authSlice";

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "altafsky17@gmail.com") {
    return children;
  }
  return (
    <section style={{ height: "80vh" }}>
      <div className="container">
        <h2>Permission Denied</h2>
        <p>This Page can only be view by an Admin User</p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back to Home</button>
        </Link>
      </div>
    </section>
  );
};

export default AdminOnlyRoute;

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);
  if (userEmail === "altaf@test.com") {
    return children;
  }
  return null;
};
