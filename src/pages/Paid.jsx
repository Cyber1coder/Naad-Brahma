import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Paid() {
  const [students, setStudents] = useState([]);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const fetchPaid = async () => {
    const { data } = await supabase.from("students").select("*");

    const paid = data.filter(
      (s) =>
        s.last_paid_month === currentMonth &&
        s.last_paid_year === currentYear
    );

    setStudents(paid);
  };

  useEffect(() => {
    fetchPaid();
  }, []);

  return (
    <div>
      <h2>Paid Students</h2>

      {students.length === 0 ? (
        <p>No payments yet</p>
      ) : (
        students.map((s) => (
          <div key={s.id} className="card">
            <div>
              <div className="student-name">{s.name}</div>
              <div className="student-info">
                {s.course} • ₹{s.fee}
              </div>
              <div style={{ color: "green" }}>
                Paid via {s.payment_mode}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Paid;