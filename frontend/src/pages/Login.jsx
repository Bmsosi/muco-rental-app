import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => null); // avoid crash if non-JSON
    console.log("Logged in user:", data);

    if (res.ok) {
      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.user.id);

      // Redirect based on role and onboarding status
      if (data.role === "LANDLORD") {
        if (!data.onboarded) {
          navigate("/landlord/onboarding");
        } else {
          navigate("/landlord/dashboard");
        }
      } else {
        navigate("/tenant/dashboard");
      }
    } else {
      alert(data.error || "Login failed");
    }
  } catch (err) {
    console.error("Error logging in:", err);
  }
};


  return (
    <div className={styles.container}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
