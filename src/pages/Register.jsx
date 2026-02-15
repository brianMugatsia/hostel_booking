import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  // Create default admin once
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const adminExists = users.some((u) => u.role === "ADMIN");

    if (!adminExists) {
      const defaultAdmin = {
        role: "ADMIN",
        adminId: "ADMIN001",
        name: "System",
        otherNames: "Administrator",
        email: "admin@hostel.com",
        phone: "0712345678",
        password: "admin123",
      };

      users.push(defaultAdmin);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const phone = form.phone.value;

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Kenya phone validation
    const kenyaPhoneRegex = /^07\d{8}$/;
    if (!kenyaPhoneRegex.test(phone)) {
      setError("Phone must start with 07 and contain 10 digits.");
      return;
    }

    // Email check
    if (users.find((u) => u.email === form.email.value)) {
      setError("Email already registered!");
      return;
    }

    const newUser = {
      role,
      name: form.name.value,
      otherNames: form.otherNames.value,
      email: form.email.value,
      phone,
      hostelName: role === "OWNER" ? form.hostelName.value : "",
      hostelNumber: role === "OWNER" ? form.hostelNumber.value : "",
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h3>Create Your Account</h3>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleRegister}>
          {/* ROLE (Admin Removed) */}
          <div className="form-group">
            <label>Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="STUDENT">Student</option>
              <option value="OWNER">Hostel Owner</option>
            </select>
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="name" required />
          </div>

          <div className="form-group">
            <label>Other Names</label>
            <input type="text" name="otherNames" required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="07XXXXXXXX" required />
          </div>

          {/* OWNER FIELDS */}
          {role === "OWNER" && (
            <>
              <div className="form-group">
                <label>Hostel Name</label>
                <input type="text" name="hostelName" required />
              </div>

              <div className="form-group">
                <label>Hostel Number</label>
                <input type="text" name="hostelNumber" required />
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
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                required
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
