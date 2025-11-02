import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import MyCourse from './pages/course/MyCourse'; 
import CourseEssay from "./pages/course/CourseEssay";
import MyEssays from './pages/essay/MyEssays'; 
import SubmitEssay from "./pages/essay/SubmitEssay";
import ViewGraded from "./pages/essay/ViewGraded";
import InputEssay from "./pages/essay/InputEssay";
import Navbar from "./pages/navbar";
import Profil from "./pages/profil/profil";
import EditMyProfil from "./pages/profil/EditMyProfil";
import EditPersonal from "./pages/profil/EditPersonal";
import './App.css';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="">
        <Outlet /> {/*  */}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman dengan Navbar */}
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
      </Routes>
    </Router>
  );
}
