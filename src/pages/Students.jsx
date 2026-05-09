// src/pages/Students.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import StudentCard from "../components/StudentCard";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("id", { ascending: false });

    setStudents(data);
  };

  const addStudent = async () => {
    if (!name || !course || !fee) {
      return alert("Fill all fields");
    }

    await supabase.from("students").insert([
      {
        name,
        course,
        monthly_fee: fee,
      },
    ]);

    setName("");
    setCourse("");
    setFee("");

    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await supabase
      .from("students")
      .delete()
      .eq("id", id);

    fetchStudents();
  };

  return (
    <div>

      <div className="form-card">
        <h2>Add Student</h2>

        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          <option value="Flute">Flute</option>
          <option value="Tabla">Tabla</option>
        </select>

        <input
          type="number"
          placeholder="Monthly Fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />

        <button onClick={addStudent}>
          Add Student
        </button>
      </div>

      <div className="students-grid">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            deleteStudent={deleteStudent}
          />
        ))}
      </div>

    </div>
  );
}

export default Students;