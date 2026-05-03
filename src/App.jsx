import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Unpaid from "./pages/Unpaid";
import Paid from "./pages/Paid";
import AddStudent from "./pages/AddStudent";
import "./App.css";

function App() {
  const correctPin = "5678"; 
  const [pin, setPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    localStorage.getItem("unlocked") === "true"
  );


  const handleUnlock = () => {
    if (pin === correctPin) {
      setIsUnlocked(true);
      localStorage.setItem("unlocked", "true");
    } else {
      alert("Wrong PIN");
    }
  };

  // 🔒 LOCK SCREEN
  if (!isUnlocked) {
    return (
      <div className="lock-screen">
        <div className="lock-box">
          <h2>🔒 Enter PIN</h2>

          <input
            type="password"
            placeholder="Enter PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />

          <button onClick={handleUnlock}>Unlock</button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="container">

        <h1 className="title">🎵 Naad-Brahma</h1>
        <p className="subtitle">Music Classes Management</p>

        <div className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            Unpaid
          </NavLink>
          <NavLink to="/paid" className={({ isActive }) => isActive ? "active" : ""}>
            Paid
          </NavLink>
          <NavLink to="/add" className={({ isActive }) => isActive ? "active" : ""}>
            Add
          </NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Unpaid />} />
          <Route path="/paid" element={<Paid />} />
          <Route path="/add" element={<AddStudent />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;