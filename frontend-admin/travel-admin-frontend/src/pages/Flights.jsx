import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function Flights() {
  const [flights, setFlights] = useState([]);
  const [open, setOpen] = useState(false);
  const [newFlight, setNewFlight] = useState({
    airline: "",
    flightNumber: "",
    source: "",
    destination: "",
    price: "",
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  // Fetch all flights
  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:2001/api/admin/flights");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  // Add Flight
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:2001/api/admin/flights", newFlight);

      fetchFlights();

      setNewFlight({
        airline: "",
        flightNumber: "",
        source: "",
        destination: "",
        price: "",
      });

      setOpen(false);
      console.log("Flight saved:", response.data);
    } catch (error) {
      console.error("Error adding flight:", error);
      alert("❌ Failed to save flight. Please check backend connection.");
    }
  };

  // Edit placeholder
  const handleEdit = (id) => {
    alert(`Edit flight ${id}`);
  };

  // Delete Flight
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2001/api/admin/flights/${id}`);
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  // Form change handler
  const handleChange = (e) => {
    setNewFlight({ ...newFlight, [e.target.name]: e.target.value });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewFlight({
      airline: "",
      flightNumber: "",
      source: "",
      destination: "",
      price: "",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        minHeight: "100vh",
        p: 3,
        bgcolor: "#f4f6f8",
      }}
    >
      {/* Back to Dashboard Link */}
      <Box sx={{ mb: 2, textAlign: "right" }}>
        <Link
          href="/admin/dashboard"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            fontWeight: 500,
            fontSize: "0.9rem",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          ← BACK TO DASHBOARD
        </Link>
      </Box>

      {/* Main Fullscreen Flights Management */}
      <Paper
        elevation={1}
        sx={{
          width: "100%",
          flex: 1,
          p: 3,
          border: "1px solid #ddd",
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
            ✈️ Manage Flights
          </Typography>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            ADD FLIGHT
          </Button>
        </Box>

        {/* Table */}
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  Airline
                </TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  Flight No
                </TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  From
                </TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  To
                </TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  Price
                </TableCell>
                <TableCell sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {flights.map((flight) => (
                <TableRow key={flight.id}>
                  <TableCell>{flight.airline}</TableCell>
                  <TableCell>{flight.flightNumber}</TableCell>
                  <TableCell>{flight.source}</TableCell>
                  <TableCell>{flight.destination}</TableCell>
                  <TableCell>₹{flight.price}</TableCell>
                  <TableCell>
                    <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEdit(flight.id)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(flight.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {flights.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No flights found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add Flight Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Flight</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Airline"
            name="airline"
            fullWidth
            variant="outlined"
            value={newFlight.airline}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Flight Number"
            name="flightNumber"
            fullWidth
            variant="outlined"
            value={newFlight.flightNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="From"
            name="source"
            fullWidth
            variant="outlined"
            value={newFlight.source}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="To"
            name="destination"
            fullWidth
            variant="outlined"
            value={newFlight.destination}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            fullWidth
            variant="outlined"
            value={newFlight.price}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
