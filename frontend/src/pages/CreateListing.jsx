import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    price: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const landlordId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      data.append("landlordId", landlordId);
      images.forEach((file) => data.append("images", file));

      const res = await fetch("http://localhost:5000/api/properties", {
        method: "POST",
        body: data, // FormData, no JSON here
      });

      const result = await res.json();
      if (res.ok) {
        alert("Listing created successfully!");
        navigate("/landlord/dashboard");
      } else {
        alert(result.error || "Error creating listing");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Create New Listing</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
        <input
          name="type"
          placeholder="Property Type (apartment, condo, room...)"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Monthly Rent (e.g., 1500)"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="City or Area"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          style={{
            padding: "0.8rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Create Listing
        </button>
      </form>
    </div>
  );
}
