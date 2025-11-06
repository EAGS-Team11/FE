import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import React, { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/mahasiswa/home";
import MyCourse from "./pages/mahasiswa/course/MyCourse";
import CourseEssay from "./pages/mahasiswa/course/CourseEssay";
import MyEssays from "./pages/mahasiswa/essay/MyEssays";
import SubmitEssay from "./pages/mahasiswa/essay/SubmitEssay";
import ViewGraded from "./pages/mahasiswa/essay/ViewGraded";
import InputEssay from "./pages/mahasiswa/essay/InputEssay";
import Navbar from "./pages/navbar";
import Profil from "./pages/mahasiswa/profil/Profil";
import EditMyProfil from "./pages/mahasiswa/profil/EditMyProfil";
import EditPersonal from "./pages/mahasiswa/profil/EditPersonal";
import Footer from "./pages/footer"; 

import NavbarDosen from "./pages/NavbarDosen";
import Course from "./pages/dosen/course/Course";
import CourseDetail from "./pages/dosen/course/CourseDetail";
import CreateEssay from "./pages/dosen/course/CreateEssay";
import AddQuestion from "./pages/dosen/course/AddQuestion";
import CheckAnswer from "./pages/dosen/course/CheckAnswer";
import EssayDetail from "./pages/dosen/course/EssayDetail";
import GiveGrade from "./pages/dosen/course/GiveGrade";

import AiGrading1 from "./pages/dosen/ai/AiGrading1";
import AiGrading2 from "./pages/dosen/ai/AiGrading2";
import AiGrading3 from "./pages/dosen/ai/AiGrading3";
import EditEssay from "./pages/dosen/course/EditEssay";
import "./App.css";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function DosenLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const activeMenu = "Courses"; 

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-grow">
        <NavbarDosen
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeMenu={activeMenu}
        />

        {/* Konten utama */}
       <main className={`flex-grow transition-all duration-300 pt-28 px-10`} 
          style={{ marginLeft: isSidebarOpen ? 256 : 0 }}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman dengan Navbar dan Footer */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/my-course" element={<MyCourse />} />
          <Route path="/course/:courseId" element={<CourseEssay />} />
          <Route path="/my-essays" element={<MyEssays />} />
          <Route path="/submit-essay" element={<SubmitEssay />} />
          <Route path="/submit-essay/:courseId/:essayId" element={<InputEssay />} />
          <Route path="/view-graded" element={<ViewGraded />} />
          <Route path="/input-essay" element={<InputEssay />} />
          <Route path="/profile" element={<Profil />} />
          <Route path="/EditMyProfil" element={<EditMyProfil />} />
          <Route path="/EditPersonal" element={<EditPersonal />} />
        </Route>

          {/* Layout untuk dosen */}
        <Route element={<DosenLayout />}>
          <Route path="/dosen/course" element={<Course />} />
          <Route path="/dosen/course/:courseId" element={<CourseDetail />} />
          <Route path="/dosen/course/:courseId/create-essay" element={<CreateEssay />} />
          <Route path="/dosen/course/:courseId/add-question" element={<AddQuestion />} />
          <Route path="/dosen/course/:courseId/essay/:essayId" element={<EssayDetail />} />
          <Route path="/dosen/course/:courseId/edit-essay/:essayId" element={<EditEssay />} />
          <Route path="/dosen/check-answer" element={<CheckAnswer />} />
          <Route path="/dosen/AiGrading1" element={<AiGrading1/>} />
          <Route path="/dosen/AiGrading2" element={<AiGrading2/>} />
          <Route path="/dosen/AiGrading3" element={<AiGrading3/>} />
          <Route path="/dosen/edit-essay" element={<EditEssay />} />
          <Route path="/dosen/give-grade" element={<GiveGrade />} />
        </Route>
      </Routes>
    </Router>
  );
}
