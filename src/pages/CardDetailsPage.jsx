import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

export default function CardDetailsPage() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/cards/${id}`, {
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
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  if (!card) {
    return <Container className="text-white mt-5">Carta non trovata</Container>;
  }

  return (
    <div className="bg-dark min-vh-100 text-white d-flex flex-column">
      <TopNavbar />

      <Container className="flex-grow-1 pt-5 mt-3">
        <Row className="justify-content-center align-items-start g-4">
          {/* Immagine della Card */}
          <Col xs={10} md={4}>
            <Card className="overflow-hidden" style={{ borderRadius: "20px" }}>
              <Card.Img
                src={card.imageUrl}
                alt={card.name}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "400px",
                  objectFit: "contain",
                  backgroundColor: "black",
                  borderRadius: "20px",
                  padding: "10px",
                }}
              />
            </Card>
          </Col>

          {/* Dettagli della Card */}
          <Col xs={10} md={8}>
            <ul
              style={{
                listStyleType: "none",
                backgroundColor: "white",
                color: "black",
                borderRadius: "12px",
                padding: "1rem",
                fontFamily: "'Lobster', cursive",
              }}
            >
              <li>
                <strong>Nome:</strong> {card.name}
              </li>
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
          </Col>
        </Row>
      </Container>
      <div className="mt-2">
        <BottomNavbar />
      </div>
    </div>
  );
}
