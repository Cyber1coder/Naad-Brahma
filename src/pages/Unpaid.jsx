// src/pages/Unpaid.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Unpaid() {

  const [students, setStudents] =
    useState([]);

  const [branchFilter, setBranchFilter] =
    useState("All");

  const [selectedMonth, setSelectedMonth] =
    useState(
      new Date().getMonth() + 1
    );

  const [selectedYear, setSelectedYear] =
    useState(
      new Date().getFullYear()
    );

  useEffect(() => {
    fetchUnpaidStudents();
  }, [
    selectedMonth,
    selectedYear,
  ]);

  // FETCH

  const fetchUnpaidStudents = async () => {

    const { data: studentsData } =
      await supabase
        .from("students")
        .select("*");

    const { data: paymentsData } =
      await supabase
        .from("payments")
        .select("*")
        .eq("month", selectedMonth)
        .eq("year", selectedYear);

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

    const { error } =
      await supabase
        .from("payments")
        .insert([
          {
            student_id: student.id,

            month: selectedMonth,

            year: selectedYear,

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

      alert(
        "Payment already exists"
      );

      console.log(error);

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

      {/* MONTH + YEAR */}

      <div className="filters-row">

        <select
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              Number(e.target.value)
            )
          }
        >

          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (

            <option
              key={index + 1}
              value={index + 1}
            >
              {month}
            </option>

          ))}

        </select>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              Number(e.target.value)
            )
          }
        >

          {[2025,2026,2027,2028]
            .map((year) => (

              <option
                key={year}
                value={year}
              >
                {year}
              </option>

            ))}

        </select>

      </div>

      {/* BRANCH FILTER */}

      <div className="branch-filter">

        <button
          className={
            branchFilter === "All"
            ? "active"
            : ""
          }
          onClick={() =>
            setBranchFilter("All")
          }
        >
          All
        </button>

        <button
          className={
            branchFilter ===
            "Shahupuri"
            ? "active"
            : ""
          }
          onClick={() =>
            setBranchFilter(
              "Shahupuri"
            )
          }
        >
          Shahupuri
        </button>

        <button
          className={
            branchFilter ===
            "Sane Guruji"
            ? "active"
            : ""
          }
          onClick={() =>
            setBranchFilter(
              "Sane Guruji"
            )
          }
        >
          Sane Guruji
        </button>

        <button
          className={
            branchFilter ===
            "Kagal"
            ? "active"
            : ""
          }
          onClick={() =>
            setBranchFilter(
              "Kagal"
            )
          }
        >
          Kagal
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
                ₹{student.monthly_fee}
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