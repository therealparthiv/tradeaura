import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import "./Auth.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("/api/auth/profile")
      .then((res) => {
        setUser(res.data.user);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Not logged in");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            Loading user...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="error-message show">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Profile</h2>
        {user && (
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              Welcome, <strong>{user.name}</strong>
            </p>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
              {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
