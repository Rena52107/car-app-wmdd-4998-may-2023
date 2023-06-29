import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Showmore from "./pages/Showmore";

const Root = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/people/*"
        element={<Showmore />}
      />
    </Routes>
  );
};

export default Root;
