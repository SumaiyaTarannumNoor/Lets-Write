// src/Router/Routes.tsx
import { Routes, Route } from "react-router-dom";
import LetsWrite from "../Pages/LetsWrite";
import Home from "../Pages/LetsWrite";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lets-write" element={<LetsWrite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default AppRoutes;
