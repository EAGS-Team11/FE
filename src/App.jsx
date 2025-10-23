import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import Home from './pages/home'; // pastikan file dan huruf besar-kecilnya sama
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman default (login) */}
        <Route path="/" element={<Login />} />

        {/* Halaman login */}
        <Route path="/login" element={<Login />} />

        {/* Halaman home/dashboard */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
