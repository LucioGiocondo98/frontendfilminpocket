/*import { useState } from "react";
import { Card } from "react-bootstrap";
import "../styles/CardFlip.css";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

export default function FlippableCard({ card, isMovie = true }) {
  const [flipped, setFlipped] = useState(false);
  const handleClick = () => setFlipped(!flipped);

  return (
    <div className="flip-card-container" onClick={handleClick}>
      <div className={`flip-card-inner ${flipped ? "flipped" : ""}`}>
        <div className="flip-card-front">
          <Card className="h-100 text-center bg-secondary text-light">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <Card.Title>🎬</Card.Title>
              <Card.Text>Clicca per scoprire</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="flip-card-back">
          {isMovie ? <MovieCard card={card} /> : <PersonCard card={card} />}
        </div>
      </div>
    </div>
  );
}
*/
