// src/pages/Dashboard.jsx
import Header from "../components/Customer/Header";
import Footer from "../components/Customer/Footer";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import ParisImg from "../assets/france.jpg";
import BaliImg from "../assets/bali.jpg";
import NewYorkImg from "../assets/newyork.jpg";

// Destinations array
const destinations = [
  {
    name: "Paris, France",
    image: ParisImg,
    description: "City of lights and love.",
  },
  {
    name: "Bali, Indonesia",
    image: BaliImg,
    description: "Tropical paradise for your vacation.",
  },
  {
    name: "New York, USA",
    image: NewYorkImg,
    description: "The city that never sleeps.",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate("/booking");
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Travel Booking Platform</h1>
          <p className="hero-subtitle">
            Plan your trips seamlessly with flights, hotels, and cabs.
          </p>
          <button className="hero-btn" onClick={handleBookNow}>
            Start Booking
          </button>
        </div>
      </section>

      {/* Popular Destinations Section */}
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

      <Footer />
    </>
  );
};

export default Dashboard;