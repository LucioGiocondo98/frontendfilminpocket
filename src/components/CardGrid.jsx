import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import "../styles/CardGrid.css";

const CardGrid = function ({ cards, selectedCards = [], onCardClick, mode }) {
  if (!cards || cards.length === 0) {
    return (
      <p className="text-white text-center mt-4">
        Nessuna carta nella collezione
      </p>
    );
  }

  return (
    <Row
      className="g-3 justify-content-center"
      style={{ paddingBottom: "3rem" }}
    >
      {cards.map((card) => {
        const cardType = card.cardType?.toUpperCase();
        const isSelected = selectedCards.includes(card.id);

        const cardContent =
          cardType === "MOVIE" ? (
            <MovieCard card={card} />
          ) : (
            <PersonCard card={card} />
          );

        return (
          <Col key={card.id} xs={10} md={6} xl={4}>
            {onCardClick ? (
              <div
                className={`selectable-card ${
                  mode === "deck" && isSelected ? "selected" : ""
                }`}
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
};
export default CardGrid;
