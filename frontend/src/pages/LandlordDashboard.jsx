import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function LandlordDashboard() {
  const [properties, setProperties] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/landlord/${userId}`
      );
      const data = await res.json();
      setProperties(data.properties || []);
    };
    fetchData();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏠 Landlord Dashboard</h1>
        <p>Welcome back! Manage your listings and track your properties.</p>
      </header>

      <section className="dashboard-content">
        {properties.length === 0 ? (
          <p className="empty-state">You don’t have any properties yet.</p>
        ) : (
          <div className="property-grid">
            {properties.map((p) => (
              <div className="property-card" key={p.id}>
                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/300x200?text=Property"
                  }
                  alt={p.title}
                  className="property-image"
                />
                <div className="property-details">
                  <h3>{p.title}</h3>
                  <p className="location">{p.location}</p>
                  <p className="price">${p.price}</p>
                  <div className="card-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
