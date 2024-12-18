import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Vacancies from "./pages/Vacancies/Vacancies";
import Judgements from "./pages/Judgements/Judgement";

import "bootstrap/dist/css/bootstrap.min.css";

// Add the Google Fonts link directly to the public/index.html file for better practice.

const App: React.FC = () => {
  return (
   // <Router basename="/aft_react"> {/* Set basename to your app's subfolder */}
    <Router basename="/"> {/* Set basename to your app's subfolder */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/judgements" element={<Judgements />} />
        <Route path="/vacancies" element={<Vacancies />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
