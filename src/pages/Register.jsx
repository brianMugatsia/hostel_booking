import { Link } from "react-router-dom";

function Register() {
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;

    const user = {
      email: form.email.value,
      password: form.password.value,
      role: form.role.value, // STUDENT or OWNER
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("Registered successfully!");

    window.location.href = "/login";
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control mb-2"
          name="email"
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

        {/* ROLE SELECTION */}
        <select className="form-control mb-3" name="role" required>
          <option value="">Select Role</option>
          <option value="STUDENT">Student</option>
          <option value="OWNER">Hostel Owner</option>
        </select>

       
        <Link to="/login" className="btn btn-success w-100">Register</Link>
      </form>
    </div>
  );
}

export default Register;
