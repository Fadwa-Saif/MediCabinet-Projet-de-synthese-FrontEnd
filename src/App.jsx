import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";

// Auth Pages
import { LoginPage } from "./auth/pages/LoginPage";
import { InscriptionPage } from "./auth/pages/InscriptionPage";

// Patient Pages
import { PatientDashboard } from "./pages/patient/PatientDashboard";
import { PatientAppointmentsList } from "./pages/patient/PatientAppointmentsList";
import { AppointmentBooking as PatientAppointmentBooking } from "./pages/patient/AppointmentBooking";
import { PatientConsultationsList } from "./pages/patient/PatientConsultationsList";
import { PatientUploadAnalysis } from "./pages/patient/PatientUploadAnalysis";
import { PatientConsultationDetails } from "./pages/patient/PatientConsultationsDetails";
import { AnalysisDetails } from "./pages/patient/AnalysisDetails"; // ← new

// Doctor Pages
import { DoctorDashboard } from "./pages/doctor/DoctorDashboard";
import { AppointmentBooking } from "./pages/doctor/AppointmentBooking";
import { ConsultationReportNew } from "./pages/doctor/ConsultationReportNew";
import { DoctorPatients } from "./pages/doctor/DoctorPatients";
import { DoctorReports } from "./pages/doctor/DoctorReports";
import { MedicalRecord } from "./pages/doctor/MedicalRecord";
import { DoctorAnalysisDetails } from "./pages/doctor/DoctorAnalysisDetails";
import { DoctorAttestationNew } from "./pages/doctor/DoctorAttestationNew";
import { DoctorConsultationDetails } from "./pages/doctor/DoctorConsultationDetails";
import DoctorProfilePage from "./pages/doctor/profil";

// Secretary Pages
import { SecretaireDashboard } from "./pages/secretary/SecretaireDashboard";
import SecretaryPatients from "./pages/secretary/SecretaryPatientsList";
import { SecretaryAppointments } from "./pages/secretary/SecretaryAppointments";
import { SecretaryPatientDetail } from "./pages/secretary/SecretaryPatientDetail";
import { SecretaryPatientAdd } from "./pages/secretary/SecretaryPatientAdd";
import { SecretaryPatientEdit } from "./pages/secretary/SecretaryPatientEdit";
import { SecretaryAppointmentAdd } from "./pages/secretary/SecretaryAppointmentAdd";
import SecretaryProfilePage from "./pages/secretary/profil";
import PatientProfilePage from "./pages/patient/profil";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/inscription" element={<InscriptionPage />} />
          <Route
            path="/doctor/dashboard"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secretary/dashboard"
            element={
              <ProtectedRoute requiredRole="secretary">
                <SecretaireDashboard />
              </ProtectedRoute>
            }
          />

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
            path="/patient/rendezvous/modifier/:id"
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
            path="/patient/consultations/:id"
            element={<PatientConsultationDetails />}
          />
          <Route
            path="/patient/dossier"
            element={
              <ProtectedRoute requiredRole="patient">
                <MedicalRecord />
              </ProtectedRoute>
            }
          />

          {/* ── Analyses ──────────────────────────────────────────────── */}
          {/* Upload / pending list — must come BEFORE the :id route */}
          <Route
            path="/patient/analyses/upload"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientUploadAnalysis />
              </ProtectedRoute>
            }
          />
          {/* Detail page for a single analysis */}
          <Route
            path="/patient/analyses/:id"
            element={
              <ProtectedRoute requiredRole="patient">
                <AnalysisDetails />
              </ProtectedRoute>
            }
          />
          {/* Default analyses view */}
          <Route
            path="/patient/analyses"
            element={
              <ProtectedRoute requiredRole="patient">
                <AnalysisDetails />
              </ProtectedRoute>
            }
          />

          {/* Doctor (médecin) routes - protected, role: medecin */}
          {/* Patient profile */}
          <Route
            path="/patient/profil"
            element={
              <ProtectedRoute requiredRole="patient">
                <PatientProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/dashboard"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/rapport/patient/:patientId"
            element={
              <ProtectedRoute requiredRole="medecin">
                <ConsultationReportNew />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/rapport/new"
            element={
              <ProtectedRoute requiredRole="medecin">
                <ConsultationReportNew />
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
          <Route
            path="/medecin/patients"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorPatients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/rapports"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/medical-record/:patientId"
            element={
              <ProtectedRoute requiredRole="medecin">
                <MedicalRecord />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/consultations/:id"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorConsultationDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/analyses/:id"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorAnalysisDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medecin/attestation"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorAttestationNew />
              </ProtectedRoute>
            }
          />

          {/* Secretary (secrétaire) routes - protected, role: secretaire */}
          {/* Doctor profile */}
          <Route
            path="/medecin/profil"
            element={
              <ProtectedRoute requiredRole="medecin">
                <DoctorProfilePage />
              </ProtectedRoute>
            }
          />
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
            path="/secretaire/patients/nouveau"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryPatientAdd />
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
            path="/secretaire/rendezvous/nouveau"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryAppointmentAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secretaire/patients/:patientId"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryPatientDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/secretaire/patients/:patientId/modifier"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryPatientEdit />
              </ProtectedRoute>
            }
          />

          {/* Catch-all - redirect to login */}
          {/* Secretary profile */}
          <Route
            path="/secretaire/profil"
            element={
              <ProtectedRoute requiredRole="secretaire">
                <SecretaryProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
