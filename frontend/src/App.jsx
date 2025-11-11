import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/Mainlayout";

import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import LandlordDashboard from "./pages/LandlordDashboard";
import TenantDashboard from "./pages/TenantDashboard";
import CreateListing from "./pages/CreateListing";
import LandlordOnBoarding from "./pages/LandlordOnBoarding";
import LandlordDetails from "./pages/LandlordDetails";

function App() {
  const userRole = localStorage.getItem("role"); // protecting routes

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes with sidebar layout */}
        <Route element={<MainLayout />}>
          <Route path="/landlord/dashboard" element={<LandlordDashboard />} />
          <Route path="/landlord/create-listing" element={<CreateListing />} />
          <Route path="/landlord/details" element={<LandlordDetails />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetail />} />
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        </Route>

        {/* Landlord onboarding could stay outside layout if you prefer */}
        <Route path="/landlord/onboarding" element={<LandlordOnBoarding />} />
      </Routes>
    </Router>
  );
}

export default App;
