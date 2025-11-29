import React from "react";
import StudentList from "../../../components/admin/students/StudentList";

export default function StudentsPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Student Management</h2>
      <StudentList />
    </>
  );
}
