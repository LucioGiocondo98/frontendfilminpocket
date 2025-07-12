import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

export default function AcquirePack() {
  const { accessToken } = useAuth();
  const [filmTickets, setFilmTickets] = useState(null);
  const [nextRecharge, setNextRecharge] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

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

  return (
    <Container fluid className="text-light mt-4">
      {/* Sezione Ticket a sinistra */}
      <Row>
        <Col xs={3} lg={5}>
          <div
            style={{
              backgroundColor: "#1f1f1f",
              border: "2px solid orange",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "orange",
            }}
          >
            <div>
              <i className="bi bi-ticket-detailed"></i>
            </div>
            <div>{filmTickets ?? "..."}</div>
          </div>
          <Row className="mt-3">
            <Col className="text-center">
              {filmTickets === 0 && nextRecharge && (
                <div>Next ticket in: {timeLeft}</div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Sezione pacchetto centrato */}
      <Row className="justify-content-center mt-4">
        <Col xs={8} lg={10}>
          <div className="text-center">
            <img
              src="/kendrick.webp"
              alt="Pacchetto"
              className="img-fluid rounded"
            />
          </div>
        </Col>
      </Row>

      {/* Bottone apertura pacco */}
      <Row className="justify-content-center mt-3">
        <Col xs={4}>
          <Button variant="warning" className="w-100" size="lg">
            AZIONE
          </Button>
        </Col>
      </Row>

      {/* Timer se necessario */}
    </Container>
  );
}
