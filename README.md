# DPS Junior Public School & Enterprise Organization Platform

This repository hosts two distinct, decoupled products:

```text
school-project/
│
├── 🌐 dps-junior-website/          ──> [Product 1] Official Institutional Website
│   └── (Pure React 18 + Vite SPA, zero backend dependencies)
│
└── 🏢 enterprise-org-portal/        ──> [Product 2] Enterprise Management ERP Platform
    ├── frontend/                   ──> React 18 + Vite Management Client
    └── backend/                    ──> Spring Boot 3 + Supabase PostgreSQL REST API
```

---

## 🌐 Product 1: DPS Junior Public School Website

A fast, static institutional website designed for prospective parents, admissions, and public showcasing under CBSE standards.

### Key Features:
* **Academic Showcase:** Playgroup to Class VIII curriculum, philosophy, and campus life.
* **Admissions & Fee Schedule:** Transparent tuition breakdown table + one-click downloadable fee schedule PDF.
* **Instant Inquiries:** Form submission with structured **WhatsApp (`wa.me`)** prefill and direct Email dispatch.
* **Campus Photo Gallery:** Categorized photo grid with full-screen Lightbox modal.
* **Header Portal CTA:** Styled button linking directly to the Enterprise Management Portal.

### Local Development:
```bash
./start-website.sh
# or:
cd dps-junior-website && npm run dev
# Running on http://localhost:5173
```

### Production Deployment (Cloudflare Pages):
* **Root directory:** `dps-junior-website`
* **Framework:** `Vite`
* **Build command:** `npm run build`
* **Output directory:** `dist`

---

## 🏢 Product 2: Enterprise Organization Management Portal

A scalable, multi-role ERP management system designed for educational institutions and multi-unit organizations.

### Key Features:
* **Role-Based Access Control (RBAC):** Admin Console (`/admin`) and Staff/Teacher Console (`/teacher`).
* **Roster & Unit Management:** Classes, sections, student rosters, faculty directories.
* **Attendance Engine:** Daily attendance marking (Present, Absent, Late) with audit history.
* **Analytics & Reports:** Institutional attendance percentages, date range filters, and export capabilities.
* **Secure Core:** Stateless Spring Security JWT authentication connected to cloud PostgreSQL.

### Local Development:

#### 1. Frontend:
```bash
./start-portal.sh
# or:
cd enterprise-org-portal/frontend && npm run dev
# Running on http://localhost:5174
```

#### 2. Backend:
```bash
cd enterprise-org-portal/backend && mvn spring-boot:run
# Running on http://localhost:8080
```

### Production Deployment:
* **Backend:** Deployed via Docker on Render (`https://dps-junior-school.onrender.com`), connected to Supabase PostgreSQL (`aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres`).
* **Frontend:** Deployed to Cloudflare Pages:
  * **Root directory:** `enterprise-org-portal/frontend`
  * **Build command:** `npm run build`
  * **Output directory:** `dist`
  * **Environment variable:** `VITE_API_URL=https://dps-junior-school.onrender.com`

---

## Default Production Credentials:
* **Administrator:** `admin@school.com` / `admin123`
* **Faculty/Teacher:** `teacher@dpsjunior.edu.in` / `teacher123`
