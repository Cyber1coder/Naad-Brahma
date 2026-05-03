import { useState } from "react";
import { supabase } from "../supabase";

function AddStudent() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");

  const addStudent = async () => {
    if (!name || !course || !fee) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase.from("students").insert([
      {
        name,
        course,
        fee: parseInt(fee),
      },
    ]);

    if (error) {
      alert("Error adding student");
      return;
    }

    alert("Student added ✅");

    setName("");
    setCourse("");
    setFee("");
  };

  return (
    <div className="container">
      <h2 className="title">Add Student</h2>

      <div className="form">
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

        <button onClick={addStudent}>Add Student</button>
      </div>
    </div>
  );
}

export default AddStudent;