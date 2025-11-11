import { useEffect, useState } from "react";

export default function LandlordDetails() {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <p>
        <strong>Bank:</strong> {user.bankName}
      </p>
      <p>
        <strong>Account:</strong> {user.accountNumber}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* display more fields as needed */}
    </div>
  );
}
