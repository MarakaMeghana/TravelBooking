import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ManageHotels.css";   // ✅ Import CSS

const API_BASE = "http://localhost:8080/api/admin/hotels";

export default function ManageHotels() {
  const [hotels, setHotels] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    pricePerNight: 0,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(API_BASE);
      setHotels(res.data);
    } catch (err) {
      console.error("Error fetching hotels:", err);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ name: "", city: "", address: "", pricePerNight: 0 });
    setOpen(true);
  };

  const openEdit = (hotel) => {
    setEditing(hotel);
    setForm({ ...hotel });
    setOpen(true);
  };

  const save = async () => {
    try {
      if (editing) {
        await axios.put(`${API_BASE}/${editing.id}`, form);
      } else {
        await axios.post(API_BASE, form);
      }
      setOpen(false);
      fetchHotels();
    } catch (err) {
      console.error("Error saving hotel:", err);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this hotel?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchHotels();
    } catch (err) {
      console.error("Error deleting hotel:", err);
    }
  };

  return (
    <Box className="manage-hotels-container">
      {/* Back to Dashboard */}
      <Button
        component={Link}
        to="/"
        variant="outlined"
        className="back-btn"
      >
        ← Back to Dashboard
      </Button>

      {/* Header */}
      <Box className="manage-hotels-header">
        <Typography className="manage-hotels-title">
          🏨 Manage Hotels
        </Typography>
        <Button variant="contained" onClick={openAdd}>
          Add Hotel
        </Button>
      </Box>

      {/* Hotels Table */}
      <Table className="hotels-table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Price / Night</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((h) => (
            <TableRow key={h.id}>
              <TableCell>{h.name}</TableCell>
              <TableCell>{h.city}</TableCell>
              <TableCell>{h.address}</TableCell>
              <TableCell>${h.pricePerNight}</TableCell>
              <TableCell>
                <Button
                  size="small"
                  onClick={() => openEdit(h)}
                  className="action-btn"
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => remove(h.id)}
                  className="action-btn"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth className="hotel-dialog">
        <DialogTitle>{editing ? "Edit Hotel" : "Add Hotel"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Hotel Name"
            fullWidth
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <TextField
            label="Price per Night"
            type="number"
            fullWidth
            margin="normal"
            value={form.pricePerNight}
            onChange={(e) =>
              setForm({
                ...form,
                pricePerNight: parseFloat(e.target.value) || 0,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
