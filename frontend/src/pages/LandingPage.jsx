import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

// Import all images
import img1 from "../assets/images/property1.jpg";
import img2 from "../assets/images/property2.jpg";
import img3 from "../assets/images/property3.jpg";

const images = [img1, img2, img3];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Muco Rental App</h1>
        <p className={styles.subtitle}>Are you a landlord or a tenant?</p>
        <div className={styles.buttonGroup}>
          <Link to="/register" className={styles.button}>
            Landlord / Tenant Sign Up
          </Link>
          <Link to="/login" className={styles.button}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
