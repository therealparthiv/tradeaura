import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/auth/profile")
      .then((res) => setUser(res.data.user))
      .catch(() => alert("Not logged in"));
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <p>
          Welcome, {user.name} ({user.email})
        </p>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default Profile;
