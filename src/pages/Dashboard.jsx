import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>

      {/* HERO SECTION */}
      <div className="hero-section">

        <div className="hero-content">

          <span className="hero-badge">
            🎵 Music Management System
          </span>

          <h1>
            Welcome to <br />
            Naad-Brahma
          </h1>

          <p>
            Manage students, monthly fees,
            payment history and records
            with a clean modern dashboard.
          </p>

          <div className="hero-buttons">

            <Link to="/students">
              <button className="primary-btn">
                Manage Students
              </button>
            </Link>

            <Link to="/unpaid">
              <button className="secondary-btn">
                View Unpaid
              </button>
            </Link>

          </div>

        </div>

        <div className="hero-card">

          <div className="mini-card">
            <h3>🎼 Tabla</h3>
            <p>Track monthly payments</p>
          </div>

          <div className="mini-card">
            <h3>🎶 Flute</h3>
            <p>Manage students easily</p>
          </div>

        </div>

      </div>

      {/* FEATURES */}

      <div className="features-grid">

        <div className="feature-card">
          <h3>📚 Student Records</h3>

          <p>
            Store and manage all students
            in one organized place.
          </p>
        </div>

        <div className="feature-card">
          <h3>💳 Monthly Payments</h3>

          <p>
            Track paid and unpaid fees
            every month.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Payment History</h3>

          <p>
            Access complete payment
            history for every student.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;