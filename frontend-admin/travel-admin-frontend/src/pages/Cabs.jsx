import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:2001/api/admin/cabs";

export default function Cabs() {
  const [cabs, setCabs] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    cabNumber: "",
    driverName: "",
    capacity: "",
    status: "",
  });

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCabs(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch cabs:", error);
      alert("Failed to load cabs. Check backend API.");
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({ cabNumber: "", driverName: "", capacity: "", status: "" });
    setOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({ ...c });
    setOpen(true);
  };

  const save = async () => {
    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
      };

      if (editing) {
        await axios.put(`${API_BASE}/${editing.id}`, payload);
        alert("✅ Cab updated successfully!");
      } else {
        await axios.post(API_BASE, payload);
        alert("✅ Cab added successfully!");
      }

      setOpen(false);
      setForm({ cabNumber: "", driverName: "", capacity: "", status: "" });
      fetchCabs();
    } catch (error) {
      console.error("❌ Failed to save cab:", error.response?.data || error.message);
      alert("Failed to save cab. Please check backend API.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this cab?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchCabs();
      alert("🗑️ Cab deleted successfully!");
    } catch (error) {
      console.error("❌ Failed to delete cab:", error);
      alert("Failed to delete cab.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 3,
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 2,
          border: "1px solid #ddd",
          p: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        {/* Back Button */}
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button
            component={RouterLink}
            to="/admin/dashboard"
            variant="text"
            sx={{
              color: "primary.main",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            ← BACK TO DASHBOARD
          </Button>
        </Box>

        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, display: "flex", alignItems: "center" }}>
            <Box component="span" sx={{ mr: 1, fontSize: "1.2em" }}>🚖</Box>
            Manage Cabs
          </Typography>
          <Button variant="contained" color="primary" onClick={openAdd}>
            ADD CAB
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Cab Number", "Driver Name", "Capacity", "Status", "Actions"].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "white",
                      fontWeight: 600,
                      textAlign: "center",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cabs.length > 0 ? (
                cabs.map((c) => (
                  <TableRow
                    key={c.id}
                    sx={{
                      "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                      "&:hover": { backgroundColor: "#e8f0fe" },
                    }}
                  >
                    <TableCell>{c.cabNumber}</TableCell>
                    <TableCell>{c.driverName}</TableCell>
                    <TableCell>{c.capacity}</TableCell>
                    <TableCell>{c.status}</TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => openEdit(c)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => remove(c.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
                    <Typography variant="body1" color="textSecondary">
                      No cabs currently listed.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Cab" : "Add Cab"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            label="Cab Number"
            fullWidth
            margin="normal"
            value={form.cabNumber}
            onChange={(e) => setForm({ ...form, cabNumber: e.target.value })}
          />
          <TextField
            label="Driver Name"
            fullWidth
            margin="normal"
            value={form.driverName}
            onChange={(e) => setForm({ ...form, driverName: e.target.value })}
          />
          <TextField
            label="Capacity"
            type="number"
            fullWidth
            margin="normal"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
          />
          <TextField
            label="Status"
            fullWidth
            margin="normal"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
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
