import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/AcquirePack.css";

export default function AcquirePack() {
  const { accessToken } = useAuth();
  const [filmTickets, setFilmTickets] = useState(null);
  const [nextRecharge, setNextRecharge] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();
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

  const handleOpenPack = () => {
    fetch("http://localhost:8080/me/acquire-pack", {
      method: "POST",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'apertura del pacco");
        return res.json();
      })
      .then((data) => {
        console.log("Carte estratte:", data);
        setFilmTickets((prev) => prev - 1);
        navigate("/pack-opened", { state: { cards: data } });
      })
      .catch((err) => console.error("Errore apertura pacco:", err));
  };

  return (
    <Container fluid className="text-light">
      {/* Sezione Ticket a sinistra */}
      <Row>
        <Col xs={3} lg={3}>
          <div className="ticket-box">
            <div>
              <i className="bi bi-ticket-detailed ticket-icon"></i>
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

      {/* Sezione pacchetto centrato con animazione */}
      <Row className="justify-content-center mt-4">
        <Col xs={8} lg={10}>
          <div className="text-center floating-box pack-container">
            <img
              src="/PackFilmInPocket.png"
              alt="Pacchetto"
              className="img-fluid rounded cinematic-pack"
              style={{ cursor: "pointer" }}
              onClick={handleOpenPack}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
