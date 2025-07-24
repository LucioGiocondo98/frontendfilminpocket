import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/AcquirePack.css";

const AcquirePack = function () {
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
        navigate("/pack-opening", { state: { cards: data } });
      })
      .catch((err) => console.error("Errore apertura pacco:", err));
  };

  return (
    <Container fluid className="text-light acquire-pack-wrapper">
      <Row className="justify-content-center  h-100 g-5">
        <Col
          xs={8}
          md={3}
          className="d-flex flex-column align-items-center justify-content-start"
        >
          <div className="ticket-box text-center">
            <div>
              <i className="bi bi-ticket-detailed ticket-icon"></i>
            </div>
            <div>{filmTickets ?? "..."}</div>
            {filmTickets === 0 && nextRecharge && (
              <div className="next-ticket-text">Next ticket in: {timeLeft}</div>
            )}
          </div>
        </Col>

        <Col xs={12} md={9} className="d-flex justify-content-center pb-5">
          <div className="pack-container floating-box pb-3">
            <img
              src="/PackFilmInPocket.png"
              alt="Pacchetto"
              className="img-fluid rounded cinematic-pack"
              onClick={handleOpenPack}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default AcquirePack;
