// src/pages/admin/lecturers/index.jsx

import React, { useState } from "react";
import DosenList from "../../../components/admin/dosen/DosenList";

export default function DosenPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Lecturer Management</h2>
      <DosenList />
    </>
  );
}
