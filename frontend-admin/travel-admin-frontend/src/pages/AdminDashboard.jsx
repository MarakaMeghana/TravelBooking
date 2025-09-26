// src/pages/AdminDashboard.jsx
import { Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor="#eef2f7"
      px={2}
    >
      <Card
        elevation={6}
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          background: "white",
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
            Travel Admin Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            Welcome, Admin! Manage and monitor all travel services from one place.
          </Typography>

          <Typography variant="h6" color="text.primary" gutterBottom>
            Manage Services
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center" mb={3}>
            <Button
              component={Link}
              to="/admin/flights"
              variant="outlined"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Manage Flights
            </Button>
            <Button
              component={Link}
              to="/admin/hotels"
              variant="outlined"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Manage Hotels
            </Button>
            <Button
              component={Link}
              to="/admin/cabs"
              variant="outlined"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Manage Cabs
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
