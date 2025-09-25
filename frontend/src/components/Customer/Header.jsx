import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#1e90ff",
        color: "#fff",
      }}
    >
      {/* Left Side: Logo */}
      <h2 style={{ margin: 0, fontWeight: "bold" }}>TravelEase</h2>

      {/* Middle: Navigation */}
      <nav>
        <ul
          style={{
            display: "flex",
            listStyle: "none",
            gap: "20px",
            margin: 0,
            padding: 0,
          }}
        >
          <li>
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/booking" style={{ color: "#fff", textDecoration: "none" }}>
              Bookings
            </Link>
          </li>
          <li>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Side: User + Logout */}
      <div>
        <span style={{ marginRight: "20px" }}>
          Hi, {user?.name || "Guest"}
        </span>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#fff",
              color: "#1e90ff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
