import { useState } from "react";
import Header from "../components/Customer/Header";
import Footer from "../components/Customer/Footer";
import "./Booking.css";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    destination: "",
    date: "",
    travelers: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings([...bookings, { ...form, id: Date.now() }]);
    setForm({ destination: "", date: "", travelers: "", notes: "" });
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter((b) => b.id !== id));
  };

  return (
    <>
      <Header />
      <div className="booking-container">
        {/* Title */}
        <h2 className="booking-title">Plan Your Trip</h2>

        {/* Booking Form */}
        <div className="booking-form-card">
          <form onSubmit={handleSubmit} className="booking-form">
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Enter destination (e.g., Paris, Goa)"
              required
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
            />

            <label>No. of Travelers</label>
            <input
              type="number"
              name="travelers"
              value={form.travelers}
              onChange={handleChange}
              placeholder="e.g., 2"
              required
            />

            <label>Special Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any special requests..."
            />

            <button type="submit">Add Booking</button>
          </form>
        </div>

        {/* Bookings List */}
        <h3 className="list-title">Your Bookings</h3>
        <div className="booking-list">
          {bookings.length === 0 ? (
            <p className="empty-msg">No bookings yet. Start planning your trip!</p>
          ) : (
            bookings.map((b) => (
              <div key={b.id} className="booking-card">
                <h4>{b.destination}</h4>
                <p>
                  <strong>Date:</strong> {b.date}
                </p>
                <p>
                  <strong>Travelers:</strong> {b.travelers}
                </p>
                {b.notes && (
                  <p>
                    <strong>Notes:</strong> {b.notes}
                  </p>
                )}
                <button onClick={() => handleDelete(b.id)}>Cancel</button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;