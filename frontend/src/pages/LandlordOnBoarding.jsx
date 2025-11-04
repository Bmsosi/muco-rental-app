import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./onboarding.css";

export default function LandlordOnboarding() {
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    internationalNumber: "",
    accountNumber: "",
    routingNumber: "",
    swiftBic: "",
    phoneNumber: "",
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  });

  const [activeMenu, setActiveMenu] = useState("general"); // sidebar menu state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(
        `http://localhost:5000/api/landlord/onboarding/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        // Mark onboarding complete
        await fetch(
          `http://localhost:5000/api/users/${userId}/complete-onboarding`,
          { method: "PATCH" }
        );

        alert("Onboarding complete!");
        navigate("/landlord/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save info.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  return (
    <div className="onboarding-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Landlord Menu</h2>
        <ul>
          <li
            className={activeMenu === "general" ? "active" : ""}
            onClick={() => setActiveMenu("general")}
          >
            General Info
          </li>
          <li
            className={activeMenu === "banking" ? "active" : ""}
            onClick={() => setActiveMenu("banking")}
          >
            Banking Details
          </li>
          <li
            className={activeMenu === "contact" ? "active" : ""}
            onClick={() => setActiveMenu("contact")}
          >
            Contact Info
          </li>
          <li
            >
                <a href="#LandlordDashboard.jsx">Go to Dashboard</a>
          </li>
        </ul>
      </div>

      {/* Main Form */}
      <div className="onboarding-main">
        <h1>Complete Your Landlord Profile</h1>
        <form onSubmit={handleSubmit}>
          {activeMenu === "general" && (
            <>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </>
          )}

          {activeMenu === "banking" && (
            <>
              <input
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                required
              />
              <input
                name="accountName"
                placeholder="Account name"
                value={formData.accountName}
                onChange={handleChange}
                required
              />
              <input
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />
              <input
                name="internationalNumber"
                placeholder="International bank account number (IBAN)"
                value={formData.internationalNumber}
                onChange={handleChange}
                required
              />
              <input
                name="swiftBic"
                placeholder="SWIFT, BIC or Routing Number"
                value={formData.swiftBic}
                onChange={handleChange}
                required
              />
              <input
                name="routingNumber"
                placeholder="Routing Number"
                value={formData.routingNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          {activeMenu === "contact" && (
            <>
              <input
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
              <input
                name="mobilePhone"
                placeholder="Mobile Phone"
                value={formData.mobilePhone || ""}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Save & Continue</button>
        </form>
      </div>
    </div>
  );
}
