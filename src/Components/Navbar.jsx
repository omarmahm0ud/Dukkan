import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
import { useAuth } from "../Context/AuthContext.jsx";

function Navbar() {
  var { count } = useCart();
  var { token, username, logout } = useAuth();
  var navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          Dukkan
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart">Cart ({count})</NavLink>
          {token ? (
            <button className="link-btn" onClick={handleLogout}>
              Logout ({username})
            </button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
