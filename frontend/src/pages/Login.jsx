// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // 👈 backend API
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // we’ll validate but backend doesn’t check password yet
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email); // API call → GET /api/auth/user?email=...
      if (res.data) {
        // ✅ Save user in localStorage so Dashboard/Profile can access it
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userEmail", res.data.email);
        localStorage.setItem("userName", res.data.name);

        setMessage("Login successful ✅");
        navigate("/dashboard");
      } else {
        setMessage("User not found ❌");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Customer Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#1e90ff", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
