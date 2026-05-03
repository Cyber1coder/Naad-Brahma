function StudentCard({ student, markPaid, deleteStudent }) {
  return (
    <div className="card">
      <div className="card-top">
        <div className="student-name">{student.name}</div>
        <div className="student-info">
          {student.course} • ₹{student.fee}
        </div>
        <span className="badge">Unpaid</span>
      </div>

      <div className="button-group">
        <button
          className="cash-btn"
          onClick={() => markPaid(student.id, "Cash")}
        >
          Cash
        </button>

        <button
          className="upi-btn"
          onClick={() => markPaid(student.id, "UPI")}
        >
          UPI
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteStudent(student.id)}
        >
          ✕
        </button>
      </div>
      <div className="card">
  <div>
    <div className="student-name">{student.name}</div>
    <div className="student-info">
      {student.course} • ₹{student.fee}
    </div>
    <span className="badge">Unpaid</span>
  </div>

  <div className="button-group">
    ...
  </div>
</div>
    </div>
  );
}

export default StudentCard;