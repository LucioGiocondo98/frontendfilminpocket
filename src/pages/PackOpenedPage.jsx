import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import PersonCard from "../components/PersonCard";
import MovieCard from "../components/MovieCard";
import BottomNavbar from "../components/BottomNavbar";

export default function PackOpenedPage() {
  const location = useLocation();
  const cards = location.state?.cards || [];

  const renderCard = (card, index) => {
    return (
      <Col xs={12} sm={6} lg={4} xl={3} key={index} className="mb-4">
        {card.cardType === "MOVIE" ? (
          <MovieCard card={card} />
        ) : (
          <PersonCard card={card} />
        )}
      </Col>
    );
  };

  return (
    <div className="bg-dark min-vh-100 text-light">
      <TopNavbar />
      <Container className="pt-5 mt-5">
        <h2
          className="text-center mb-4"
          style={{ fontFamily: "Lobster, cursive", color: "orange" }}
        >
          Carte Estratte
        </h2>
        <Row className="justify-content-center">
          {cards.length > 0 ? (
            cards.map(renderCard)
          ) : (
            <p className="text-center">Nessuna carta trovata.</p>
          )}
        </Row>
      </Container>
      <BottomNavbar />
    </div>
  );
}
