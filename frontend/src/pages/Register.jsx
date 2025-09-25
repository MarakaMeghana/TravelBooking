import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Register.css"; // Import CSS

const Register = () => {
  const { register } = useContext(AuthContext); // You can add a register function later
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate registration
    register && register({ name, email, role: "customer" });
    alert("Registered successfully!");
    navigate("/");
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Customer Registration</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
