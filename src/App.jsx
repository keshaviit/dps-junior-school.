import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AdmissionsPage from "./pages/AdmissionsPage";
import GalleryPage from "./pages/GalleryPage";
import NoticesPage from "./pages/NoticesPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="admissions" element={<AdmissionsPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Catch-all route returns to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

