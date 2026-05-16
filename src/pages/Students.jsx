// src/pages/Students.jsx

import { useEffect, useState } from "react";

import { supabase } from "../supabase";

import StudentCard from "../components/StudentCard";

function Students() {

  const [students, setStudents] =
    useState([]);

  const [name, setName] =
    useState("");

  const [dob, setDob] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [instrument, setInstrument] =
    useState("");

  const [branch, setBranch] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [fee, setFee] =
    useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  // FETCH

  const fetchStudents = async () => {

    const { data, error } =
      await supabase
        .from("students")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {
      console.log(error);
      return;
    }

    setStudents(data);
  };

  // ADD STUDENT

  const addStudent = async () => {

    if (
      !name ||
      !dob ||
      !address ||
      !phone ||
      !instrument ||
      !branch ||
      !startDate ||
      !fee
    ) {
      alert("Fill all fields");
      return;
    }

    const { error } =
      await supabase
        .from("students")
        .insert([
          {
            name,
            dob,
            address,
            phone,
            instrument,
            branch,
            start_date: startDate,
            monthly_fee: fee,
          },
        ]);

    if (error) {
      console.log(error);
      return;
    }

    fetchStudents();

    setName("");
    setDob("");
    setAddress("");
    setPhone("");
    setInstrument("");
    setBranch("");
    setStartDate("");
    setFee("");
  };

  // DELETE

  const deleteStudent = async (id) => {

    await supabase
      .from("students")
      .delete()
      .eq("id", id);

    fetchStudents();
  };

  return (

    <div>

      {/* FORM */}

      <div className="form-card">

        <h2>Add Student</h2>

        <div className="input-group">
          <label>Student Name</label>

          <input
            placeholder="Enter full name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Date of Birth</label>

          <input
            type="date"
            value={dob}
            onChange={(e) =>
              setDob(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Address</label>

          <input
            placeholder="Enter address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Phone Number</label>

          <input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />
        </div>

        {/* INSTRUMENT */}

        <div className="input-group">

          <label>Instrument</label>

          <select
            value={instrument}
            onChange={(e) =>
              setInstrument(e.target.value)
            }
          >
            <option value="">
              Select Instrument
            </option>

            <option value="Flute">
              Flute
            </option>

            <option value="Tabla">
              Tabla
            </option>

            <option value="Sitar">
              Sitar
            </option>

          </select>

        </div>

        {/* BRANCH */}

        <div className="input-group">

          <label>Branch</label>

          <select
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
          >
            <option value="">
              Select Branch
            </option>

            <option value="Shahupuri">
              Shahupuri
            </option>

            <option value="Sane Guruji">
              Sane Guruji
            </option>

            <option value="Kagal">
              Kagal
            </option>

          </select>

        </div>

        <div className="input-group">
          <label>Joining Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />
        </div>

        <div className="input-group">
          <label>Monthly Fee</label>

          <input
            type="number"
            placeholder="Enter monthly fee"
            value={fee}
            onChange={(e) =>
              setFee(e.target.value)
            }
          />
        </div>

        <button onClick={addStudent}>
          Add Student
        </button>

      </div>

      {/* STUDENTS */}

      <div className="students-grid">

        {students.length === 0 ? (

          <h2>
            No students added yet
          </h2>

        ) : (

          students.map((student) => (

            <StudentCard
              key={student.id}
              student={student}
              deleteStudent={deleteStudent}
            />

          ))

        )}

      </div>

    </div>
  );
}

export default Students;