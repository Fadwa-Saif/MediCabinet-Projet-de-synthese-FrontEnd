# MediCabinet Frontend

A React-based healthcare management system frontend that provides role-based access for patients, doctors, and secretaries. The application manages appointments, consultations, medical records, analysis, and prescriptions.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Authentication & Authorization](#authentication--authorization)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Key Features](#key-features)
- [Project Architecture](#project-architecture)

## Overview

MediCabinet is a comprehensive healthcare management solution designed to streamline interactions between patients, doctors, and administrative staff. The frontend application provides an intuitive interface for:

- **Patients**: Book appointments, view consultations, upload medical analysis, manage prescriptions
- **Doctors**: Manage patient appointments, write consultation reports, create medical attestations, view patient records
- **Secretaries**: Manage patient information, handle appointments, and administrative tasks

## Tech Stack

- **React 18.2.0** - UI framework
- **React Router 7.13.2** - Client-side routing
- **Tailwind CSS** - Styling framework
- **Radix UI** - Accessible component library
- **Lucide React** - Icon library
- **Axios** - HTTP client for API calls
- **html2canvas & jsPDF** - PDF generation capabilities
- **React Day Picker** - Date selection component

## Project Structure

```
src/
├── api/
│   └── axios.api.js          # Axios instance configuration with interceptors
├── auth/
│   └── pages/                # Authentication-related pages
│       ├── LoginPage.jsx
│       └── InscriptionPage.jsx
├── components/
│   ├── LabAnalysisFormViewer.jsx  # Component for viewing lab analysis forms
│   ├── Navbar.jsx                 # Navigation bar component
│   └── ProtectedRoute.jsx         # Route protection with role-based access control
├── context/
│   └── LanguageContext.jsx       # Multi-language support context
├── pages/
│   ├── doctor/               # Doctor-specific pages
│   │   ├── DoctorDashboard.jsx
│   │   ├── AppointmentBooking.jsx
│   │   ├── ConsultationReportNew.jsx
│   │   ├── DoctorPatients.jsx
│   │   ├── DoctorReports.jsx
│   │   ├── MedicalRecord.jsx
│   │   ├── DoctorAnalysisDetails.jsx
│   │   ├── DoctorAttestationNew.jsx
│   │   └── profil.jsx        # Doctor profile management
│   ├── patient/              # Patient-specific pages
│   │   ├── PatientDashboard.jsx
│   │   ├── PatientAppointmentsList.jsx
│   │   ├── AppointmentBooking.jsx
│   │   ├── PatientConsultationsList.jsx
│   │   ├── PatientUploadAnalysis.jsx
│   │   ├── PatientConsultationsDetails.jsx
│   │   ├── AnalysisDetails.jsx
│   │   └── profil.jsx        # Patient profile management
│   ├── secretary/            # Secretary/Administrative pages
│   │   ├── SecretaireDashboard.jsx
│   │   ├── SecretaryPatientsList.jsx
│   │   ├── SecretaryAppointments.jsx
│   │   ├── SecretaryPatientDetail.jsx
│   │   ├── SecretaryPatientAdd.jsx
│   │   ├── SecretaryPatientEdit.jsx
│   │   ├── SecretaryAppointmentAdd.jsx
│   │   └── profil.jsx        # Secretary profile management
│   └── shared/               # Shared pages accessible by multiple roles
├── services/
│   ├── api.js               # API service layer with endpoints
│   └── authService.js       # Authentication service
├── App.jsx                  # Main app component with routing configuration
├── index.js                 # React DOM rendering entry point
├── globals.css              # Global styles
└── reportWebVitals.js       # Performance monitoring
```

## How It Works

### 1. Authentication Flow

The application uses a token-based authentication system:

```
User Input (Login/Register)
        ↓
authService (credentials verification)
        ↓
Backend API (credentials validation)
        ↓
JWT Token Generated & Stored
        ↓
User Logged In & Redirected to Dashboard
```

**Key Points:**

- Credentials are sent to the backend via the `authService`
- JWT token is received and stored in localStorage
- Token is automatically included in all subsequent API requests via Axios interceptors

### 2. Role-Based Access Control (RBAC)

The `ProtectedRoute` component ensures that only authenticated users with the correct role can access specific routes.

**Roles:**

- `patient` - Patient dashboard and patient-specific features
- `doctor` - Doctor dashboard and clinical features
- `secretary` - Administrative dashboard and staff features

**Example Route Protection:**

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

### 3. API Communication

The application communicates with the backend API through:

- **axios.api.js** - Axios instance with:
  - Base URL configuration pointing to backend
  - Request interceptors (authentication token attachment)
  - Response interceptors (error handling)
- **services/api.js** - Centralized API endpoints for:
  - User authentication
  - Patient management
  - Appointment scheduling
  - Consultation records
  - Analysis & prescriptions

### 4. Data Flow

```
User Interaction (UI)
        ↓
Page Component (handles state & user actions)
        ↓
API Service (prepares request)
        ↓
Axios Instance (adds auth token & headers)
        ↓
Backend API
        ↓
Response → API Service → Page Component → UI Update
```

### 5. Navigation Flow

- **Public Routes**: `/login`, `/inscription`
- **Patient Routes**: `/patient/*` (appointments, consultations, analysis)
- **Doctor Routes**: `/doctor/*` (dashboard, reports, patients, attestations)
- **Secretary Routes**: `/secretary/*` (patient management, appointments)
- **Protected Routes**: All authenticated routes require valid token and correct role

## Authentication & Authorization

### Authentication Services (`authService.js`)

- `register(userData)` - Create new patient account
- `login(email, password, role)` - Authenticate user
- `logout()` - Clear session and token
- `getCurrentUser()` - Retrieve current user from token/storage

### Session Management

- Tokens stored in `localStorage`
- Automatic token refresh via interceptors
- Token validation on app initialization
- Logout clears token and redirects to login

### Protected Route Component

```jsx
<ProtectedRoute requiredRole="patient">
  <Component />
</ProtectedRoute>
```

Checks:

1. User is authenticated (valid token)
2. User has required role
3. Redirects to login if unauthorized

## Getting Started

### Prerequisites

- Node.js 14+ and npm
- Backend API running (MediCabinet Backend)
- Internet connection for initial dependencies installation

### Installation

1. Navigate to the frontend directory:

```bash
cd medicabinet_projet_frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file (if needed) with backend API URL:

```
REACT_APP_API_URL=http://localhost:8000/api
```

4. Start the development server:

```bash
npm start
```

The application will open at `http://localhost:3000`

### Backend Setup

Ensure the backend API is running on the configured URL. See [Backend README](../MediCabinet-Projet-de-synthese-BackEnd/README.md) for backend setup instructions.

## Available Scripts

### Development

```bash
npm start
```

Runs the app in development mode with hot reload.

- Open [http://localhost:3000](http://localhost:3000) to view in browser
- Page will reload when files are changed

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

- Bundles React with production optimizations
- Minifies and caches code for optimal performance

### Testing

```bash
npm test
```

Launches the test runner in interactive watch mode.

### Eject

```bash
npm run eject
```

**Note:** This is a one-way operation. Once you eject, you can't go back!

## Key Features

### Patient Features

- 📅 Browse and book appointments with doctors
- 📋 View consultation history and details
- 📊 Upload and view medical analysis
- 💊 View and manage prescriptions
- 👤 Manage profile information

### Doctor Features

- 📅 Manage patient appointments
- 📝 Create consultation reports
- 📑 Generate medical attestations
- 📊 View patient medical records and analysis
- 👥 Browse and manage patient list
- 👤 Update profile information

### Secretary Features

- 👥 Complete patient information management (add, edit, view)
- 📅 Manage appointment scheduling
- 📋 Administrative oversight of all system activities
- 👤 Manage profile information

### Shared Features

- 🌍 Multi-language support (Language Context)
- 🔐 Secure JWT authentication
- 📱 Responsive design with Tailwind CSS
- ♿ Accessible UI components (Radix UI)
- 📄 PDF generation for reports and attestations
- 🎨 Modern, clean user interface

## Project Architecture

### Component Hierarchy

```
App (Router Configuration)
├── LanguageProvider (Context Provider)
│   └── Routes
│       ├── Public Routes (Login, Registration)
│       ├── Patient Routes
│       │   ├── ProtectedRoute
│       │   │   └── PatientDashboard, etc.
│       ├── Doctor Routes
│       │   ├── ProtectedRoute
│       │   │   └── DoctorDashboard, etc.
│       └── Secretary Routes
│           ├── ProtectedRoute
│           │   └── SecretaireDashboard, etc.
```

### State Management

- **Local Component State** - For form inputs and UI state
- **Context API** - For language/locale management
- **LocalStorage** - For authentication tokens
- **URL Params** - For routing and pagination

### API Integration Pattern

1. **Page Component** calls service function
2. **Service Layer** (api.js) formats request
3. **Axios Instance** adds headers and token
4. **Backend** processes and responds
5. **Service** handles response or error
6. **Component** updates UI with data or error message

## Build Output

The `build-output.txt` file contains information about the latest production build size and recommendations.

## Configuration Files

- **package.json** - Dependencies and scripts
- **tailwind.config.js** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration for Tailwind
- **sonar-project.properties** - SonarQube analysis configuration

## Development Tips

1. **Token Debugging** - Check browser DevTools → Storage → localStorage for auth token
2. **API Issues** - Check Network tab in DevTools to see API requests/responses
3. **Console Errors** - Open DevTools → Console to see any runtime errors
4. **Component Testing** - Use React DevTools browser extension for component inspection

## Troubleshooting

### Cannot log in

- Ensure backend API is running and accessible
- Check network tab in DevTools for API responses
- Verify credentials are correct

### Blank page after login

- Check role configuration matches route requirements
- Verify token is stored in localStorage
- Check browser console for errors

### Styling issues

- Clear browser cache (Ctrl+Shift+Delete)
- Rebuild: `npm run build`
- Ensure Tailwind CSS is properly compiled

## Support & Contribution

For issues, feature requests, or contributions, please refer to the project's issue tracker or contact the development team.

---

**Last Updated:** April 2026
**Version:** 0.1.0
