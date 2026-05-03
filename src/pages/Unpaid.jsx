import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import StudentList from "../components/StudentList";

function Unpaid() {
  const [students, setStudents] = useState([]);

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const fetchStudents = async () => {
    const { data } = await supabase.from("students").select("*");

    const unpaid = data.filter(
      (s) =>
        s.last_paid_month !== currentMonth ||
        s.last_paid_year !== currentYear
    );

    setStudents(unpaid);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const markPaid = async (id, mode) => {
    await supabase
      .from("students")
      .update({
        last_paid_month: currentMonth,
        last_paid_year: currentYear,
        payment_mode: mode,
      })
      .eq("id", id);

    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <>
      <h2>Unpaid Students</h2>
      <StudentList students={students} markPaid={markPaid} />
    </>
  );
}

export default Unpaid;