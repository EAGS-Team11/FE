import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import MyCourse from './pages/course/MyCourse'; 
import CourseEssay from "./pages/course/CourseEssay";
import MyEssays from './pages/essay/MyEssays'; 
import SubmitEssay from "./pages/essay/SubmitEssay";
import ViewGraded from "./pages/essay/ViewGraded";
import InputEssay from "./pages/essay/InputEssay";
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-course" element={<MyCourse />} />
        <Route path="/course/:courseId" element={<CourseEssay />} />
        <Route path="/my-essays" element={<MyEssays />} />
        <Route path="/submit-essay" element={<SubmitEssay />} />
        <Route path="/submit-essay/:courseId/:essayId" element={<InputEssay />} />
        <Route path="/view-graded" element={<ViewGraded />} />
        <Route path="/input-essay" element={<InputEssay />} />
      </Routes>
    </Router>
  );
}
