// src/components/StudentCard.jsx

import { Link } from "react-router-dom";

function StudentCard({ student, deleteStudent }) {
  return (
    <div className="student-card">

      <div>
        <h3>{student.name}</h3>

        <p>
          {student.course} • ₹{student.monthly_fee}
        </p>
      </div>

      <div className="student-actions">

        <Link to={`/student/${student.id}`}>
          <button className="view-btn">
            View
          </button>
        </Link>

        <button
          className="delete-btn"
          onClick={() => deleteStudent(student.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default StudentCard;