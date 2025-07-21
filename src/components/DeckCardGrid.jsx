import { Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import "../styles/CardGrid.css"; // usa le stesse regole CSS di CardGrid

export default function DeckCardGrid({
  cards,
  selectedCardIds = [],
  onCardClick,
}) {
  if (!cards || cards.length === 0) {
    return (
      <p className="text-white text-center mt-4">Nessuna carta disponibile</p>
    );
  }

  return (
    <Row className="g-3" style={{ paddingBottom: "3rem" }}>
      {cards.map((card) => {
        const cardType = card.cardType?.toUpperCase();
        const isSelected = selectedCardIds.includes(card.id);

        const cardComponent =
          cardType === "MOVIE" ? (
            <MovieCard card={card} />
          ) : (
            <PersonCard card={card} />
          );

        return (
          <Col key={card.id} xs={6} sm={6} md={6} xl={4}>
            <div
              className={`selectable-card ${isSelected ? "selected" : ""}`}
              onClick={() => onCardClick(card.id)}
              style={{ cursor: "pointer" }}
            >
              {cardComponent}
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
