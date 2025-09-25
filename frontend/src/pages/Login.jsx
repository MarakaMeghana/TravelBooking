import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"; // Use the CSS you already have
import { loginUser } from "../apiService"

const Login = () => {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: "Customer", email, role: "customer" });
    navigate("/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    register && register({ name, email, role: "customer" });
    alert("Registered successfully!");
    setIsSignup(false); // switch to login after signup
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {!isSignup ? (
          <>
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
            <p style={{ marginTop: "15px" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#1e90ff", cursor: "pointer" }}
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="register-title">Customer Sign Up</h2>
            <form onSubmit={handleSignup} className="register-form">
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
            <p style={{ marginTop: "15px" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#1e90ff", cursor: "pointer" }}
                onClick={() => setIsSignup(false)}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;