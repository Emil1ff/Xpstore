import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header/Header";
import Footer from "./assets/components/Footer/Footer";
import Home from "./assets/pages/Home/Home";
import Detail from "./assets/pages/Detail/Detail";
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Detail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
