import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#1976d2", color: "#fff" }}>
      <h3>Travel Admin</h3>
      {user && (
        <div>
          <span style={{ marginRight: "10px" }}>{user.name}</span>
          <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
