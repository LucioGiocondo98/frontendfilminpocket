import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import PersonCard from "../components/PersonCard";
import MovieCard from "../components/MovieCard";

export default function PackOpenedPage() {
  const location = useLocation();
  const cards = location.state?.cards || [];

  const renderCard = (card, index) => {
    const cardType = card.cardType?.toUpperCase();
    return (
      <Col xs={6} md={6} lg={4} xl={4} key={index} className="mb-4">
        {cardType === "MOVIE" ? (
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

      <Container className="pt-5 mt-5 pb-5">
        <Row className="justify-content-center">
          <Col xs="auto">
            <h2
              className="text-center mb-4"
              style={{
                fontFamily: "Lobster, cursive",
                color: "#F0C420",
                fontSize: "2.5rem",
              }}
            >
              Carte Estratte
            </h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {cards.length > 0 ? (
            cards.map(renderCard)
          ) : (
            <Col xs={12}>
              <p className="text-center">Nessuna carta trovata.</p>
            </Col>
          )}
        </Row>
      </Container>

      <BottomNavbar />
    </div>
  );
}
