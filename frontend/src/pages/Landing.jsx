import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate(); // <-- you need this

  const goToAdmin = () => {
    window.location.href = "http://localhost:5177"; // separate Admin app
  };

  const goToCustomer = () => {
    navigate("/Login"); // navigate to Customer login page inside the same app
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Travel Booking Portal</h1>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={goToAdmin}>
          Admin Login
        </button>
        <button style={styles.button} onClick={goToCustomer}>
          Customer Login
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #6dd5ed, #2193b0)",
    color: "#fff",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "2rem",
  },
  button: {
    padding: "1rem 2rem",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#fff",
    color: "#2193b0",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Landing;
