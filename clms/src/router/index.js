import React from "react";
import { Route, Routes } from "react-router-dom";
import MainComponent from "../Pages/Main";
import RegisterComponent from "../Pages/Auth/Login";
import PrivateRoutes from "./protected-routes";

const Routing = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="*" element={<MainComponent />} />
      </Route>
      <Route element={<RegisterComponent />} path="/login" />
    </Routes>
  );
};

export default Routing;
