// src/components/PackOpeningAnimation.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GiClapperboard } from "react-icons/gi";
import "../styles/PackOpeningAnimation.css";

const PackOpeningAnimation = function () {
  const navigate = useNavigate();
  const location = useLocation();
  const cards = location.state?.cards || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/pack-opened", { state: { cards } });
    }, 2500);
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
};
export default PackOpeningAnimation;
