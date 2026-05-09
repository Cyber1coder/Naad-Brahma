// src/pages/Paid.jsx

import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Paid() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPaidStudents();
  }, []);

  const fetchPaidStudents = async () => {

    const currentMonth =
      new Date().getMonth() + 1;

    const currentYear =
      new Date().getFullYear();

    const { data, error } = await supabase
      .from("payments")
      .select(`
        *,
        students (
          name,
          course,
          monthly_fee
        )
      `)
      .eq("month", currentMonth)
      .eq("year", currentYear);

    if (error) {
      console.log(error);
      return;
    }

    setPayments(data);
  };

  return (
    <div>

      <h1 className="page-title">
        Paid Students
      </h1>

      <div className="students-grid">

        {payments.map((payment) => (

          <div
            key={payment.id}
            className="payment-card"
          >

            <h3>
              {payment.students?.name}
            </h3>

            <p>
              {payment.students?.course}
            </p>

            <p>
              Fee: ₹{payment.total_fee}
            </p>

            <p>
              Paid: ₹{payment.fees_given}
            </p>

            <p>
              Mode: {payment.payment_mode}
            </p>

            <button className="paid-btn">
              Paid This Month
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Paid;