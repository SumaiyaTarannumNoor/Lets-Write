// src/Router/Routes.tsx
import { Routes, Route } from "react-router-dom";
import LetsWrite from "../Pages/LetsWrite";
import LoginPage from "../Pages/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage";
import ProfilePage from "../Pages/ProfilePage";
import ChatGemini from "../Pages/ChatGemini";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import FaqPage from "../Pages/FaqPage";
import ChatMistral from "../Pages/ChatMistral";
import ChatGroq from "../Pages/ChatGoq";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LetsWrite />} />
      <Route path="/lets-write" element={<LetsWrite />} />
      <Route path="/lets-write-user" element={<LetsWrite />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chat-gemini" element={<ChatGemini />} />
      <Route path="/chat-mistral" element={<ChatMistral />} />
      <Route path="/chat-groq" element={<ChatGroq />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}

export default AppRoutes;
