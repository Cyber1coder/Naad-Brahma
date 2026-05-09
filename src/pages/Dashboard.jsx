import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-noise"></div>

        <div className="hero-content">

          <div className="hero-badge">
            ✨ A SANCTUARY OF SOUND
          </div>

          <h1 className="hero-title">
            Where Tradition
            <br />
            Meets <span>Rhythm</span>
          </h1>

          <p className="hero-text">
            A refined dashboard crafted for
            Naad-Brahma — manage your
            students, track monthly fees,
            and orchestrate every branch
            of your music academy with
            effortless elegance.
          </p>

          <div className="hero-buttons">

            <Link to="/students">
              <button className="primary-btn">
                Manage Students →
              </button>
            </Link>

            <Link to="/unpaid">
              <button className="secondary-btn">
                Record Payment
              </button>
            </Link>

          </div>

        </div>

        {/* WAVES */}

        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>

      </section>

      {/* STATS */}

      <section className="stats-grid">

        <div className="stat-card">

          <div className="stat-icon">
            👨‍🎓
          </div>

          <div>
            <h2>101</h2>
            <p>ACTIVE STUDENTS</p>
          </div>

        </div>

        

        <div className="stat-card">

          <div className="stat-icon">
            🎵
          </div>

          <div>
            <h2>3+</h2>
            <p>INSTRUMENTS</p>
          </div>

        </div>

       

      </section>

      {/* INSTRUMENTS */}

      <section className="instrument-section">

        <div className="instrument-header">

          <span>
            THE TRINITY
          </span>

          <h2>
            Our Instruments
          </h2>

        </div>

        <div className="instrument-grid">

          {/* TABLA */}

          <div className="instrument-card tabla-card">

            <div className="instrument-icon tabla">
              ♪
            </div>

            <h3>
              Tabla
            </h3>

            <h4>
              The heartbeat of rhythm
            </h4>

            <p>
              Master the intricate taals
              and bols of India's most
              expressive percussion
              tradition.
            </p>

          </div>

          {/* FLUTE */}

          <div className="instrument-card flute-card">

            <div className="instrument-icon flute">
              ♫
            </div>

            <h3>
              Flute
            </h3>

            <h4>
              Breath of the divine
            </h4>

            <p>
              Discover the meditative
              melodies of the bansuri,
              an instrument as old as
              time itself.
            </p>

          </div>

          {/* SITAR */}

          <div className="instrument-card sitar-card">

            <div className="instrument-icon sitar">
              ♬
            </div>

            <h3>
              Sitar
            </h3>

            <h4>
              Strings of the soul
            </h4>

            <p>
              Learn the ragas and refined
              techniques that define India's
              most iconic stringed
              instrument.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Dashboard;