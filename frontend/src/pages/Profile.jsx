import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/api"; // 👈 API methods
import Header from "../components/Customer/Header"; // ✅ Import Header
import "./profile.css"; // 👈 add styles

const Profile = () => {
  const userId = localStorage.getItem("userId"); // ✅ Get logged-in userId
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch profile data when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile(userId);
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        setMessage("❌ Error loading profile");
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  // ✅ Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(userId, {
        name,
        password, // 👈 Only update name & password
      });

      setMessage("✅ Profile updated successfully!");
      setPassword(""); // clear password field
      localStorage.setItem("userName", name); // update localStorage
    } catch (err) {
      setMessage("❌ Update failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <>
      {/* ✅ Header on top */}
      <Header />

      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">My Profile</h2>

          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email (cannot change)</label>
              <input type="email" value={email} disabled />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="profile-btn">
              Update Profile
            </button>
          </form>

          {message && <p className="profile-message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default Profile;
