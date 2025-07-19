// src/components/PackOpeningAnimation.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiClapperboard } from "react-icons/gi";
import "../styles/PackOpeningAnimation.css";

export default function PackOpeningAnimation() {
  const navigate = useNavigate();
  const location = useLocation();
  const cards = location.state?.cards || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/pack-opened", { state: { cards } });
    }, 2500); // ⏱️ durata animazione aggiornata
    return () => clearTimeout(timer);
  }, [navigate, cards]);

  return (
    <div className="ciak-animation-wrapper">
      <div className="ciak-icon">
        <GiClapperboard size={200} />
      </div>
      <div className="film-title">FilmInPocket</div>
      <div className="film-subtitle">Collectible Cards</div>
    </div>
  );
}
