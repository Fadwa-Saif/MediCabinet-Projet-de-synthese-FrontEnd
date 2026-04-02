import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Auth Pages
import { LoginPage } from "./auth/pages/LoginPage";
import { InscriptionPage } from "./auth/pages/InscriptionPage";

// Patient Pages
import { PatientDashboard } from "./pages/patient/PatientDashboard";
import { PatientAppointmentsList } from "./pages/patient/PatientAppointmentsList";
import { AppointmentBooking as PatientAppointmentBooking } from "./pages/patient/AppointmentBooking";
import { PatientConsultationsList } from "./pages/patient/PatientConsultationsList";
import { PatientUploadAnalysis } from "./pages/patient/PatientUploadAnalysis";

// Doctor Pages
import { DoctorDashboard } from "./pages/doctor/DoctorDashboard";
import { AppointmentBooking } from "./pages/doctor/AppointmentBooking";
import { ConsultationReportNew } from "./pages/doctor/ConsultationReportNew";
import { MedicalRecord } from "./pages/doctor/MedicalRecord";

// Secretary Pages
import { SecretaireDashboard } from "./pages/secretary/SecretaireDashboard";
import { SecretaryPatients } from "./pages/secretary/SecretaryPatients";
import { SecretaryAppointments } from "./pages/secretary/SecretaryAppointments";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Patient routes - protected, role: patient */}
          <Route
            path="/patient/dashboard"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/rendezvous"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientAppointmentsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/rendezvous/nouveau"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientAppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/consultations"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientConsultationsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/dossier"
            element={
              <ProtectedRoute requiredRole="patient">
                <MedicalRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient/analyses"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientUploadAnalysis />
              </ProtectedRoute>
            }
          />

          {/* Doctor (médecin) routes - protected, role: medecin */}
          <Route
            path="/medecin/dashboard"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/rapport/:rdvId"
            element={
              <ProtectedRoute requiredRole="medecin">
                <ConsultationReportNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/rendezvous"
            element={
              <ProtectedRoute requiredRole="medecin">
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />

          {/* Secretary (secrétaire) routes - protected, role: secretaire */}
          <Route
            path="/secretaire/dashboard"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaireDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secretaire/patients"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryPatients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secretaire/rendezvous"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryAppointments />
              </ProtectedRoute>
            }
          />

          {/* Catch-all - redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
