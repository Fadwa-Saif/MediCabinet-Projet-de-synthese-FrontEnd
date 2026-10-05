# MediCabinet — Frontend

React application for managing a medical cabinet, with separate interfaces for **patients**, **doctors** and **secretaries**: appointments, consultations, medical records, lab analyses and prescriptions.

Backend repository: [MediCabinet-Projet-de-synthese-BackEnd](https://github.com/Fadwa-Saif/MediCabinet-Projet-de-synthese-BackEnd) (Laravel 11 + JWT)

<!-- Add screenshots or a GIF of the app here, plus a live demo link if you have one -->
<!-- 🔗 Live demo: ADD_LINK -->

---

##  Features

**Patients**
- Browse doctors and book appointments
- View consultation history and details
- Upload and view medical analyses
- View prescriptions and manage their profile

**Doctors**
- Manage appointments and assigned patients
- Write consultation reports
- Generate medical attestations (PDF)
- View patient medical records and analyses

**Secretaries**
- Add, edit and view patient records
- Schedule and manage appointments

**Shared**
- JWT authentication with role-based protected routes
- Multi-language support
- PDF generation for reports and attestations
- Responsive UI with accessible components

## Tech stack

| | |
|---|---|
| UI | React 18, React Router 7 |
| Styling | Tailwind CSS, Radix UI, Lucide icons |
| HTTP | Axios (with request/response interceptors) |
| PDF | html2canvas, jsPDF |
| Dates | React Day Picker |

##  Getting started

**Prerequisites:** Node.js and npm, and the [backend API](https://github.com/Fadwa-Saif/MediCabinet-Projet-de-synthese-BackEnd) running locally.

```bash
# 1. Clone and install
git clone https://github.com/Fadwa-Saif/MediCabinet-Projet-de-synthese-FrontEnd.git
cd MediCabinet-Projet-de-synthese-FrontEnd
npm install

# 2. Environment
cp .env.example .env
# set the backend URL in .env:
# REACT_APP_API_URL=http://localhost:8000/api

# 3. Run
npm start
# → http://localhost:3000
```

Make sure the frontend's origin is allowed in the backend's `config/cors.php`.

### Scripts

| Command | What it does |
|---|---|
| `npm start` | Development server with hot reload |
| `npm run build` | Production build in `build/` |
| `npm test` | Test runner |

##  Authentication & roles

1. The user logs in through `authService`; the backend returns a JWT.
2. The token is stored in `localStorage` and attached to every request by an Axios interceptor.
3. `ProtectedRoute` checks the token and the required role before rendering a page.

| Role | Routes |
|---|---|
| `patient` | `/patient/*` |
| `doctor` | `/doctor/*` |
| `secretary` | `/secretary/*` |
| public | `/login`, `/inscription` |

```jsx
<Route
  path="/patient/dashboard"
  element={
    <ProtectedRoute requiredRole="patient">
      <PatientDashboard />
    </ProtectedRoute>
  }
/>
```

## 📁 Project structure

```
src/
├── api/            # Axios instance + interceptors
├── auth/pages/     # Login, registration
├── components/     # Navbar, ProtectedRoute, shared components
├── context/        # LanguageContext
├── pages/
│   ├── doctor/
│   ├── patient/
│   ├── secretary/
│   └── shared/
├── services/       # API endpoints (api.js) and authService.js
└── App.jsx         # Routing
```

## 🎓 About

Built by [Fadwa Saif](https://github.com/Fadwa-Saif) as part of the full-stack web development program at OFPPT/ISGI (projet de synthèse).
Portfolio: [fadwasaif.vercel.app](https://fadwasaif.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/fadwa-saif-a7280922b)
