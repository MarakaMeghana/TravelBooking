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
        backgroundColor: "#008080", // ✅ White navbar
        color: "#333",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", // ✅ Professional shadow
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Left Side: Logo */}
      <h2 style={{ margin: 0, fontWeight: "bold", color: "#e1ecebff" }}>
        TravelEase
      </h2>

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
            <Link
              to="/dashboard"
              style={{
                color: "#f5efefff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/booking"
              style={{
                color: "#eee9e9ff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Bookings
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              style={{
                color: "#f4f0f0ff",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right Side: User + Logout */}
      <div>
        <span style={{ marginRight: "20px", color: "#555" }}>
          Hi, {user?.name || "Guest"}
        </span>
        {user && (
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#044e6bff", // ✅ Teal button
              color: "#fff",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#00796b")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#009688")}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
