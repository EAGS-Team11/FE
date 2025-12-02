/* src/App.jsx */
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext"; 
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

import ClassAnalitik1 from "./pages/dosen/class/ClassAnalitik1";
import ClassAnalitik2 from "./pages/dosen/class/ClassAnalitik2";

import ProfilDosen from "./pages/dosen/profil/ProfilDosen";
import EditProfilDosen from "./pages/dosen/profil/EditProfilDosen";
import EditPersonalDosen from "./pages/dosen/profil/EditPersonalDosen";


import DosenPage from "./pages/admin/lecturers/index";
import AdminSidebar from "./pages/admin/AdminSidebar";
import AdminNavbar from "./pages/admin/AdminNavbar";
import AdminDashboard from "./pages/admin/dashboard/dashboard";
import StudentsPage from "./pages/admin/students/index";
import Faculties from "./pages/admin/faculties/Faculties";
import DetailFaculties from "./pages/admin/faculties/DetailFaculties";
import DetailProgram from "./pages/admin/faculties/DetailProgram";
import SistemLog from "./pages/admin/log/SistemLog";
import AiMonitoring from "./pages/admin/log/AiMonitoring";
import "./App.css";


// --- Protected Route Wrapper ---
function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Cek Role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect ke home jika role tidak sesuai (misal Dosen mencoba masuk ke halaman Mahasiswa)
    return <Navigate to="/home" replace />; 
  }

  return <Outlet />;
}

// --- MainLayout, DosenLayout (Tetap Sama) ---
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
    <div className="flex flex-col min-h-screen bg-[#F6F7FB]">
      <div className="flex flex-grow">
        <NavbarDosen
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          activeMenu={activeMenu}
        />

        {/* Konten utama */}
       <main className={`flex-grow transition-all duration-300 pt-28 px-10`} 
          style={{ 
            marginLeft: window.innerWidth < 768 ? 0 : isSidebarOpen ? 256 : 0 }}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7FB]">
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      <AdminNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main
        className="flex-grow pt-24 px-10 transition-all duration-300"
        style={{ marginLeft: isSidebarOpen ? 256 : 0 }}
      >
        <Outlet />
      </main>
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider> {/* BUNGKUS SEMUA DENGAN AUTH PROVIDER */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - MAHASISWA */}
          <Route element={<ProtectedRoute allowedRoles={['mahasiswa']} />}>
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
          </Route>


          {/* Protected Routes - DOSEN */}
          <Route element={<ProtectedRoute allowedRoles={['dosen']} />}>
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
              <Route path="/dosen/ClassAnalitik1" element={<ClassAnalitik1 />} />
              <Route path="/dosen/ClassAnalitik2" element={<ClassAnalitik2 />} />
              <Route path="/dosen/ProfilDosen" element={<ProfilDosen />} />
              <Route path="/dosen/EditProfilDosen" element={<EditProfilDosen />} />
              <Route path="/dosen/EditPersonalDosen" element={<EditPersonalDosen />} />
            </Route>
          </Route>
          
          {/* Catch-all route for unhandled paths (optional) */}
          <Route path="*" element={
            <div className="flex items-center justify-center h-screen text-xl">404 Not Found</div>
          } />
  
        {/* Layout untuk admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/lecturers" element={<DosenPage />} />
          <Route path="/admin/students" element={<StudentsPage />} />
          <Route path="/admin/faculties" element={<Faculties />} />
          <Route path="/admin/faculties/:id" element={<DetailFaculties />} />
          <Route path="/admin/faculties/:facultyId/program/:programId" element={<DetailProgram />} />
          <Route path="/admin/sistemlog" element={<SistemLog />} />
          <Route path="/admin/aimonitoring" element={<AiMonitoring />} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}