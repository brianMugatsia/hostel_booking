import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha"; // ✅ ADD THIS
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [captchaValue, setCaptchaValue] = useState(null); // ✅ ADD THIS

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // ✅ CAPTCHA VALIDATION
    if (!captchaValue) {
      setError("Please verify you are not a robot.");
      return;
    }

    const form = e.target;

    const password = form.password.value.trim();
    const confirmPassword = form.confirmPassword.value.trim();
    const phone = form.phone.value.trim();
    const name = form.name.value.trim();
    const otherNames = form.otherNames.value.trim();
    const email = form.email.value.trim();
    const hostelName = role === "OWNER" ? form.hostelName.value.trim() : null;
    const hostelNumber = role === "OWNER" ? form.hostelNumber.value.trim() : null;

    // Frontend validations
    if (!name || !otherNames || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const kenyaPhoneRegex = /^07\d{8}$/;
    if (!kenyaPhoneRegex.test(phone)) {
      setError("Phone must start with 07 and contain 10 digits.");
      return;
    }

    if (role === "OWNER" && (!hostelName || !hostelNumber)) {
      setError("Please provide hostel name and number for owners.");
      return;
    }

    const userData = {
      role,
      name,
      otherNames,
      email,
      phone,
      hostelName: hostelName || null,
      hostelNumber: hostelNumber || null,
      password,
      captchaToken: captchaValue, // ✅ SEND TO BACKEND (later use)
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:9090/api/auth/register",
        userData
      );

      alert(response.data.message || "Registered successfully!");
      navigate("/login");

    } catch (err) {
      if (err.response?.data) {
        const data = err.response.data;

        if (typeof data === "object" && !Array.isArray(data)) {
          setFieldErrors(data);
        }

        if (data.message) {
          setError(data.message);
        }
      } else {
        setError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h3>Create Your Account</h3>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="STUDENT">Student</option>
              <option value="OWNER">Hostel Owner</option>
            </select>
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="name" required />
            {fieldErrors.name && <small className="error-text">{fieldErrors.name}</small>}
          </div>

          <div className="form-group">
            <label>Other Names</label>
            <input type="text" name="otherNames" required />
            {fieldErrors.otherNames && <small className="error-text">{fieldErrors.otherNames}</small>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
            {fieldErrors.email && <small className="error-text">{fieldErrors.email}</small>}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="07XXXXXXXX" required />
            {fieldErrors.phone && <small className="error-text">{fieldErrors.phone}</small>}
          </div>

          {role === "OWNER" && (
            <>
              <div className="form-group">
                <label>Hostel Name</label>
                <input type="text" name="hostelName" required />
                {fieldErrors.hostelName && <small className="error-text">{fieldErrors.hostelName}</small>}
              </div>

              <div className="form-group">
                <label>Hostel Number</label>
                <input type="text" name="hostelNumber" required />
                {fieldErrors.hostelNumber && <small className="error-text">{fieldErrors.hostelNumber}</small>}
              </div>
            </>
          )}

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" required />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {fieldErrors.password && <small className="error-text">{fieldErrors.password}</small>}
            </div>
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input type={showConfirm ? "text" : "password"} name="confirmPassword" required />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* ✅ CAPTCHA ADDED HERE */}
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6Lcn2JcsAAAAABq88Du9I_LWtqekQkOr6Q_e4lJl"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;