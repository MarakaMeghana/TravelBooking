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
    login(updatedUser); // update context/localStorage
    alert("Profile updated successfully!");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main className="customer-container">
        <div className="customer-card">
          <h2>Your Profile</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;