import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import GeneralContext from "./GeneralContext";

const Home = ({ toggleTheme, theme }) => {
  const { authStatus } = useContext(GeneralContext);

  // This check is crucial. It prevents the dashboard from trying to render
  // and fetch data before we know the user is logged in.
  if (authStatus === "PENDING") {
    return <div className="loading-fullscreen">Authenticating...</div>;
  }

  // If the authentication check fails, redirect to the login page.
  if (authStatus === "LOGGED_OUT") {
    window.location.href = "http://localhost:3000/login";
    return null; // Render nothing while the redirect happens.
  }

  // Only render the full dashboard UI if authentication is successful.
  return (
    <>
      <TopBar toggleTheme={toggleTheme} theme={theme} />
      <Dashboard />
    </>
  );
};

export default Home;
