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
} from "@mui/material";
import axios from "axios";

export default function Flights() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/flights");
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const openAdd = () => {
    // TODO: implement add flight modal
    alert("Add Flight clicked");
  };

  const handleEdit = (id) => {
    // TODO: implement edit flight modal
    alert(`Edit flight ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/flights/${id}`);
      fetchFlights();
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw", // Full screen width
        minHeight: "100vh", // Full screen height
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
          <Button variant="contained" color="primary" onClick={openAdd}>
            ADD FLIGHT
          </Button>
        </Box>

        {/* Table */}
        <TableContainer sx={{ width: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  Airline
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  Flight No
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  From
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  To
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  Depart
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#1976d2", color: "white", fontWeight: 600 }}
                >
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
                  <TableCell>{flight.departureTime}</TableCell>
                  <TableCell>₹{flight.price}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(flight.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(flight.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {flights.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No flights found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
