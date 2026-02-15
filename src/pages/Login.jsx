import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find(
      (u) =>
        u.email === formData.email &&
        u.password === formData.password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("isLoggedIn", "true");

    if (formData.rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    if (user.role === "OWNER") {
      navigate("/dashboard");
    } else if (user.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/hostels");
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg">

        <h3 className="login-title text-center mb-4">
          Welcome Back
        </h3>

        {error && (
          <div className="alert alert-danger text-center p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="form-group mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remember + Forgot */}
          <div className="form-check mb-3 d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                name="rememberMe"
                className="form-check-input"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="form-check-label ms-2">
                Remember Me
              </label>
            </div>

            <Link to="/forgot-password" className="forgot-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn login-btn btn-secondary w-100">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
