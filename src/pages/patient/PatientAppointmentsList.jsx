import { useNavigate } from "react-router-dom";
export function PatientAppointmentsList() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("medicabinet_user");
    navigate("/login");
  };
  return (
    <div style={{ padding: "40px" }}>
      <h1>Patient Appointments</h1>
      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
