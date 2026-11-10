# Architecture Design: Segregating DPS Junior Public Website and Enterprise Organization Portal

**Date:** 2026-11-10  
**Status:** Approved  
**Author:** Antigravity AI & Keshav Goyal  

---

## 1. Executive Summary & Goals

The project is being refactored from a mixed monolithic folder into **two distinct, decoupled products**:

1. **`dps-junior-website/`**: A high-performance, public-facing institutional website for **DPS Junior Public School** (Playgroup to Class VIII, CBSE standards).
   * **Target Audience:** Prospective parents, students, visitors, community.
   * **Key Capabilities:** School showcase, academic curriculum, fee structure, campus photo gallery, direct WhatsApp & Email inquiry dispatch, and an external link to the portal.
   * **Architecture:** 100% client-side React 18 + Vite static web application. No backend server or database required. Deploys to Cloudflare Pages or Vercel.

2. **`enterprise-org-portal/`**: A full-stack, enterprise-grade Management Portal & ERP system designed for scale across institutions and multi-unit organizations.
   * **Target Audience:** School administrators, teachers, faculty, and organizational staff.
   * **Key Capabilities:** Role-Based Access Control (RBAC), multi-class / department rosters, real-time attendance logging, student/member records, institutional analytics, and reporting.
   * **Architecture:**
     * **Frontend (`enterprise-org-portal/frontend/`):** React 18 + Vite SPA with secure JWT session handling and management dashboards.
     * **Backend (`enterprise-org-portal/backend/`):** Spring Boot 3 (Java 17) REST API running with PostgreSQL on Supabase (`aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres`) deployed via Docker on Render.

---

## 2. Directory & Component Structure

```text
school-project/
│
├── 🌐 dps-junior-website/                   ──> [Product 1] Public School Website
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   │   ├── _redirects
│   │   ├── logo.svg
│   │   ├── fee-structure-2026-27.pdf
│   │   └── gallery/ (Campus, Sports, Labs, Cultural)
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Navbar.jsx (Includes "Portal Login" CTA button)
│       │   ├── Footer.jsx
│       │   ├── LightboxModal.jsx (Photo zoom)
│       │   ├── ContactInquiryForm.jsx (WhatsApp + Email dispatch)
│       │   ├── FeeTable.jsx (Class-wise breakdown + PDF download)
│       │   └── BookVisitModal.jsx
│       └── pages/
│           ├── HomePage.jsx
│           ├── AboutPage.jsx
│           ├── AdmissionsPage.jsx
│           ├── GalleryPage.jsx
│           ├── NoticesPage.jsx
│           └── ContactPage.jsx
│
└── 🏢 enterprise-org-portal/                ──> [Product 2] Enterprise Management ERP
    ├── frontend/                             ──> Portal Web Client
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── index.html
    │   ├── public/
    │   │   └── _redirects
    │   └── src/
    │       ├── main.jsx
    │       ├── App.jsx
    │       ├── index.css
    │       ├── api/client.js (Configured with VITE_API_URL pointing to Render)
    │       ├── context/AuthContext.jsx
    │       ├── components/ (Data tables, Attendance toggles, Stat cards, SVG Icons)
    │       ├── layouts/
    │       │   ├── AdminLayout.jsx
    │       │   └── TeacherLayout.jsx
    │       └── pages/
    │           ├── LoginPage.jsx (Role switcher: Administrator vs Teacher)
    │           ├── admin/ (Dashboard, Classes, Students, Teachers, Reports)
    │           └── teacher/ (Dashboard, Mark Attendance, Students)
    │
    └── backend/                              ──> Enterprise Spring Boot 3 Core
        ├── pom.xml
        ├── Dockerfile
        └── src/main/java/com/school/attendance/
            ├── AttendanceApplication.java
            ├── config/ (DatabaseConfig, SecurityConfig, DataInitializer)
            ├── controller/ (AuthController, AdminController, TeacherController)
            ├── entity/ (User, Role, SchoolClass, Student, AttendanceRecord)
            ├── repository/
            └── service/
```

---

## 3. Product 1: Public Website Specifications

### A. Contact & Inquiry Dispatch (Zero Backend)
* **WhatsApp Integration:** On form submit or floating WhatsApp button click, pre-populates a structured inquiry message and opens `https://wa.me/91XXXXXXXXXX?text=...` with parent details.
* **Email Notification:** Connects via a client-side endpoint (Web3Forms/EmailJS) to send parent inquiries straight to the school admin mailbox.
* **Form Validation:** Institutional validation for phone numbers (Indian 10-digit mobile), email format, child age, and grade preference.

### B. Transparent Fee Schedule
* Clear interactive table on `AdmissionsPage.jsx`:
  * Playgroup / Nursery / KG
  * Primary School (Classes 1 to 5)
  * Middle School (Classes 6 to 8)
* One-click download button for the official Academic Year Fee Schedule PDF.

### C. Categorized Photo Gallery with Lightbox
* Responsive masonry/grid layout on `GalleryPage.jsx`:
  * Filter tabs: *All*, *Campus & Classrooms*, *Sports & Play*, *Activities & Events*.
  * Interactive modal allowing parents to click any photo for full-screen inspection.

### D. Direct Portal Link
* Navbar features a distinct, styled button:
  * Label: **"Staff Portal"** / **"Portal Login"**
  * Opens the Enterprise Portal (`portal.dpsjunior.edu.in` or current deployment URL) in a new tab or direct navigation.

---

## 4. Product 2: Enterprise Organization Portal Specifications

### A. Frontend Architecture
* Dedicated authentication gateway (`/login`) with role-based routing (`ROLE_ADMIN` vs `ROLE_TEACHER`).
* **Admin Module:**
  * Institution Overview (Attendance health, active student/teacher counts).
  * Class / Department Management (Add/manage classes, sections, teacher assignments).
  * Student Roster Management (Add, view, filter by class).
  * Faculty / Staff Directory.
  * Comprehensive Attendance Reports with date pickers and class filters.
* **Staff / Teacher Module:**
  * Single-click class attendance marking (Present, Absent, Late).
  * Student history & absence counts.

### B. Backend Architecture
* Spring Boot 3 running on Java 17 with Spring Security & JWT stateless authentication.
* HikariCP connection pool connected to Supabase PostgreSQL over IPv4 pooler.
* Auto-seed DataInitializer:
  * Admin: `admin@school.com` / `admin123`
  * Teacher: `teacher@dpsjunior.edu.in` / `teacher123`
  * 12 CBSE classes (Playgroup to Class 8) and student rosters.
* Global CORS filter configured for all portal domains (`*.pages.dev`, `localhost`, custom domains).

---

## 5. Migration & Segregation Plan

1. **Step 1:** Create `dps-junior-website/` directory:
   * Copy `frontend/package.json`, Vite configuration, and Tailwind/CSS setup.
   * Move website-specific pages (`HomePage`, `AboutPage`, `AdmissionsPage`, `ContactPage`, `GalleryPage`, `NoticesPage`) and website components (`Navbar`, `Footer`).
   * Add WhatsApp/Email inquiry handler and Lightbox gallery component.
   * Strip out all portal/auth routes from `dps-junior-website/src/App.jsx`.
2. **Step 2:** Create `enterprise-org-portal/`:
   * Set up `enterprise-org-portal/frontend/` with only the portal code (`LoginPage`, `AdminLayout`, `TeacherLayout`, `admin/*`, `teacher/*`, `AuthContext`, `client.js`).
   * Set up `enterprise-org-portal/backend/` by moving the existing `backend/` directory into `enterprise-org-portal/backend/`.
3. **Step 3:** Independent Build Verification:
   * Test `npm run build` in `dps-junior-website/` -> verify clean `dist/`.
   * Test `npm run build` in `enterprise-org-portal/frontend/` -> verify clean `dist/`.
   * Test Maven build in `enterprise-org-portal/backend/`.
4. **Step 4:** Clean up legacy root `frontend/` and `backend/` folders to leave the workspace clean.
5. **Step 5:** Commit and push to Git.

---

## 6. Success Criteria
* `dps-junior-website/` builds independently into static assets with zero portal dependencies.
* `enterprise-org-portal/frontend/` builds independently into an ERP client with zero public website clutter.
* `enterprise-org-portal/backend/` maintains its live Render/Supabase connection without any disruption.

