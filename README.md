# JobConnect — Full-Stack Job & Internship Portal

A production-grade Full-Stack MERN Job & Internship Portal built with **React.js, Node.js, Express.js, MongoDB (Mongoose), JWT + bcrypt, Multer, Tailwind CSS, and Recharts**.

This project demonstrates end-to-end full-stack software engineering: Authentication, Role-Based Access Control (RBAC), database design, REST API architecture, search and filtering, resume file uploads, applicant tracking pipelines, and analytical dashboards.

---

## 🚀 Live Demo & Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database with Realistic Data
Pre-populates sample companies (Apex Labs, ABC Technologies, Razorpay, Swiggy), 3 verified demo accounts, realistic tech openings, sample PDF resumes, and candidate applications:
```bash
npm run seed
```

### 3. Run Both Backend & Frontend Simultaneously
Runs the Express.js REST API server (`port 5000`) and the Next.js/React frontend (`port 3000`) with a single command:
```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 🔑 Pre-Seeded Demo Accounts (1-Click Switch Available)

The portal includes an interactive **1-Click Quick Switch** in the left sidebar and auth modal so you can instantly experience all three role workspaces:

| Role | Name | Email | Password | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| 👩🎓 **Student** | Harshitha Reddy | `harshitha@example.com` | `password123` | Search jobs, apply, upload resume, track status pipeline, manage skills, bookmark jobs |
| 🏢 **Recruiter** | Priya Sharma (Apex Labs) | `recruiter@apexlabs.com` | `password123` | Post jobs, edit/delete jobs, view candidates, download PDF resumes, change pipeline status |
| 👨💼 **Admin** | Platform Admin | `admin@jobconnect.com` | `password123` | Platform analytics & charts, user moderation (suspend/delete), job moderation (flag/remove) |

*You can also click **"Sign In / Register"** in the top navigation to register custom student or recruiter accounts.*

---

## 🏛️ System Architecture

```
Frontend (React.js + Tailwind CSS + Recharts)
   │
   ▼
Axios Service Layer (with JWT Bearer Request Interceptor)
   │
   ▼ Next.js API Proxy Rewrites (/api/* → http://localhost:5000/api/*)
   │
Express.js REST API Server (Port 5000)
   ├── Middleware: JWT Auth, Role-Based Access Control (RBAC), Multer File Upload
   ├── Controllers: Auth, Jobs, Applications, Users, Companies, Admin
   │
   ▼
Database Layer
   ├── Mongoose Models: User, Job, Application, Company
   └── Seamless Dual-Store Adapter (MongoDB Atlas / local MongoDB with in-memory persistence fallback)
```

---

## ✨ Features by Role

### 👩🎓 1. Student / User Side
- **Authentication**: Register with role `student`, login with bcrypt-verified password, JWT token saved to localStorage.
- **Profile Management**: Update full name, headline, bio, phone, location, education history, and work experience.
- **Resume Upload & Download**: PDF / DOCX resume upload via Multer, stored in `/uploads/resumes/` with direct download/preview links.
- **Interactive Skills Manager**: View skill chips, remove skills, add custom skills, or choose from popular suggestions.
- **Job Search & Multi-Filter**:
  - Keyword search (title, company, description, skills)
  - Location filter (Bangalore, Hyderabad, Pune, Remote, etc.)
  - Job type filter (Full-time, Internship, Remote)
  - Tech skills matching filter
  - Salary / stipend display
- **Job Details View**: Sticky inspection panel with full overview, requirements, responsibilities, perks, and company information.
- **Job Application Flow**: Apply using profile resume or upload an alternate resume per application, plus cover note. Duplicate applications are blocked.
- **Application Tracking Pipeline**:
  - Live visual status stepper: `Applied` ➔ `Under Review` ➔ `Shortlisted` ➔ `Interview` ➔ `Selected` / `Rejected`
  - Displays recruiter notes and application timestamps.
  - Option to **Withdraw Application** with real-time applicant counter decrement.
- **Saved Bookmarks**: Bookmark jobs with 1-click and review them in the "Saved jobs" tab.

### 🏢 2. Recruiter Side
- **Company Profile**: Manage company name, website, industry, location, company size, and public overview.
- **Job Posting & Management**:
  - Create openings with title, company, location, employment type, salary/stipend range, skills, description, requirements, responsibilities, and perks.
  - Edit existing job postings.
  - Delete postings (cascades to clean up associated applications).
- **Candidate Pipeline & Applicant Review**:
  - Filter applicants by Job and by Status.
  - View applicant profile, education, skills match, and cover note.
  - **Download PDF Resumes** directly from the portal.
  - Advance or reject candidate statuses: `Under Review`, `Shortlist`, `Interview`, `Selected`, `Reject`.
  - Leave recruiter updates/notes visible to the candidate.
- **Recruiter Analytics (Recharts)**:
  - Bar Chart: Candidate response volume per active job.
  - Pie Chart: Candidate pipeline distribution across all statuses.

### 👨💼 3. Admin Side
- **Platform Health Analytics (Recharts)**:
  - Metric summary cards: Total Users, Students, Recruiters, Total Jobs, Active Jobs, Total Applications, Offer Conversion Rate.
  - Monthly Platform Growth Area Chart (Applications & Jobs over time).
  - Most Demanded Skills Horizontal Bar Chart.
- **User Management**:
  - List all platform users with role filter and live search.
  - Toggle user account status (`active` ⟷ `suspended`).
  - Delete abusive or spam accounts.
- **Job Moderation**:
  - View all job postings across all recruiters.
  - Flag inappropriate or fraudulent listings.
  - Permanently remove spam postings.

---

## 📡 REST API Specifications

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new student or recruiter |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Private | Get authenticated user profile & company |

### Jobs (`/api/jobs`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Public | Search & filter active jobs |
| `GET` | `/api/jobs/:id` | Public | Get single job with company details |
| `POST` | `/api/jobs` | Recruiter/Admin | Post a new job opening |
| `PUT` | `/api/jobs/:id` | Recruiter/Admin | Edit an existing job posting |
| `DELETE` | `/api/jobs/:id` | Recruiter/Admin | Delete a job posting |
| `GET` | `/api/jobs/recruiter/my-jobs` | Recruiter | Get all jobs posted by current recruiter |

### Applications (`/api/applications`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/applications` | Student | Submit job application (with resume upload) |
| `GET` | `/api/applications/my` | Student | Get all applications submitted by candidate |
| `GET` | `/api/applications/recruiter/all`| Recruiter/Admin | Get all applications across recruiter jobs |
| `GET` | `/api/applications/job/:jobId` | Recruiter/Admin | Get applicants for a specific job |
| `PUT` | `/api/applications/:id/status` | Recruiter/Admin | Update application status & feedback notes |
| `DELETE` | `/api/applications/:id` | Student/Admin | Withdraw an application |

### Users & Resumes (`/api/users`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users/profile` | Private | Fetch logged-in user profile |
| `PUT` | `/api/users/profile` | Private | Update headline, bio, skills, education |
| `POST` | `/api/users/resume` | Private | Upload resume file via Multer (`.pdf`, `.docx`) |
| `POST` | `/api/users/save-job/:id` | Student | Toggle save/bookmark job |
| `GET` | `/api/users/saved-jobs` | Student | Fetch all bookmarked jobs |

### Companies (`/api/companies`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/companies` | Public | List hiring companies & active job counts |
| `GET` | `/api/companies/:id` | Public | Get company profile and its active openings |
| `PUT` | `/api/companies/my` | Recruiter | Update recruiter's company profile |

### Admin Moderation (`/api/admin`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admin/stats` | Admin | Get platform KPIs & Recharts analytics data |
| `GET` | `/api/admin/users` | Admin | Get all users with role and search filters |
| `PUT` | `/api/admin/users/:id/status` | Admin | Toggle user active/suspended state |
| `DELETE` | `/api/admin/users/:id` | Admin | Permanently delete user and their records |
| `PUT` | `/api/admin/jobs/:id/moderate` | Admin | Flag or remove inappropriate job posting |

---

## 🗄️ Database Schemas (Mongoose)

### `User`
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['student', 'recruiter', 'admin'], default: 'student' },
  headline: String,
  bio: String,
  phone: String,
  location: String,
  skills: [String],
  resume: { filename: String, originalName: String, url: String, uploadedAt: Date },
  education: [{ degree: String, institution: String, year: String, grade: String }],
  experience: [{ title: String, company: String, duration: String, description: String }],
  savedJobs: [{ type: ObjectId, ref: 'Job' }],
  companyId: { type: ObjectId, ref: 'Company' },
  status: { type: String, enum: ['active', 'suspended'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
}
```

### `Job`
```javascript
{
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyId: { type: ObjectId, ref: 'Company' },
  recruiterId: { type: ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  requirements: [String],
  responsibilities: [String],
  perks: [String],
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-time', 'Internship', 'Part-time', 'Contract', 'Remote'] },
  experience: String,
  salary: { type: String, required: true },
  skills: [String],
  status: { type: String, enum: ['active', 'closed', 'flagged'], default: 'active' },
  applicantsCount: { type: Number, default: 0 },
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
}
```

### `Application`
```javascript
{
  jobId: { type: ObjectId, ref: 'Job', required: true },
  applicantId: { type: ObjectId, ref: 'User', required: true },
  recruiterId: { type: ObjectId, ref: 'User' },
  resume: { filename: String, originalName: String, url: String },
  coverNote: String,
  status: { 
    type: String, 
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Selected', 'Rejected'], 
    default: 'Applied' 
  },
  notes: String,
  appliedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

## 🎯 Resume & Interview Discussion Points

When discussing this project during technical interviews, highlight:
1. **Full-Stack Authentication & Security**:
   - Passwords hashed with `bcryptjs` using 10 salt rounds before storage.
   - Stateless JWT tokens signed with expiration and validated in Express middleware.
   - Axios request interceptor dynamically injects `Authorization: Bearer <token>` on every protected request.
2. **Role-Based Access Control (RBAC)**:
   - Middleware-level authorization enforcing student vs. recruiter vs. admin capabilities.
   - Route-level security preventing students from posting jobs or modifying other candidates' submissions.
3. **File Upload Architecture (Multer)**:
   - Multer middleware validates MIME types and file extensions (`.pdf`, `.doc`, `.docx`).
   - Limits file size to 5MB and stores files on disk with sanitized timestamped filenames.
   - Files are served statically with safe direct download URLs.
4. **Relational Modeling in NoSQL**:
   - Structured relationships between Users, Companies, Jobs, and Applications using ObjectId references.
   - Aggregate statistics calculated for dashboards (application pipelines, conversion rates, skill frequencies).
5. **Zero-Configuration Dual Persistence Layer**:
   - Supports genuine Mongoose schemas when connected to MongoDB Atlas or local MongoDB.
   - Seamlessly falls back to an in-memory/JSON store with an identical async API so reviewers can run the application instantly with zero external setup.

---

## 🛠️ Verification & Quality Checks

- **TypeScript Compilation**: `npm run typecheck` passes with **0 errors**.
- **ESLint Code Quality**: `npm run lint` passes with **0 errors**.
- **Production Build**: `npm run build` succeeds cleanly.
