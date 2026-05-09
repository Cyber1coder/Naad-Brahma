// src/pages/Unpaid.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Unpaid() {

  const [students, setStudents] =
    useState([]);

  const [branchFilter, setBranchFilter] =
    useState("All");

  useEffect(() => {
    fetchUnpaidStudents();
  }, []);

  const fetchUnpaidStudents = async () => {

    const currentMonth =
      new Date().getMonth() + 1;

    const currentYear =
      new Date().getFullYear();

    // STUDENTS

    const { data: studentsData } =
      await supabase
        .from("students")
        .select("*");

    // PAYMENTS

    const { data: paymentsData } =
      await supabase
        .from("payments")
        .select("*")
        .eq("month", currentMonth)
        .eq("year", currentYear);

    const paidStudentIds =
      paymentsData.map(
        (payment) =>
          payment.student_id
      );

    const unpaidStudents =
      studentsData.filter(
        (student) =>
          !paidStudentIds.includes(
            student.id
          )
      );

    setStudents(unpaidStudents);
  };

  // MARK PAID

  const markPaid = async (
    student,
    paymentMode
  ) => {

    const currentMonth =
      new Date().getMonth() + 1;

    const currentYear =
      new Date().getFullYear();

    const { error } =
      await supabase
        .from("payments")
        .insert([
          {
            student_id: student.id,

            month: currentMonth,
            year: currentYear,

            total_fee:
              student.monthly_fee,

            fees_given:
              student.monthly_fee,

            remaining: 0,

            payment_mode:
              paymentMode,
          },
        ]);

    if (error) {
      console.log(error);
      alert("Payment failed");
      return;
    }

    fetchUnpaidStudents();
  };

  // FILTER

  const filteredStudents =
    branchFilter === "All"
      ? students
      : students.filter(
          (student) =>
            student.branch ===
            branchFilter
        );

  return (

    <div>

      <h1 className="page-title">
        Unpaid Students
      </h1>

      {/* FILTER */}

      <div className="branch-filter">

        <button
          onClick={() =>
            setBranchFilter("All")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setBranchFilter(
              "Shahupuri"
            )
          }
        >
          Shahupuri
        </button>

        <button
          onClick={() =>
            setBranchFilter(
              "Sane Guruji"
            )
          }
        >
          Sane Guruji
        </button>

      </div>

      {/* STUDENTS */}

      <div className="students-grid">

        {filteredStudents.map(
          (student) => (

            <div
              key={student.id}
              className="student-card"
            >

              <h3>
                {student.name}
              </h3>

              <p>
                🎵 {student.instrument}
              </p>

              <p>
                🏢 {student.branch}
              </p>

              <p>
                ₹{
                  student.monthly_fee
                }
              </p>

              <div className="payment-buttons">

                <button
                  className="pay-btn"
                  onClick={() =>
                    markPaid(
                      student,
                      "Cash"
                    )
                  }
                >
                  Cash
                </button>

                <button
                  className="upi-btn"
                  onClick={() =>
                    markPaid(
                      student,
                      "UPI"
                    )
                  }
                >
                  UPI
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Unpaid;