# Segregating DPS Junior Website and Enterprise Organization Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Segregate the school platform into two independent products: a zero-backend, high-performance public institutional website (`dps-junior-website/`) and a full-stack, enterprise-grade multi-role ERP management system (`enterprise-org-portal/`).

**Architecture:** The repository is split into two standalone project trees: `dps-junior-website` (pure React + Vite static SPA with WhatsApp/email inquiries, fee tables, photo gallery lightbox, and portal link) and `enterprise-org-portal` (composed of `frontend/` React ERP client and `backend/` Spring Boot 3 + Supabase PostgreSQL).

**Tech Stack:** React 18, Vite 5, Tailwind CSS, Lucide-react / SVG Icons, Spring Boot 3.2, Java 17, PostgreSQL, HikariCP, Render Docker.

**Spec:** [`docs/superpowers/specs/2026-11-10-website-and-enterprise-portal-segregation-design.md`](file:///Users/keshavgoyal/Desktop/school-project/docs/superpowers/specs/2026-11-10-website-and-enterprise-portal-segregation-design.md)

## Global Constraints
- DPS Junior branding: Strictly DPS JUNIOR PUBLIC SCHOOL (Playgroup to Class VIII, CBSE standards).
- Design system: Dark teal (`#264E52`), Soft cream (`#F5EBE6`), Soft coral (`#F7E7E4`), zero emojis (pure SVGs only), rounded institutional borders.
- Website independence: Zero backend server dependencies for `dps-junior-website`.
- Database connection: Supabase IPv4 Pooler at `aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres`.
- Deployment readiness: Both frontends must output working `dist/` bundles with SPA `_redirects`.

## Review Focus
1. **Route isolation:** The public website must not contain any portal/auth routes (`/admin`, `/teacher`, `/login`).
2. **ERP client isolation:** The portal frontend must not contain public website pages or branding routes.
3. **Contact form dispatch:** Submitting inquiries on the public site must trigger WhatsApp prefill or email dispatch without server failure.
4. **Build independence:** Both `dps-junior-website` and `enterprise-org-portal/frontend` must build cleanly via `npm run build` independently.
5. **Backend stability:** Moving `backend/` into `enterprise-org-portal/backend/` must preserve Dockerfile and Maven configurations for Render.

---

### Task 1: Scaffold and Build `dps-junior-website` (Public Showcase Product)

**Files:**
- Create: `dps-junior-website/package.json`
- Create: `dps-junior-website/vite.config.js`
- Create: `dps-junior-website/index.html`
- Create: `dps-junior-website/public/_redirects`
- Create: `dps-junior-website/src/main.jsx`
- Create: `dps-junior-website/src/App.jsx`
- Create: `dps-junior-website/src/index.css`
- Create: `dps-junior-website/src/data/school.js`
- Create: `dps-junior-website/src/components/Navbar.jsx`
- Create: `dps-junior-website/src/components/Footer.jsx`
- Create: `dps-junior-website/src/components/FeeTable.jsx`
- Create: `dps-junior-website/src/components/LightboxModal.jsx`
- Create: `dps-junior-website/src/components/InquiryForm.jsx`
- Create: `dps-junior-website/src/pages/HomePage.jsx`
- Create: `dps-junior-website/src/pages/AboutPage.jsx`
- Create: `dps-junior-website/src/pages/AdmissionsPage.jsx`
- Create: `dps-junior-website/src/pages/GalleryPage.jsx`
- Create: `dps-junior-website/src/pages/NoticesPage.jsx`
- Create: `dps-junior-website/src/pages/ContactPage.jsx`

**Step-by-step:**
- [ ] Create `dps-junior-website/` directory structure with `public/` and `src/`.
- [ ] Copy base dependencies and configuration (`package.json`, `vite.config.js`, `index.html`, `index.css`).
- [ ] Copy public school data (`src/data/school.js`) and public page components (`HomePage`, `AboutPage`, `AdmissionsPage`, `GalleryPage`, `NoticesPage`, `ContactPage`).
- [ ] Build `InquiryForm.jsx` supporting direct WhatsApp formatted chat dispatch (`wa.me`) and email notification.
- [ ] Build `FeeTable.jsx` displaying class-wise tuition slabs (Playgroup-KG, Classes 1-5, Classes 6-8) and a "Download Fee Schedule PDF" action.
- [ ] Build `LightboxModal.jsx` in `GalleryPage.jsx` allowing full-screen preview when clicking any photo.
- [ ] Update `Navbar.jsx` with institutional branding and a prominent "Portal Login" CTA button.
- [ ] Configure `App.jsx` with public routing (`/`, `/about`, `/admissions`, `/gallery`, `/notices`, `/contact`).
- [ ] Run `npm install` and verify `npm run build` succeeds in `dps-junior-website/`.
- [ ] Commit Task 1: `feat(website): scaffold and verify independent public website`.

---

### Task 2: Scaffold and Build `enterprise-org-portal/frontend` (ERP Client)

**Files:**
- Create: `enterprise-org-portal/frontend/package.json`
- Create: `enterprise-org-portal/frontend/vite.config.js`
- Create: `enterprise-org-portal/frontend/index.html`
- Create: `enterprise-org-portal/frontend/public/_redirects`
- Create: `enterprise-org-portal/frontend/src/main.jsx`
- Create: `enterprise-org-portal/frontend/src/App.jsx`
- Create: `enterprise-org-portal/frontend/src/index.css`
- Create: `enterprise-org-portal/frontend/src/api/client.js`
- Create: `enterprise-org-portal/frontend/src/context/AuthContext.jsx`
- Create: `enterprise-org-portal/frontend/src/components/Icons.jsx`
- Create: `enterprise-org-portal/frontend/src/layouts/AdminLayout.jsx`
- Create: `enterprise-org-portal/frontend/src/layouts/TeacherLayout.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/LoginPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/admin/DashboardPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/admin/ClassesPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/admin/StudentsPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/admin/TeachersPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/admin/ReportsPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/teacher/TeacherDashboardPage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/teacher/MarkAttendancePage.jsx`
- Create: `enterprise-org-portal/frontend/src/pages/teacher/StudentListPage.jsx`

**Step-by-step:**
- [ ] Create `enterprise-org-portal/frontend/` directory structure.
- [ ] Setup `package.json`, `vite.config.js`, `index.html`, `public/_redirects`, and `index.css`.
- [ ] Copy authentication infrastructure (`AuthContext.jsx`, `api/client.js`) and SVG icons (`Icons.jsx`).
- [ ] Copy `LoginPage.jsx` with two-panel desktop layout, soft coral role switcher (Admin vs Teacher), and institutional styling.
- [ ] Copy `AdminLayout.jsx`, `TeacherLayout.jsx` and all Admin and Teacher dashboard pages.
- [ ] Configure `App.jsx` with ERP routing: `/` redirects to `/login`, `/admin/*` protected routes, `/teacher/*` protected routes.
- [ ] Run `npm install` and verify `npm run build` succeeds in `enterprise-org-portal/frontend/`.
- [ ] Commit Task 2: `feat(portal): scaffold and verify enterprise portal frontend client`.

---

### Task 3: Migrate `backend/` into `enterprise-org-portal/backend`

**Files:**
- Move: `backend/` to `enterprise-org-portal/backend/`
- Verify: `enterprise-org-portal/backend/Dockerfile`
- Verify: `enterprise-org-portal/backend/pom.xml`
- Verify: `enterprise-org-portal/backend/src/main/java/com/school/attendance/config/DatabaseConfig.java`

**Step-by-step:**
- [ ] Move `backend/` into `enterprise-org-portal/backend/`.
- [ ] Verify `DatabaseConfig.java` retains `aws-1-ap-southeast-2.pooler.supabase.com:5432` and `sslmode=require` handling.
- [ ] Verify `Dockerfile` continues to build the Maven Spring Boot application.
- [ ] Commit Task 3: `refactor(portal): move Spring Boot backend into enterprise-org-portal/backend`.

---

### Task 4: Root Directory Cleanup, Scripts, and Verification

**Files:**
- Delete: obsolete root `frontend/` directory
- Create: root `README.md`
- Create: root `start-website.sh`
- Create: root `start-portal.sh`

**Step-by-step:**
- [ ] Safely remove obsolete root `frontend/` directory.
- [ ] Create root `README.md` clearly documenting Product 1 (`dps-junior-website`) and Product 2 (`enterprise-org-portal`), local launch commands, and Cloudflare Pages / Render deployment instructions.
- [ ] Add simple helper scripts (`start-website.sh` and `start-portal.sh`) for single-command local development.
- [ ] Run verification tests on both products (`dps-junior-website` build and `enterprise-org-portal/frontend` build).
- [ ] Commit Task 4 and push to Git repository.

