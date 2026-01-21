import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8082/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON from response
      const text = await response.text();

      // If response not ok, throw error
      if (!response.ok) {
        throw new Error(text.message || "Invalid email or password");
      }

      // Save user info in localStorage (do NOT store password in production)
      localStorage.setItem("currentUser", JSON.stringify(text));
      localStorage.setItem("isLoggedIn", "true");

      // Redirect based on role
      if (text.role === "LANDLORD") {
        navigate("/dashboard");
      } else {
        navigate("/hostels");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <h3 className="text-center">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
