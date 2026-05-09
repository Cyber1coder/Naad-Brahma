import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";
import PaymentCard from "../components/PaymentCard";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchStudent();
    fetchPayments();
  }, []);

  const fetchStudent = async () => {
    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("id", id)
      .single();

    setStudent(data);
  };

  const fetchPayments = async () => {
    const { data } = await supabase
      .from("payments")
      .select("*")
      .eq("student_id", id)
      .order("year", { ascending: false });

    setPayments(data);
  };

  if (!student) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <div className="student-detail-card">
        <h2>{student.name}</h2>

        <p>{student.course}</p>

        <p>
          Monthly Fee: ₹{student.monthly_fee}
        </p>
      </div>

      <h2>Payment History</h2>

      <div className="students-grid">
        {payments.map((payment) => (
          <PaymentCard
            key={payment.id}
            payment={payment}
          />
        ))}
      </div>

    </div>
  );
}

export default StudentDetails;