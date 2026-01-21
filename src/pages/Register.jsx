import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const user = {
      email: form.email.value,
      password: form.password.value,
      role: form.role.value,
    };

    try {
      const response = await fetch("http://localhost:8082/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      
      const text = await response.text();

      // If registration failed, throw error
      if (!response.ok) {
        throw new Error(text.message || "Registration failed");
      }

      // Success
      alert("Registered successfully!");
      navigate("/login");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-2"
          name="email"
          type="email"
          placeholder="Email"
          required
        />

        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          required
        />

        <select className="form-control mb-3" name="role" required>
          <option value="">Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="LANDLORD">Hostel Owner</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
