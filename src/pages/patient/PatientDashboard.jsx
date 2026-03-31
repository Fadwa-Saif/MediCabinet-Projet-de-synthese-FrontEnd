import { useNavigate } from "react-router-dom";

export function PatientDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("medicabinet_user");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Patient Dashboard</h1>
      <p>Welcome to your patient dashboard</p>
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
