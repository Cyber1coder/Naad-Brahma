// src/pages/Paid.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Paid() {

  const [payments, setPayments] =
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
    fetchPaidStudents();
  }, [
    selectedMonth,
    selectedYear,
  ]);

  const fetchPaidStudents = async () => {

    const { data, error } =
      await supabase
        .from("payments")
        .select(`
          *,
          students (
            name,
            instrument,
            branch,
            monthly_fee
          )
        `)
        .eq("month", selectedMonth)
        .eq("year", selectedYear);

    if (error) {
      console.log(error);
      return;
    }

    setPayments(data);
  };

  // FILTER

  const filteredPayments =
    branchFilter === "All"
      ? payments
      : payments.filter(
          (payment) =>
            payment.students?.branch
            === branchFilter
        );

  return (

    <div>

      <h1 className="page-title">
        Paid Students
      </h1>

      {/* FILTERS */}

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

      {/* BRANCHES */}

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

      {/* PAYMENTS */}

      <div className="students-grid">

        {filteredPayments.map(
          (payment) => (

            <div
              key={payment.id}
              className="payment-card"
            >

              <h3>
                {payment.students?.name}
              </h3>

              <p>
                🎵
                {" "}
                {payment.students?.instrument}
              </p>

              <p>
                🏢
                {" "}
                {payment.students?.branch}
              </p>

              <p>
                Fee:
                {" "}
                ₹{payment.total_fee}
              </p>

              <p>
                Paid:
                {" "}
                ₹{payment.fees_given}
              </p>

              <p>
                Mode:
                {" "}
                {payment.payment_mode}
              </p>

              <button className="paid-btn">
                Paid
              </button>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default Paid;