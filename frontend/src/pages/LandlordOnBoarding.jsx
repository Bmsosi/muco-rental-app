import { useEffect, useState } from "react";
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
    // removed address string here; address now separate
  });

  const [address, setAddress] = useState({
    street: "",
    number: "",
    country: "",
    state: "",
    city: "",
    postalCode: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [activeMenu, setActiveMenu] = useState("general");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch list of countries (names)
    // using countriesnow.space endpoints — if any endpoint shape differs, adapt map
    fetch("https://countriesnow.space/api/v0.1/countries/iso")
      .then((r) => r.json())
      .then((res) => {
        const list = (res?.data || []).map((c) => c.name || c.country);
        setCountries(list.sort());
      })
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setAddress((prev) => ({ ...prev, country, state: "", city: "" }));
    setStates([]);
    setCities([]);

    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        }
      );
      const json = await res.json();
      const list = (json?.data?.states || []).map((s) => s.name || s);
      setStates(list);
    } catch (err) {
      console.error("Failed to fetch states:", err);
    }
  };

  const handleStateChange = async (e) => {
    const state = e.target.value;
    setAddress((prev) => ({ ...prev, state, city: "" }));
    setCities([]);

    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: address.country, state }),
        }
      );
      const json = await res.json();
      const list = json?.data || [];
      setCities(list);
    } catch (err) {
      console.error("Failed to fetch cities:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    // combine main form and address
    const payload = {
      ...formData,
      address,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/landlord/onboarding/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        // mark onboarding complete
        await fetch(
          `http://localhost:5000/api/users/${userId}/complete-onboarding`,
          {
            method: "PATCH",
          }
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
      <div className="sidebar">
        <h2>Landlord Info</h2>
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
          <li>
            <a href="#LandlordDashboard.jsx">Go to Dashboard</a>
          </li>
        </ul>
      </div>

      <div className="onboarding-main">
        <h1>Complete Your Profile</h1>
        <form className="onboardform" onSubmit={handleSubmit}>
          {activeMenu === "general" && (
            <>
              <label>First Name</label>
              <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName || ""}
                onChange={handleChange}
                required
              />

              <label>Last Name</label>
              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName || ""}
                onChange={handleChange}
                required
              />

              <label>Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                required
              />

              <label>Street</label>
              <input
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
              />

              <label>Number</label>
              <input
                name="number"
                placeholder="Number"
                value={address.number}
                onChange={(e) =>
                  setAddress({ ...address, number: e.target.value })
                }
                required
              />

              <label>Country</label>
              <select
                name="country"
                value={address.country}
                onChange={handleCountryChange}
                required
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <label>State / Province</label>
              <select
                name="state"
                value={address.state}
                onChange={handleStateChange}
                disabled={!states.length}
              >
                <option value="">
                  {states.length ? "Select State/Province" : "N/A"}
                </option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <label>City</label>
              <select
                name="city"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
                disabled={!cities.length}
              >
                <option value="">
                  {cities.length ? "Select City" : "N/A"}
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <label>Postal Code</label>
              <input
                name="postalCode"
                placeholder="Postal Code"
                value={address.postalCode}
                onChange={(e) =>
                  setAddress({ ...address, postalCode: e.target.value })
                }
              />
            </>
          )}

          {activeMenu === "banking" && (
            <>
              <label>Bank Name</label>
              <input
                name="bankName"
                placeholder="Bank Name"
                value={formData.bankName}
                onChange={handleChange}
                required
              />

              <label>Account name</label>
              <input
                name="accountName"
                placeholder="Account name"
                value={formData.accountName}
                onChange={handleChange}
                required
              />

              <label>Account Number</label>
              <input
                name="accountNumber"
                placeholder="Account Number"
                value={formData.accountNumber}
                onChange={handleChange}
                required
              />

              <label>IBAN</label>
              <input
                name="internationalNumber"
                placeholder="International bank account number (IBAN)"
                value={formData.internationalNumber}
                onChange={handleChange}
                required
              />

              <label>SWIFT / BIC</label>
              <input
                name="swiftBic"
                placeholder="SWIFT, BIC or Routing Number"
                value={formData.swiftBic}
                onChange={handleChange}
                required
              />

              <label>Routing Number</label>
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
              <label>Email</label>
              <input
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
              <label>Mobile Phone</label>
              <input
                name="mobilePhone"
                placeholder="Mobile Phone"
                value={formData.mobilePhone || ""}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button className="submit-button" type="submit">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
