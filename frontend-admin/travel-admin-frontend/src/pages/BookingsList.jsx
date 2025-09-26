// src/pages/BookingsList.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Chip } from "@mui/material";
import axios from "axios";

const API_BASE = "http://localhost:8080/api/admin/bookings";

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { fetch(); }, []);

  const fetch = async () => {
    const res = await axios.get(API_BASE);
    setBookings(res.data);
  };

  const approve = async (id) => {
    await axios.put(`${API_BASE}/${id}/approve`);
    fetch();
  };

  const cancel = async (id) => {
    await axios.put(`${API_BASE}/${id}/cancel`);
    fetch();
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>All Bookings</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Reference</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Dates</TableCell>
            <TableCell>Passengers</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.type}</TableCell>
              <TableCell>{b.referenceId}</TableCell>
              <TableCell>{b.user}</TableCell>
              <TableCell>{b.startDate || "-"} {b.endDate ? `→ ${b.endDate}` : ""}</TableCell>
              <TableCell>{b.passengers}</TableCell>
              <TableCell>
                <Chip label={b.status} color={b.status === "APPROVED" ? "success" : b.status === "CANCELLED" ? "error" : "default"} />
              </TableCell>
              <TableCell>
                <Button size="small" disabled={b.status === "APPROVED"} onClick={() => approve(b.id)}>Approve</Button>
                <Button size="small" color="error" onClick={() => cancel(b.id)}>Cancel</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
