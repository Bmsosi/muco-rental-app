import { useEffect, useState } from "react";

export default function TenantDashboard() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/api/dashboard/tenant");
      const data = await res.json();
      setProperties(data.properties || []);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tenant Dashboard</h2>
      <p>Available properties:</p>
      <ul>
        {properties.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> - ${p.price} in {p.location} <br />
            <small>
              Landlord: {p.landlord?.firstName} {p.landlord?.lastName}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
