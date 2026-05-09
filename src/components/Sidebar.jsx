// src/components/Sidebar.jsx

import { NavLink } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      <div className="sidebar-header">
        <h2>Naad-Brahma</h2>

        <button onClick={() => setSidebarOpen(false)}>
          ✕
        </button>
      </div>

      <NavLink
        to="/"
        onClick={() => setSidebarOpen(false)}
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/unpaid"
        onClick={() => setSidebarOpen(false)}
      >
        Unpaid
      </NavLink>

      <NavLink
        to="/paid"
        onClick={() => setSidebarOpen(false)}
      >
        Paid
      </NavLink>

      <NavLink
        to="/students"
        onClick={() => setSidebarOpen(false)}
      >
        Students
      </NavLink>

    </div>
  );
}

export default Sidebar;