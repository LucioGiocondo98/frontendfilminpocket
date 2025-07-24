import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import "../styles/Card.css";
import API_URL from "../apiConfig";

export default function CardDetailsPage() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBorderStyle = (rarity) => {
    switch (rarity) {
      case "COMMON":
        return "3px solid white";
      case "RARE":
        return "3px solid silver";
      case "EPIC":
        return "3px solid gold";
      default:
        return "1px solid gray";
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/cards/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento");
        return res.json();
      })
      .then((data) => setCard(data))
      .catch((err) => console.error("Errore:", err))
      .finally(() => setLoading(false));
  }, [id, accessToken]);

  if (loading) {
    return (
      <Container className="text-center mt-5 text-white">
        <Spinner animation="border" variant="warning" />
      </Container>
    );
  }

  if (!card) {
    return <Container className="text-white mt-5">Carta non trovata</Container>;
  }

  return (
    <div className="min-vh-100 text-white d-flex flex-column py-5">
      <TopNavbar />

      <Container className="flex-grow-1 pt-3 mt-3 vh-80 pb-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card
              style={{
                borderRadius: "20px",
                backgroundColor: "#1a1a1a",
                color: "black",
                fontFamily: "'Lobster', cursive",
                border: getBorderStyle(card.rarity),
              }}
            >
              {card.imageUrl && (
                <Card.Img
                  src={card.imageUrl}
                  alt={card.name}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  style={{
                    width: isFullscreen ? "85vw" : "100%",
                    height: isFullscreen ? "85vh" : "auto",
                    objectFit: "contain",
                    backgroundColor: "black",
                    borderRadius: isFullscreen ? "12px" : "20px",
                    padding: isFullscreen ? "10px" : "0",
                    position: isFullscreen ? "fixed" : "static",
                    top: isFullscreen ? "50%" : "auto",
                    left: isFullscreen ? "50%" : "auto",
                    transform: isFullscreen ? "translate(-50%, -50%)" : "none",
                    zIndex: isFullscreen ? 9999 : "auto",
                    cursor: "pointer",
                  }}
                />
              )}

              <Card.Body>
                <Card.Title
                  className="text-center mb-4"
                  style={{
                    fontSize: "2rem",
                    color: "#ffc107",
                    textShadow: "1px 1px 2px black",
                    backgroundColor: "#1a1a1a",
                    padding: "0.5rem",
                    borderRadius: "8px",
                  }}
                >
                  {card.name}
                </Card.Title>

                <ul
                  style={{
                    listStyleType: "none",
                    padding: "1rem",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <li>
                    <strong>Descrizione:</strong> {card.description}
                  </li>

                  {"releaseYear" in card && (
                    <li>
                      <strong>Anno di uscita:</strong> {card.releaseYear}
                    </li>
                  )}

                  {"directorName" in card && (
                    <li>
                      <strong>Regista:</strong> {card.directorName}
                    </li>
                  )}

                  {"genre" in card && (
                    <li>
                      <strong>Genere:</strong> {card.genre}
                    </li>
                  )}

                  {"bornDate" in card && (
                    <li>
                      <strong>Data di nascita:</strong> {card.bornDate}
                    </li>
                  )}

                  {"filmography" in card && (
                    <li>
                      <strong>Filmografia:</strong>
                      <ul style={{ paddingLeft: "1rem" }}>
                        {Array.isArray(card.filmography) ? (
                          card.filmography.map((film, index) => (
                            <li key={index}>{film}</li>
                          ))
                        ) : (
                          <li>{card.filmography}</li>
                        )}
                      </ul>
                    </li>
                  )}
                </ul>
              </Card.Body>
              <div className={`card-rarity-badge ${card.rarity.toLowerCase()}`}>
                {card.rarity}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className="mt-2" style={{ zIndex: isFullscreen ? 1 : "auto" }}>
        <BottomNavbar />
      </div>
    </div>
  );
}
