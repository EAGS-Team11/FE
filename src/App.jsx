import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import MyCourse from './pages/course/MyCourse'; 
import MyEssays from './pages/essay/MyEssays'; 
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
        <Route path="/my-essays" element={<MyEssays />} />
      </Routes>
    </Router>
  );
}
