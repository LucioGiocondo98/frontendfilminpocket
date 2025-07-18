import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

export default function CardGrid({ cards, selectedIds = [], onCardClick }) {
  if (!cards || cards.length === 0) {
    return (
      <p className="text-white text-center mt-4">
        Nessuna carta nella collezione
      </p>
    );
  }

  return (
    <Row className="g-3">
      {cards.map((card) => {
        const cardType = card.cardType?.toUpperCase();
        const isSelected = selectedIds.includes(card.id);
        const cardContent =
          cardType === "MOVIE" ? (
            <MovieCard card={card} />
          ) : (
            <PersonCard card={card} />
          );

        return (
          <Col key={card.id} xs={6} sm={6} md={6} lg={4} xl={3}>
            {onCardClick ? (
              <div
                className={`selectable-card ${isSelected ? "selected" : ""}`}
                onClick={() => onCardClick(card.id)}
                style={{ cursor: "pointer" }}
              >
                {cardContent}
              </div>
            ) : (
              <Link to={`/cards/${card.id}`} style={{ textDecoration: "none" }}>
                {cardContent}
              </Link>
            )}
          </Col>
        );
      })}
    </Row>
  );
}
