import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";

import img1 from "../assets/images/property1.jpg";
import img2 from "../assets/images/property2.jpg";
import img3 from "../assets/images/property3.jpg";

const images = [img1, img2, img3];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

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
        <div className={styles.landlordTenant}>
          <p className={styles.landlord}>Get ready to manage your listings as a Landlord</p>
          <p className={styles.tenant}>
            Find your perfect home today as a Tenant
          </p>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.buttonBlock}>
            <p className={styles.subtitle}>Are you new?</p>
            <button
              className={styles.button}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
          <div className={styles.buttonBlock}>
            <p className={styles.subtitle}>Already have an account?</p>
            <button
              className={styles.button}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
