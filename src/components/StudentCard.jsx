// src/components/StudentCard.jsx

import { Link } from "react-router-dom";

function StudentCard({
  student,
  deleteStudent,
}) {

  return (

    <div className="student-card">

      <div className="student-top">

        <div>

          <h3>
            {student.name}
          </h3>

          <p className="student-instrument">
            🎵 {student.instrument}
          </p>

        </div>

        <div className="student-fee">

          ₹{student.monthly_fee}

        </div>

      </div>

      <div className="student-info">

        <p>
          📞 {student.phone}
        </p>

        <p>
          📍 {student.address}
        </p>

        <p>
          🎂 {student.dob}
        </p>

        <p>
          📅 Joined:
          {" "}
          {student.start_date}
        </p>

      </div>

      <div className="student-actions">

        <Link to={`/student/${student.id}`}>
          <button className="view-btn">
            View Details
          </button>
        </Link>

        <button
          className="delete-btn"
          onClick={() =>
            deleteStudent(student.id)
          }
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default StudentCard;