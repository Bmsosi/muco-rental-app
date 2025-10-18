import { useEffect, useState } from "react";

export default function LandlordDashboard() {
  const [properties, setProperties] = useState([]);
  const userId = localStorage.getItem("userId");
 // This will get info from the logged-in user.

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `http://localhost:5000/api/dashboard/landlord/${userId}`
      );
      const data = await res.json();
      setProperties(data.properties || []);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Landlord Dashboard</h2>
      <p>Here are your properties:</p>
      <ul>
        {properties.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> - ${p.price} in {p.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
