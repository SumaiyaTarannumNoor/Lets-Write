// src/Router/Routes.tsx
import { Routes, Route } from "react-router-dom";
import LetsWrite from "../Pages/LetsWrite";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import ProfilePage from "../Pages/ProfilePage";
import Chat from "../Pages/Chat";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import FaqPage from "../Pages/FaqPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LetsWrite />} />
      <Route path="/lets-write" element={<LetsWrite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}

export default AppRoutes;
