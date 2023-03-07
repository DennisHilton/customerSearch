import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import Customer from "./customer";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/individualamendment/customer" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
