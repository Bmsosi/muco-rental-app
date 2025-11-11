import { useEffect, useState } from "react";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from your backend
    fetch("http://localhost:5000/api/properties") // adjust port or URL if needed
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching properties:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading properties...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold">{property.name}</h2>
            <p>{property.address}</p>
            <p>${property.price}/month</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Properties;
