import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

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
    <Container fluid className="text-center mt-4">
      <Row className="justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4} xl={3} className="position-relative">
          {/* Pacchetto */}
          <Image src="/kendrick.webp" alt="Pacchetto" fluid rounded />

          {/* Badge dei ticket */}
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

      {/* Bottone sotto (metà larghezza pacchetto) */}
      <Row className="justify-content-center mt-3">
        <Col xs={6} sm={5} md={3} lg={2}>
          <Button
            variant="warning"
            className="w-100"
            size="lg"
            disabled={filmTickets === 0}
          >
            APRI PACCHETTO
          </Button>
        </Col>
      </Row>

      {/* Timer ricarica */}
      <Row className="mt-3">
        <Col>
          {filmTickets === 0 && nextRecharge && (
            <div className="text-light">Prossima ricarica tra: {timeLeft}</div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
