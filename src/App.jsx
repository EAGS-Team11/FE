import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
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
import Course from "./pages/dosen/Course";
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
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavbarDosen />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
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
          <Route path="/Course" element={<Course />} />
        </Route>
      </Routes>
    </Router>
  );
}
