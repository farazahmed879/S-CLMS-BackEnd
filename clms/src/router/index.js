import React from "react";
import { Route, Routes } from "react-router-dom";
import MainComponent from "../Pages/Main";
import RegisterComponent from "../Pages/Auth/Login";


const Routing = () => {
  return (
    <Routes>
      <Route path="/login" element={<RegisterComponent />} />
      <Route path="*" element={<MainComponent />} />
    </Routes>
  );
};

export default Routing;
