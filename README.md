# 💊 MediCabinet Frontend

**React 18 Healthcare Management System**

> A comprehensive patient management interface for medical practices with appointment booking, consultations, and medical records management.

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Recent Features](#recent-features)
3. [Project Structure](#project-structure)
4. [Authentication](#authentication)
5. [Component Guide](#component-guide)
6. [Development](#development)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ & npm
- Backend API running at `http://127.0.0.1:8000/api`

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env file
echo "REACT_APP_API_URL=http://127.0.0.1:8000/api" > .env
echo "PORT=3001" >> .env

# 3. Start development server
npm start

# Application will open at http://localhost:3001
```

### Environment Variables
```env
REACT_APP_API_URL=http://127.0.0.1:8000/api
REACT_APP_GROQ_KEY=your_groq_api_key (optional, for chatbot)
PORT=3001
```

---

## ✨ Recent Features (2026-06-07)

### Patient-Doctor Assignment System

New functionality enabling patients to select doctors when booking appointments with automatic backend assignment:

#### **Features Added**:
- ✅ Doctor selection UI in appointment booking
- ✅ Display list of available doctors with profiles
- ✅ Auto-load and persist doctor selection
- ✅ Doctor dashboard filters assigned patients only
- ✅ Secretary dashboard shows cabinet patients

#### **Modified Components**:
```
✓ src/pages/patient/AppointmentBooking.jsx    (NEW: Doctor selection)
✓ src/pages/doctor/DoctorPatients.jsx         (MODIFIED: Uses /mes-patients endpoint)
  (No changes: SecretaryPatientsList.jsx)     (Backend filtering handles access)
```

#### **New Frontend Behavior**:
1. Patient opens appointment booking page
2. Frontend fetches `GET /api/medecins` (all doctors)
3. Patient selects doctor from grid of cards
4. Selected doctor shown in form summary
5. Upon submit, appointment includes `admin_id`
6. Backend auto-assigns patient to doctor

**→ See [../PATIENT_DOCTOR_ASSIGNMENT_README.md](../PATIENT_DOCTOR_ASSIGNMENT_README.md) for full details**

---

## 📁 Project Structure

```
src/
├── api/
│   └── axios.api.js                    # Axios instance & interceptors
├── auth/
│   ├── pages/
│   │   ├── LoginPage.jsx
│   │   └── InscriptionPage.jsx
│   └── ProtectedRoute.jsx              # Role-based route protection
├── components/
│   ├── Navbar.jsx                      # Navigation bar
│   ├── ProtectedRoute.jsx
│   ├── LabAnalysisFormViewer.jsx
│   └── ChatBot.jsx                     # AI assistant
├── context/
│   └── AuthContext.jsx                 # Auth state management
├── pages/
│   ├── LandingPage.jsx                 # Public home page
│   ├── patient/
│   │   ├── AppointmentBooking.jsx      (MODIFIED: Doctor selection)
│   │   ├── PatientDashboard.jsx
│   │   ├── PatientAppointmentsList.jsx
│   │   ├── PatientConsultationsList.jsx
│   │   ├── ConsultationDetails.jsx
│   │   └── ...
│   ├── doctor/
│   │   ├── DoctorDashboard.jsx
│   │   ├── DoctorPatients.jsx          (MODIFIED: /mes-patients endpoint)
│   │   ├── MedicalRecord.jsx
│   │   ├── DoctorConsultationDetails.jsx
│   │   └── ...
│   ├── secretary/
│   │   ├── SecretaryDashboard.jsx
│   │   ├── SecretaryPatientsList.jsx   (No changes needed)
│   │   ├── SecretaryPatientAdd.jsx
│   │   └── ...
│   └── shared/
│       └── ChatBot.jsx
├── services/
│   ├── api.js                          # API service wrapper
│   └── photoUrl.js                     # Photo URL normalization
├── App.jsx                             # Main app component
├── index.js                            # Entry point
└── globals.css                         # Global styles (Tailwind)
```

---

## 🔐 Authentication

### Login Flow
```
1. User enters email & password
2. Frontend sends POST /api/auth/login
3. Backend returns JWT token + user data
4. Frontend stores in localStorage:
   - token
   - medicabinet_user (full user object)
5. Subsequent requests include Authorization: Bearer {token}
```

### Token Management
```javascript
// All API requests automatically include Authorization header
import api from '../../services/api';

// Token is attached to every request
const response = await api.get('/endpoint');  // Bearer token included
```

### Role-Based Access
- **Routes Protected**: Use `<ProtectedRoute>` wrapper
- **Roles**: `patient`, `medecin`, `secretaire`
- **Fallback**: Redirect to login if unauthorized

---

## 👥 User Roles & Features

### Patient
- **Dashboard**: View upcoming appointments & consultations
- **Appointments**: Book with doctors, view history
- **Consultations**: View details & download reports
- **Medical Records**: Upload analyses, view prescriptions
- **Profile**: Update personal & medical information

### Doctor (Medecin)
- **Dashboard**: Statistics & recent patients
- **Patients**: View **assigned** patients only (`/mes-patients`)
- **Appointments**: Manage consultations & time slots
- **Consultations**: Write reports, prescriptions, analysis orders
- **Medical Records**: Create attestations, view patient history

### Secretary (Secretaire)
- **Dashboard**: Appointment management
- **Patients**: Create, edit, manage (within cabinet)
- **Appointments**: Schedule on behalf of doctors
- **Admin**: Manage doctor availability

---

## 🎯 Component Guide

### Key Components

#### `AppointmentBooking.jsx`
**Purpose**: Patient appointment booking and editing interface
**New Features** (2026-06-07):
- Doctor selection grid
- Fetches `GET /api/medecins` on mount
- Doctor cards show: photo, name, matricule, biography
- Auto-selects first doctor
- Displays selected doctor in summary
- Supports edit mode for existing appointments

**Props**: None (uses URL params for edit mode)
**Route**: `/patient/appointments/new` or `/patient/appointments/{id}`

```jsx
<AppointmentBooking />
```

#### `DoctorPatients.jsx`
**Purpose**: Doctor's patient list interface
**Modified** (2026-06-07):
- Changed API endpoint from `/patients` → `/mes-patients`
- Shows only assigned patients
- Maintains search functionality

**State**:
- `patients[]`: Doctor's assigned patients
- `selectedPatientId`: Currently selected patient
- `loading`, `error`: UI states

#### `Navbar.jsx`
**Purpose**: Main navigation component
**Props**: 
- `userRole`: "patient" | "medecin" | "secretaire"
- `pageTitle`: string

---

## 📊 API Integration

### Key Endpoints Used

```javascript
// Doctor selection
GET  /api/medecins                   // AppointmentBooking

// Patient lists
GET  /api/patients                   // Secretary/Doctor list
GET  /api/mes-patients               // Doctor's assigned patients

// Appointments
POST /api/rendezvous                 // Create with auto-assignment
PATCH /api/rendezvous/{id}           // Update own pending appointment
GET  /api/rendezvous                 // List appointments
GET  /api/rendezvous/{id}            // Appointment details

// Profile
GET  /api/auth/me                    // Current user
PUT  /api/profil                     // Update profile
POST /api/profil/photo               // Upload avatar
```

### API Service (`src/services/api.js`)

```javascript
import api from '../../services/api';

// GET
const response = await api.get('/endpoint');

// POST
const response = await api.post('/endpoint', data);

// PATCH
const response = await api.patch('/endpoint', data);

// DELETE
const response = await api.delete('/endpoint');
```

---

## 🛠 Development

### Available Scripts

```bash
# Start development server
npm start
# Runs on http://localhost:3001

# Build for production
npm run build
# Output in build/ folder

# Run tests
npm test

# Eject configuration (irreversible)
npm eject
```

### Key Technologies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2.0 | UI framework |
| react-router | 7.13.2 | Client-side routing |
| tailwindcss | 3.x | Styling |
| axios | 1.x | HTTP requests |
| jspdf | 2.x | PDF generation |
| html2canvas | 1.x | Screenshot to canvas |

### Development Tips

**API Debugging**:
```javascript
// Enable request/response logging
console.log('Request:', config);
console.log('Response:', response);
```

**Component Testing**:
```bash
# Run with verbose output
npm test -- --verbose
```

**Local Development**:
```bash
# Ensure backend is running
php artisan serve

# In separate terminal
npm start
```

---

## 🎨 Styling

### Tailwind CSS
All components use Tailwind CSS utility classes. Key color scheme:

```css
/* Primary Colors */
--primary: #1e40af        /* Blue */
--surface: #ffffff        /* White */
--surface-container: #f3f4f6  /* Light gray */

/* Status Colors */
--success: #10b981        /* Green */
--error: #ef4444          /* Red */
--warning: #f59e0b        /* Amber */
```

### Icons
Using `material-symbols-outlined` from Material Design:

```jsx
<span className="material-symbols-outlined">calendar_month</span>
```

---

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, scaled up for desktop
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- **Grid System**: Tailwind grid with responsive columns

---

## 🔒 Security Considerations

✅ **JWT Authentication**: All requests require valid token
✅ **Protected Routes**: Unauthorized users redirected to login
✅ **CORS Configured**: Backend allows frontend domain
✅ **Token Storage**: Stored in localStorage (accessible via JS)
✅ **Input Validation**: Forms validate before submission
✅ **Error Handling**: API errors returned user-friendly messages

### ⚠️ Known Security Notes
- Chatbot API key exposed client-side (should be proxied)
- JWT stored in localStorage (XSS vulnerability if compromised)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti :3001 | xargs kill -9

# Or change port in .env
PORT=3002 npm start
```

### CORS Errors
```bash
# Ensure backend CORS allows frontend URL
# In backend config/cors.php, add:
'allowed_origins' => ['http://localhost:3001']
```

### API Connection Failed
```bash
# Check backend is running
curl http://127.0.0.1:8000/api/stats

# Verify API_URL in .env
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

### Token Expired
```javascript
// Auto-refresh with refresh endpoint
POST /api/auth/refresh
// Returns new token
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router Guide](https://reactrouter.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Backend API Docs](../MediCabinet-Projet-de-synthese-BackEnd/README.md)

---

## 👥 Team & Contributing

**Last Updated**: 2026-06-07
**Version**: 2.1.0
**Status**: 🟢 Active Development

### Recent Changes
- ✅ Added Doctor Selection in Appointment Booking (2026-06-07)
- ✅ Modified Doctor Dashboard to Use `/mes-patients`
- ✅ Integrated Patient-Doctor Assignment Feature

---

**For Backend Setup**: See [../MediCabinet-Projet-de-synthese-BackEnd/README.md](../MediCabinet-Projet-de-synthese-BackEnd/README.md)
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
