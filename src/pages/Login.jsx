import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    // Redirect based on role
    if (user.role === "OWNER") {
      navigate("/dashboard");
    } else if (user.role === "ADMIN") {
      navigate("/admin"); // optional admin page
    } else {
      navigate("/hostels");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center py-5">
      <div className="login-card p-4 shadow-sm">
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-check mb-3 d-flex justify-content-between align-items-center">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label ms-2" htmlFor="rememberMe">
                Remember Me
              </label>
            </div>

            <Link to="/forgot-password" className="text-success small">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center mt-3 mb-0">
          Don't have an account?{" "}
          <Link to="/register" className="text-success fw-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
