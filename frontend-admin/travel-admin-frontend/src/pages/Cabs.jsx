// src/pages/Cabs.jsx

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
  TableContainer,
  Paper,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/admin/cabs";

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
      console.error("Failed to fetch cabs:", error);
    }
  };

  const openAdd = () => {
    setEditing(null);
    setForm({
      cabNumber: "",
      driverName: "",
      capacity: "",
      status: "",
    });
    setOpen(true);
  };

  const openEdit = (c) => {
    setEditing(c);
    setForm({ ...c });
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
      fetchCabs();
    } catch (error) {
      console.error("Failed to save cab:", error);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this cab?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchCabs();
    } catch (error) {
      console.error("Failed to delete cab:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      {/* Back to Dashboard */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1100,
          mb: 2,
          textAlign: "right",
        }}
      >
        <Button
          component={RouterLink}
          to="/admin/dashboard"
          variant="text"
          sx={{
            color: "primary.main",
            fontWeight: 500,
            fontSize: "0.9rem",
            textTransform: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          ← BACK TO DASHBOARD
        </Button>
      </Box>

      {/* Main Cabs Management Card */}
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          maxWidth: 1100,
          border: "1px solid #ddd",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
              color: "#333",
            }}
          >
            <Box component="span" sx={{ mr: 1, fontSize: "1.2em" }}>
              🚖
            </Box>
            Manage Cabs
          </Typography>
          <Button variant="contained" color="primary" onClick={openAdd}>
            ADD CAB
          </Button>
        </Box>

        {/* Cabs Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Cab Number", "Driver Name", "Capacity", "Status", "Actions"].map(
                  (header) => (
                    <TableCell
                      key={header}
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {header}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {cabs.map((c) => (
                <TableRow
                  key={c.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" },
                    "&:hover": { backgroundColor: "#f0f0f0" },
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
                      color="error"
                      variant="contained"
                      onClick={() => remove(c.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {cabs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 5 }}>
                    No cabs currently listed.
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
