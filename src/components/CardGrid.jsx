import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

export default function CardGrid({ cards }) {
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
        return (
          <Col key={card.id} xs={6} sm={6} md={6} lg={4} xl={3}>
            <Link to={`/cards/${card.id}`} style={{ textDecoration: "none" }}>
              {cardType === "MOVIE" ? (
                <MovieCard card={card} />
              ) : (
                <PersonCard card={card} />
              )}
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}
