import React, { useState, useEffect } from "react";
import Home from "./Home"; // Corrected path
import "../index.css"; // Corrected path

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // This line is the key: it applies the 'light' or 'dark' class to the body
    document.body.className = theme;
    // Save the user's preference in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // We pass the toggleTheme function down to the Home component
  return <Home toggleTheme={toggleTheme} theme={theme} />;
}

export default App;
