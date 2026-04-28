import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  // AGE STATE
  const [age, setAge] = useState("");

  // CALCULATE AGE
  const calculateAge = (dob) => {
    if (!dob) return "";

    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  //  VALIDATION FUNCTION
  const validateForm = (data) => {
    const errors = {};

    const nameRegex = /^[A-Za-z\s'-]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const kenyaPhoneRegex = /^07\d{8}$/;

    if (!data.name) errors.name = "First name is required";
    else if (!nameRegex.test(data.name)) errors.name = "Only letters allowed";
    else if (data.name.length < 2) errors.name = "Min 2 characters";

    if (!data.otherNames) errors.otherNames = "Other names required";
    else if (!nameRegex.test(data.otherNames))
      errors.otherNames = "Only letters allowed";

    if (!data.email) errors.email = "Email is required";
    else if (!emailRegex.test(data.email)) errors.email = "Invalid email";

    if (!data.phone) errors.phone = "Phone is required";
    else if (!kenyaPhoneRegex.test(data.phone))
      errors.phone = "Use format 07XXXXXXXX";

    if (!data.dob) {
      errors.dob = "Date of birth is require";
    } else if (age < 18) {
      errors.dob = "You must be at least 18 years old";
    }

    if (!data.password) errors.password = "Password is required";
    else if (data.password.length < 6)
      errors.password = "Min 6 characters";

    if (!data.confirmPassword)
      errors.confirmPassword = "Confirm password required";
    else if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    if (data.role === "OWNER") {
      if (!data.hostelName) errors.hostelName = "Hostel name required";
      if (!data.hostelNumber) errors.hostelNumber = "Hostel number required";
    }

    return errors;
  };

  //  HANDLE REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    if (!captchaValue) {
      setError("Please verify you are not a robot.");
      return;
    }

    const form = e.target;

    const formData = {
      role,
      name: form.name.value.trim(),
      otherNames: form.otherNames.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      dob: form.dob.value,
      password: form.password.value.trim(),
      confirmPassword: form.confirmPassword.value.trim(),
      hostelName: role === "OWNER" ? form.hostelName?.value.trim() : "",
      hostelNumber: role === "OWNER" ? form.hostelNumber?.value.trim() : "",
    };

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    const userData = {
      role,
      name: formData.name,
      otherNames: formData.otherNames,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      age, //  send age
      hostelName: formData.hostelName || null,
      hostelNumber: formData.hostelNumber || null,
      password: formData.password,
      captchaToken: captchaValue,
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

        if (typeof data === "object") {
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
          {/* ROLE */}
          <div className="form-group">
            <label>Select Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="STUDENT">Student</option>
              <option value="OWNER">Hostel Owner</option>
            </select>
          </div>

          {/* NAME */}
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="name" />
            {fieldErrors.name && (
              <small className="error-text">{fieldErrors.name}</small>
            )}
          </div>

          {/* OTHER NAMES */}
          <div className="form-group">
            <label>Other Names</label>
            <input type="text" name="otherNames" />
            {fieldErrors.otherNames && (
              <small className="error-text">{fieldErrors.otherNames}</small>
            )}
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" />
            {fieldErrors.email && (
              <small className="error-text">{fieldErrors.email}</small>
            )}
          </div>

          {/* PHONE */}
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="07XXXXXXXX" />
            {fieldErrors.phone && (
              <small className="error-text">{fieldErrors.phone}</small>
            )}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setAge(calculateAge(e.target.value))}
            />
            {fieldErrors.dob && (
              <small className="error-text">{fieldErrors.dob}</small>
            )}
          </div>

          {/* AGE DISPLAY */}
          <div className="form-group">
            <label>Your Age</label>
            <input type="number" value={age} readOnly />
          </div>

          {/* OWNER FIELDS */}
          {role === "OWNER" && (
            <>
              <div className="form-group">
                <label>Hostel Name</label>
                <input type="text" name="hostelName" />
                {fieldErrors.hostelName && (
                  <small className="error-text">{fieldErrors.hostelName}</small>
                )}
              </div>

              <div className="form-group">
                <label>Hostel Number</label>
                <input type="text" name="hostelNumber" />
                {fieldErrors.hostelNumber && (
                  <small className="error-text">{fieldErrors.hostelNumber}</small>
                )}
              </div>
            </>
          )}

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {fieldErrors.password && (
              <small className="error-text">{fieldErrors.password}</small>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {fieldErrors.confirmPassword && (
              <small className="error-text">
                {fieldErrors.confirmPassword}
              </small>
            )}
          </div>

          {/* CAPTCHA */}
          <div className="form-group">
            <ReCAPTCHA
              sitekey="6Lcn2JcsAAAAABq88Du9I_LWtqekQkOr6Q_e4lJl"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;