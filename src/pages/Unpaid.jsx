// src/pages/Unpaid.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Unpaid() {

  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchUnpaidStudents();
  }, []);

  const fetchUnpaidStudents = async () => {

    const currentMonth =
      new Date().getMonth() + 1;

    const currentYear =
      new Date().getFullYear();

    // ALL STUDENTS

    const { data: studentsData } =
      await supabase
        .from("students")
        .select("*");

    // PAID STUDENTS

    const { data: paymentsData } =
      await supabase
        .from("payments")
        .select("*")
        .eq("month", currentMonth)
        .eq("year", currentYear);

    const paidStudentIds =
      paymentsData.map(
        (payment) => payment.student_id
      );

    // FILTER UNPAID

    const unpaidStudents =
      studentsData.filter(
        (student) =>
          !paidStudentIds.includes(student.id)
      );

    setStudents(unpaidStudents);
  };

  const markPaid = async (student) => {

    const currentMonth =
      new Date().getMonth() + 1;

    const currentYear =
      new Date().getFullYear();

    const { error } = await supabase
      .from("payments")
      .insert([
        {
          student_id: student.id,

          month: currentMonth,
          year: currentYear,

          total_fee: student.monthly_fee,

          fees_given: student.monthly_fee,

          remaining: 0,

          payment_mode: "Cash",
        },
      ]);

    if (error) {
      console.log(error);
      alert("Payment failed");
      return;
    }

    fetchUnpaidStudents();
  };

  return (
    <div>

      <h1 className="page-title">
        Unpaid Students
      </h1>

      <div className="students-grid">

        {students.map((student) => (

          <div
            key={student.id}
            className="student-card"
          >

            <h3>{student.name}</h3>

            <p>
              {student.course}
            </p>

            <p>
              ₹{student.monthly_fee}
            </p>

            <button
              className="pay-btn"
              onClick={() => markPaid(student)}
            >
              Mark As Paid
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Unpaid;