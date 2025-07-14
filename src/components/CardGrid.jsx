import { Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

export default function CardGrid({ cards }) {
  if (!cards || cards.length === 0) {
    return (
      <p className="text-white text-center">Nessuna carta nella collezione</p>
    );
  }

  return (
    <Row className="justify-content-start">
      {cards.map((card) => {
        const cardType = card.cardType?.toUpperCase();
        return (
          <Col key={card.id} xs={6} md={4} lg={3} xl={2} className="mb-4">
            {cardType === "MOVIE" ? (
              <MovieCard card={card} />
            ) : (
              <PersonCard card={card} />
            )}
          </Col>
        );
      })}
    </Row>
  );
}
