// src/pages/WelcomePage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = () => {
      navigate("/login");
    };
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [navigate]);

  return (
    <div className="welcome-fullscreen">
      <img src="/Logo.png" alt="FilmInPocket Logo" className="welcome-logo" />
      <p className="welcome-touch-text">Tocca ovunque per continuare</p>
    </div>
  );
}
