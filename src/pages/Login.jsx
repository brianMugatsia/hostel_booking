import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    //  CAPTCHA validation
    if (!captchaValue) {
      setError("Please verify you are not a robot.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:9090/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
          captchaToken: captchaValue, // send to backend for verification
        }
      );

      const { token, role, name, email } = response.data;

      // Save current user info in localStorage
      const currentUser = { name, role, email };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("isLoggedIn", "true");

      // Save JWT token (localStorage if rememberMe, else sessionStorage)
      if (formData.rememberMe) localStorage.setItem("token", token);
      else sessionStorage.setItem("token", token);

      // Redirect by role
      if (role === "OWNER") navigate("/dashboard");
      else if (role === "ADMIN") navigate("/admin");
      else navigate("/hostels");
    } catch (err) {
      if (err.response) setError(err.response.data.message || "Invalid credentials");
      else setError("Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="login-card p-4 shadow-lg">
        <h3 className="login-title text-center mb-4">Welcome Back</h3>

        {error && <div className="alert alert-danger text-center p-2">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3 d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label className="ms-2">Remember Me</label>
            </div>

            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          {/* CAPTCHA added here */}
          <div className="form-group mb-3">
            <ReCAPTCHA
              sitekey="6Lcn2JcsAAAAABq88Du9I_LWtqekQkOr6Q_e4lJl"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;