import { useEffect, useState } from "react";
import "./Dashboard.css";

export default function TenantDashboard() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    location: "",
    availableOnly: false,
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mainImages, setMainImages] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard/tenant");
      const data = await res.json();
      setProperties(data.properties || []);
      setFilteredProperties(data.properties || []);

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

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    let filtered = [...properties];
    if (filters.minPrice)
      filtered = filtered.filter(
        (p) => p.price >= parseFloat(filters.minPrice)
      );
    if (filters.maxPrice)
      filtered = filtered.filter(
        (p) => p.price <= parseFloat(filters.maxPrice)
      );
    if (filters.location)
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    if (filters.availableOnly) filtered = filtered.filter((p) => p.available);
    setFilteredProperties(filtered);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;
    const res = await fetch("http://localhost:5000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        propertyId: selectedProperty.id,
        message,
      }),
    });
    if (res.ok) {
      alert("Message sent to landlord!");
      form.reset();
    } else {
      alert("Failed to send message.");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🏘️ Tenant Dashboard</h1>
        <p>Browse available properties and contact landlords.</p>
      </header>

      {/* Filters */}
      <section className="filters">
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <label>
          <input
            type="checkbox"
            name="availableOnly"
            checked={filters.availableOnly}
            onChange={handleFilterChange}
          />
          Available Only
        </label>
        <button onClick={applyFilters}>Apply Filters</button>
      </section>

      {/* Properties Grid */}
      <section className="dashboard-content">
        {filteredProperties.length === 0 ? (
          <p className="empty-state">No properties match your filters.</p>
        ) : (
          <div className="property-grid">
            {filteredProperties.map((p) => (
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
                  <button
                    className="contact-btn"
                    onClick={() => setSelectedProperty(p)}
                  >
                    Contact Landlord
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for Contact */}
      {selectedProperty && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProperty(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Contact Landlord - {selectedProperty.title}</h2>
            <form onSubmit={handleContactSubmit}>
              <textarea
                name="message"
                rows={4}
                placeholder="Your message"
                required
              />
              <button type="submit">Send Message</button>
            </form>
            <button onClick={() => setSelectedProperty(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
