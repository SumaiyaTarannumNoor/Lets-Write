// src/Router/Routes.tsx
import { Routes, Route } from "react-router-dom";
import LetsWrite from "../Pages/LetsWrite";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import ProfilePage from "../Pages/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LetsWrite />} />
      <Route path="/lets-write" element={<LetsWrite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default AppRoutes;
