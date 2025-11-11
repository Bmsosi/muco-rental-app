import { Outlet, Link, useNavigate } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // clear user session
    navigate("/login"); // redirect to login
  };

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Dashboard Menu</h2>

        {/* Top menu items */}
        <ul className="menu-top">
          <li>
            <Link to="/landlord/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/landlord/create-listing">Create Listing</Link>
          </li>
          <li>
            <Link to="/landlord/details">Profile Details</Link>
          </li>
          <li>
            <Link to="/properties">Properties</Link>
          </li>
          {/* Add more top menu items here */}
        </ul>

        {/* Bottom menu items */}
        <ul className="menu-bottom">
          <li>
            <Link to="/help">Help</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Log Out
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet /> {/* Nested page components render here */}
      </main>
    </div>
  );
}
