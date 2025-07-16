import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import PersonCard from "../components/PersonCard";
import MovieCard from "../components/MovieCard";

export default function PackOpenedPage() {
  const location = useLocation();
  const cards = location.state?.cards || [];

  const [showCountdown, setShowCountdown] = useState(true);
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!showCountdown) return;

    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCountdown(false);
    }
  }, [count, showCountdown]);

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
        {showCountdown ? (
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "60vh" }}
          >
            <Col xs="auto">
              <h1
                className="text-center"
                style={{
                  fontSize: "10rem",
                  fontFamily: "Lobster, cursive",
                  color: "#d4a24d",
                  textShadow: "2px 2px 10px black",
                  transition: "all 0.5s ease-in-out",
                }}
              >
                {count}
              </h1>
            </Col>
          </Row>
        ) : (
          <>
            <Row className="justify-content-center">
              <Col xs="auto">
                <h2
                  className="text-center mb-4"
                  style={{
                    fontFamily: "Lobster, cursive",
                    color: "orange",
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
          </>
        )}
      </Container>

      <BottomNavbar />
    </div>
  );
}
