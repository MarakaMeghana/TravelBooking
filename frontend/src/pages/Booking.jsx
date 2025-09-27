import React, { useState, useEffect } from "react";
import Header from "../components/Customer/Header";
import Footer from "../components/Customer/Footer";
import {
  createBooking,
  getBookingsByUser,
  deleteBooking,
} from "../services/api";
import "./Booking.css";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    numOfPeople: "",
  });

  const [editingId, setEditingId] = useState(null); // ✅ Track editing booking
  const [search, setSearch] = useState(""); // ✅ Search filter

  // Load bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      const res = await getBookingsByUser(userId);
      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Create or Update booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("Please login first!");
        return;
      }

      const newBooking = {
        ...formData,
        userId: parseInt(userId, 10),
      };

      if (editingId) {
        // ✅ Update existing booking
        await deleteBooking(editingId); // just delete old one (simple way)
        await createBooking(newBooking);
        setEditingId(null);
      } else {
        // ✅ Create new booking
        await createBooking(newBooking);
      }

      fetchBookings(); // reload after saving
      setFormData({ destination: "", startDate: "", endDate: "", numOfPeople: "" });
    } catch (err) {
      console.error("Error creating/updating booking:", err);
    }
  };

  // ✅ Load booking into form for editing
  const handleEdit = (booking) => {
    setFormData({
      destination: booking.destination,
      startDate: booking.startDate,
      endDate: booking.endDate,
      numOfPeople: booking.numOfPeople,
    });
    setEditingId(booking.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      fetchBookings(); // refresh list
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  // ✅ Filter bookings
  const filteredBookings = bookings.filter((b) =>
    b.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="booking-container">
        <h2 className="booking-title">Plan Your Journey ✈️</h2>

        {/* ✅ Search Box */}
        <input
          type="text"
          placeholder="Search by destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />

        <div className="booking-form-card">
          <form onSubmit={handleSubmit} className="booking-form">
            <label>Destination *</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />

            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />

            <label>No. of People *</label>
            <input
              type="number"
              name="numOfPeople"
              value={formData.numOfPeople}
              onChange={handleChange}
              required
            />

            <button type="submit">
              {editingId ? "Update Booking" : "Add Booking"}
            </button>
          </form>
        </div>

        <h3 className="list-title">Your Bookings</h3>
        {filteredBookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <div className="booking-list">
            {filteredBookings.map((b) => (
              <div key={b.id} className="booking-card">
                <h4>📍 {b.destination}</h4>
                <p>📅 {b.startDate} → {b.endDate}</p>
                <p>👥 {b.numOfPeople}</p>
                <div className="booking-actions">
                  <button onClick={() => handleEdit(b)}>✏️ Edit</button>
                  <button onClick={() => handleDelete(b.id)}>❌ Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Booking;
