// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api"; // 👈 backend API
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({ name, email, password });
      setMessage("Registered successfully ✅");
      console.log("User created:", res.data);

      // After signup → redirect to login
      navigate("/");
    } catch (err) {
      setMessage("Error: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Customer Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Choose Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
        <p style={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#1e90ff", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
