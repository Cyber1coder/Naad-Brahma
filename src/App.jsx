// src/App.jsx

import { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Unpaid from "./pages/Unpaid";
import Paid from "./pages/Paid";
import Students from "./pages/Students";
import StudentDetails from "./pages/StudentDetails";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "./App.css";

function App() {

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [pin, setPin] =
    useState("");

  // ALWAYS LOCKED INITIALLY

  const [isUnlocked, setIsUnlocked] =
    useState(false);

  // 🔒 PIN

  const correctPin = "5678";

  const handleUnlock = () => {

    if (pin === correctPin) {

      setIsUnlocked(true);

    } else {

      alert("Wrong PIN");

    }
  };

  // LOCK SCREEN

  if (!isUnlocked) {

    return (

      <div className="lock-screen">

        <div className="lock-box">

          <div className="lock-logo">
            🎵 Music Fees Management
          </div>

          <h1 className="marathi-title">
            नादब्रह्म
          </h1>

          <p className="lock-subtitle">
            Secure access for student
            fee management system
          </p>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) =>
              setPin(e.target.value)
            }
          />

          <button onClick={handleUnlock}>
            Unlock Dashboard
          </button>

        </div>

      </div>
    );
  }

  // MAIN APP

  return (

    <BrowserRouter>

      <div className="app-layout">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="main-content">

          <Navbar
            setSidebarOpen={setSidebarOpen}
          />

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/unpaid"
              element={<Unpaid />}
            />

            <Route
              path="/paid"
              element={<Paid />}
            />

            <Route
              path="/students"
              element={<Students />}
            />

            <Route
              path="/student/:id"
              element={<StudentDetails />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;