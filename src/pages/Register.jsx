import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const user = {
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (users.find((u) => u.email === user.email)) {
      alert("Email already registered!");
      return;
    }

    // Save new user
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center py-5">
      <div className="register-card p-4 shadow-sm">
        <h3 className="text-center mb-4">Create Your Account</h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="mb-3">
            <select className="form-control" name="role" required>
              <option value="">Select Role</option>
              <option value="STUDENT">Student</option>
              <option value="OWNER">Hostel Owner</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
