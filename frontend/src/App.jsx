import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import NoticesPage from "./pages/NoticesPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeachersPage from "./pages/admin/TeachersPage";
import ClassesPage from "./pages/admin/ClassesPage";
import StudentsPage from "./pages/admin/StudentsPage";
import ReportsPage from "./pages/admin/ReportsPage";

import TeacherLayout from "./layouts/TeacherLayout";
import TeacherClasses from "./pages/teacher/TeacherClasses";
import MarkAttendance from "./pages/teacher/MarkAttendance";
import AttendanceHistory from "./pages/teacher/AttendanceHistory";
import TeacherReports from "./pages/teacher/TeacherReports";

export default function App() {
  return (
    <Routes>
      {/* Track A: Public Animated Website */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Login Page */}
      <Route path="/login" element={<LoginPage />} />

      {/* Track C: Admin Portal */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="classes" element={<ClassesPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      {/* Track C: Teacher Portal */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute role="TEACHER">
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherClasses />} />
        <Route path="attendance" element={<MarkAttendance />} />
        <Route path="history" element={<AttendanceHistory />} />
        <Route path="reports" element={<TeacherReports />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
