import { useNavigate } from "react-router-dom";
export function SecretaryPatients() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "40px" }}>
      <h1>Patients Management</h1>
      <button
        onClick={() => {
          localStorage.removeItem("medicabinet_user");
          navigate("/login");
        }}
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
