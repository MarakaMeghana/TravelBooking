import React, { useState } from "react";
import Header from "../components/Customer/Header";   // ✅ Navbar
import Footer from "../components/Customer/Footer";   // ✅ Footer
import "./Booking.css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    date: "",
    travelers: "",
    notes: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.destination || !formData.date || !formData.travelers) {
      alert("Please fill in all required fields!");
      return;
    }

    setBookings((prev) => [...prev, formData]);
    setFormData({
      destination: "",
      date: "",
      travelers: "",
      notes: "",
    });
  };

  // Delete booking
  const handleDelete = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
  };

  return (
    <>
      <Header />  {/* ✅ Navbar at the top */}

      <div className="booking-container">
        <h2 className="booking-title">Plan Your Journey ✈️</h2>

        {/* Booking Form */}
        <div className="booking-form-card">
          <form onSubmit={handleSubmit} className="booking-form">
            <label>Destination *</label>
            <input
              type="text"
              name="destination"
              placeholder="e.g., Paris, Goa"
              value={formData.destination}
              onChange={handleChange}
            />

            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <label>No. of Travelers *</label>
            <input
              type="number"
              name="travelers"
              placeholder="e.g., 2"
              value={formData.travelers}
              onChange={handleChange}
            />

            <label>Special Notes</label>
            <textarea
              name="notes"
              placeholder="Any special requests..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>

            <button type="submit">Add Booking</button>
          </form>
        </div>

        {/* Booking List */}
        <h3 className="list-title">Your Bookings</h3>
        {bookings.length === 0 ? (
          <p className="empty-msg">
            No bookings yet. Start planning your dream trip! 🌍
          </p>
        ) : (
          <div className="booking-list">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <h4>📍 {booking.destination}</h4>
                <p>📅 Date: {booking.date}</p>
                <p>👥 Travelers: {booking.travelers}</p>
                {booking.notes && <p>📝 Notes: {booking.notes}</p>}
                <button onClick={() => handleDelete(index)}>Cancel</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />  {/* ✅ Footer at the bottom */}
    </>
  );
}

export default Booking;
