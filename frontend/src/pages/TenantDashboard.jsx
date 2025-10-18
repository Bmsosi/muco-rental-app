import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function TenantDashboard() {
  const [properties, setProperties] = useState([]);
  const [mainImages, setMainImages] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard/tenant");
      const data = await res.json();

      setProperties(data.properties || []);

      // Initialize main images
      const initialMainImages = {};
      (data.properties || []).forEach((p) => {
        initialMainImages[p.id] =
          p.images && p.images.length > 0
            ? `http://localhost:5000${p.images[0]}`
            : "https://via.placeholder.com/400x250?text=Property";
      });
      setMainImages(initialMainImages);
    };
    fetchProperties();
  }, []);

  const handleThumbnailClick = (propertyId, imgUrl) => {
    setMainImages((prev) => ({
      ...prev,
      [propertyId]: `http://localhost:5000${imgUrl}`,
    }));
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏘️ Tenant Dashboard</h1>
        <p>Browse available properties and contact landlords.</p>
      </header>

      <section className="dashboard-content">
        {properties.length === 0 ? (
          <p className="empty-state">No properties are currently available.</p>
        ) : (
          <div className="property-grid">
            {properties.map((p) => (
              <div className="property-card" key={p.id}>
                <div className="property-image-section">
                  <img
                    src={mainImages[p.id]}
                    alt={p.title}
                    className="property-main-image"
                  />

                  {p.images && p.images.length > 1 && (
                    <div className="property-thumbnails">
                      {p.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={`http://localhost:5000${img}`}
                          alt={`${p.title} - ${idx + 1}`}
                          className="property-thumbnail"
                          onClick={() => handleThumbnailClick(p.id, img)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="property-details">
                  <h3>{p.title}</h3>
                  <p className="location">{p.location}</p>
                  <p className="price">${p.price}</p>
                  <p className="description">{p.description}</p>
                  <p>
                    Available:{" "}
                    {p.available
                      ? "Yes"
                      : p.availableFrom
                      ? new Date(p.availableFrom).toLocaleDateString()
                      : "No"}
                  </p>
                  <button className="contact-btn">Request to Rent</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
