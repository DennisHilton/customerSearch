import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerDetails from "./screens/customerDetails";
import CustomerSearch from "./screens/CustomerSearch";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CustomerSearch />} />
          <Route path="/individualamendment/customer" element={<CustomerDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
