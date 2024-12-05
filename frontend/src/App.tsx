import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Vacancies from "./pages/Vacancies/Vacancies";
import Judgements from "./pages/Judgements/Judgement";



import "bootstrap/dist/css/bootstrap.min.css";

<link
  href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&family=Roboto:wght@400;500&display=swap"
  rel="stylesheet"
/>

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/judgements" element={<Judgements />} /> {/* Add Judgements route */}
        <Route path="/vacancies" element={<Vacancies />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
