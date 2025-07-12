import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Card,
  Modal,
} from "react-bootstrap";
import MovieCard from "./MovieCards";
import PersonCard from "./PersonCard";

export default function AcquirePack() {
  const { accessToken } = useAuth();
  const [filmTickets, setFilmTickets] = useState(null);
  const [nextRecharge, setNextRecharge] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [acquiredCards, setAcquiredCards] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/users/me/tickets", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero ticket");
        return res.json();
      })
      .then((data) => {
        setFilmTickets(data.filmTickets);
        setNextRecharge(data.nextTicketRechargeTime);
      })
      .catch((err) =>
        console.error("Errore durante il recupero dei ticket:", err)
      );
  }, [accessToken]);

  useEffect(() => {
    if (!nextRecharge) return;
    const interval = setInterval(() => {
      const now = new Date();
      const rechargeTime = new Date(nextRecharge);
      const diff = rechargeTime - now;

      if (diff <= 0) {
        setTimeLeft("Ticket ricaricati!");
        clearInterval(interval);
        setFilmTickets(2);
      } else {
        const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(
          2,
          "0"
        );
        const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(
          2,
          "0"
        );
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextRecharge]);

  const handleAcquirePack = () => {
    fetch("http://localhost:8080/me/acquire-pack", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore durante apertura pacchetto");
        return res.json();
      })
      .then((cards) => {
        setAcquiredCards(cards);
        setFilmTickets((prev) => prev - 1);
        setShowModal(true);
      })
      .catch((err) => {
        console.error("Errore apertura pacchetto:", err);
        alert("Errore: forse non hai abbastanza ticket!");
      });
  };

  return (
    <Container fluid className="text-center mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4} xl={3} className="position-relative">
          <Image src="/kendrick.webp" alt="Pacchetto" fluid rounded />

          {filmTickets !== null && (
            <div
              className="position-absolute"
              style={{
                top: "10px",
                right: "10px",
                backgroundColor: "#1f1f1f",
                border: "2px solid orange",
                borderRadius: "8px",
                padding: "4px 10px",
                color: "orange",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              🎟 {filmTickets}
            </div>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center mt-3">
        <Col xs={6} sm={5} md={3} lg={2}>
          <Button
            variant="warning"
            className="w-100"
            size="lg"
            disabled={filmTickets === 0}
            onClick={handleAcquirePack}
          >
            APRI PACCHETTO
          </Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          {filmTickets === 0 && nextRecharge && (
            <div className="text-light">Prossima ricarica tra: {timeLeft}</div>
          )}
        </Col>
      </Row>

      {/* Modal per mostrare le carte acquisite */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Hai trovato queste carte!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {acquiredCards.map((card, idx) => (
              <Col key={idx} xs={12} sm={6} md={4} lg={3} className="mb-4">
                {card.cardType === "MOVIE" ? (
                  <MovieCard card={card} />
                ) : (
                  <PersonCard card={card} />
                )}
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
