import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import References from "./pages/References.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import "maplibre-gl/dist/maplibre-gl.css";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<div className="container"><Home /></div>} />
        <Route path="/referanslar" element={<References />} /> {/* ✅ fullscreen */}
        <Route path="/proje/:id" element={<div className="container"><ProjectDetail /></div>} />
        <Route path="/hakkimizda" element={<About />} />
        <Route path="/iletisim" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}