// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Customer/Header";
import Footer from "../components/Customer/Footer";
import { getDashboardData } from "../services/api"; // 👈 backend API
import "./Dashboard.css";

// Static fallback destinations
const destinations = [
  {
    name: "Paris, France",
    image: "/france.jpg", // 👈 served from public/
    description: "City of lights and love.",
  },
  {
    name: "Bali, Indonesia",
    image: "/bali.jpg",
    description: "Tropical paradise for your vacation.",
  },
  {
    name: "New York, USA",
    image: "/newyork.jpg",
    description: "The city that never sleeps.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ⚡ Fetch backend dashboard data
  useEffect(() => {
    const userId = localStorage.getItem("userId"); // stored during login
    if (!userId) {
      setLoading(false);
      return;
    }

    getDashboardData(userId)
      .then((res) => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching dashboard:", err);
        setLoading(false);
      });
  }, []);

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to TravelEase</h1>
          <p className="hero-subtitle">
            Plan your trips seamlessly with flights, hotels, and cabs.
          </p>
          <button className="hero-btn" onClick={handleBookNow}>
            Start Booking
          </button>
        </div>
      </section>

      {/* Dashboard Data Section */}
      <section className="dashboard-summary">
        <h2 className="dashboard-title">Your Travel Summary</h2>
        {loading ? (
          <p>Loading dashboard...</p>
        ) : dashboardData ? (
          <div className="dashboard-cards">
            <div className="dashboard-card">
              <h3>Total Bookings</h3>
              <p>{dashboardData.totalBookings}</p>
            </div>
            <div className="dashboard-card">
              <h3>Upcoming Trips</h3>
              <p>{dashboardData.upcomingTrips}</p>
            </div>
            <div className="dashboard-card">
              <h3>Completed Trips</h3>
              <p>{dashboardData.completedTrips}</p>
            </div>
          </div>
        ) : (
          <p>No data available.</p>
        )}
      </section>

      {/* Popular Destinations */}
      <section className="destinations-section">
        <h2 className="destinations-title">Popular Destinations</h2>
        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <div key={index} className="destination-card">
              <img src={dest.image} alt={dest.name} />
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <button onClick={handleBookNow}>Book Now</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Dashboard;
