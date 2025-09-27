import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockUsers = [
    { name: "Admin User", email: "admin@travel.com", password: "admin123", role: "ADMIN" },
    { name: "Customer User", email: "customer@travel.com", password: "cust123", role: "CUSTOMER" },
    { name: "Seller User", email: "seller@travel.com", password: "seller123", role: "SELLER" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return setError("All fields are required");

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      login(user);
      setError("");

      if (user.role === "ADMIN") navigate("/admin");
      if (user.role === "CUSTOMER") navigate("/customer");
      if (user.role === "SELLER") navigate("/seller");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" // full viewport height
      marginLeft="550px"
      sx={{ backgroundColor: "#ffffff" }}
    >
      <Box 
        width={350} 
        p={4} 
        boxShadow={3} 
        borderRadius={2}
      >
        <Typography variant="h5" mb={2} textAlign="center">Login</Typography>
        {error && <Typography color="error" mb={2} textAlign="center">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
