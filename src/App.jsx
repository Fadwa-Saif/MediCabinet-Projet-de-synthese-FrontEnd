import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

// Auth Pages
import { LoginPage } from "./components/auth/LoginPage";
import { InscriptionPage } from "./components/auth/InscriptionPage";

// Patient Pages
import { PatientDashboard } from "./components/patient/PatientDashboard";
import { PatientAppointmentsList } from "./components/patient/PatientAppointmentsList";
import { PatientConsultationsList } from "./components/patient/PatientConsultationsList";
import { PatientUploadAnalysis } from "./components/patient/PatientUploadAnalysis";

// Doctor Pages
import { DoctorDashboard } from "./components/doctor/DoctorDashboard";
import { AppointmentBooking } from "./components/doctor/AppointmentBooking";
import { ConsultationReportNew } from "./components/doctor/ConsultationReportNew";
import { MedicalRecord } from "./components/doctor/MedicalRecord";

// Secretary Pages
import { SecretaireDashboard } from "./components/secretary/SecretaireDashboard";
import { SecretaryPatients } from "./components/secretary/SecretaryPatients";
import { SecretaryAppointments } from "./components/secretary/SecretaryAppointments";
import { SecretaryNotifications } from "./components/secretary/SecretaryNotifications";

export default function App() {
  return (
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
        <Route
          path="/secretaire/notifications"
          element={
            <ProtectedRoute requiredRole="secretaire">
              <SecretaryNotifications />
            </ProtectedRoute>
          }
        />

        {/* Catch-all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
