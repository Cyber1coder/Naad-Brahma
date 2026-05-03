import StudentCard from "./StudentCard";

function StudentList({ students, markPaid }) {
  return (
    <>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          markPaid={markPaid}
        />
      ))}
    </>
  );
}

export default StudentList;