// src/components/Navbar.jsx

function Navbar({ setSidebarOpen }) {
  return (
    <div className="navbar">

      <button
        className="hamburger"
        onClick={() => setSidebarOpen(true)}
      >
        ☰
      </button>

      <div>
        <h2>🎵 Naad-Brahma</h2>
        <p>Music Fees Management</p>
      </div>

    </div>
  );
}

export default Navbar;