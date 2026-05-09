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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-layout">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="main-content">

          <Navbar setSidebarOpen={setSidebarOpen} />

          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/unpaid" element={<Unpaid />} />

            <Route path="/paid" element={<Paid />} />

            <Route path="/students" element={<Students />} />

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