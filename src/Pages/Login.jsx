import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/api.js";
import { useAuth } from "../Context/AuthContext.jsx";

function Login() {
  var [username, setUsername] = useState("");
  var [password, setPassword] = useState("");
  var [error, setError] = useState("");
  var [loading, setLoading] = useState(false);
  var { login } = useAuth();
  var navigate = useNavigate();
  var location = useLocation();
  var from = (location.state && location.state.from) || "/";

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    loginUser(username, password)
      .then(function (data) {
        login(data.token, username);
        navigate(from, { replace: true });
      })
      .catch(function (err) {
        setError(err.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  return (
    <div className="container section">
      <form className="form form-narrow" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p className="hint">Test account: mor_2314 / 83r5^_</p>
        <label>
          Username
          <input value={username} onChange={function (e) { setUsername(e.target.value); }} required />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={function (e) { setPassword(e.target.value); }}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn btn-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
