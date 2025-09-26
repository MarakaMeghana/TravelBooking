import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Flights from "./pages/Flights";
import ManageHotels from "./pages/ManageHotels"; 
import Cabs from "./pages/Cabs";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Admin Routes (Protected) */}
          <Route
            path="/admin"
            element={<PrivateRoute role="ADMIN"><AdminDashboard /></PrivateRoute>}
          />
          <Route
            path="/admin/flights"
            element={<PrivateRoute role="ADMIN"><Flights /></PrivateRoute>}
          />
          <Route
            path="/admin/hotels"
            element={<PrivateRoute role="ADMIN"><ManageHotels /></PrivateRoute>}
          />
          <Route
            path="/admin/cabs"
            element={<PrivateRoute role="ADMIN"><Cabs /></PrivateRoute>}
          />
           
          {/* Public Booking Routes */}
          <Route path="/book/flights" element={<Flights />} />
          <Route path="/book/cabs" element={<Cabs />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
