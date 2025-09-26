import { useContext, useState } from "react";
import Header from "../components/Customer/Header";
import Footer from "../components/Customer/Footer";
import { AuthContext } from "../context/AuthContext";
import "../pages/customer.css";

const Profile = () => {
  const { user, login } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name, email };
    login(updatedUser);
    alert("✅ Profile updated successfully!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />

      <main className="profile-container">
        <h2 className="profile-title">👤 My Profile</h2>

        <div className="profile-card">
          {/* Avatar */}
          <div className="profile-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Profile Avatar"
            />
          </div>

          {/* Profile Form */}
          <form onSubmit={handleUpdate} className="profile-form">
            <label>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />

            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

            <button type="submit" className="update-btn">
              💾 Save Changes
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
