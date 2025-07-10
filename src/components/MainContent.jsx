import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import TicketCounter from "./TicketCounter";
import { useAuth } from "../context/AuthContext";
import "../styles/HomePage.css";

const MainContent = () => {
  const { accessToken } = useAuth();
  const [tickets, setTickets] = useState(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    const token = localStorage.getItem("accessToken");
    console.log("Token JWT recuperato:", token);

    fetch("http://localhost:8080/users/me/tickets", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero ticket");
        return res.json();
      })
      .then((data) => {
        setTickets(data.filmTickets);
        setCountdown(data.nextRecharge);
      })
      .catch((err) =>
        console.error("Errore durante il recupero dei ticket:", err)
      );
  }, [accessToken]);

  return (
    <Container className="text-center py-4">
      <Row className="justify-content-center mb-3">
        <Col xs={6} md={4} className="card-pack-container">
          <div className="card-pack">🎬</div>

          {tickets > 0 ? (
            <Button className="mt-3 open-pack-button" variant="warning">
              Apri Pacchetto
            </Button>
          ) : (
            <div className="mt-3 text-muted">
              Ricarica ticket tra: {countdown || "Caricamento..."}
            </div>
          )}
        </Col>
      </Row>

      <Row className="justify-content-center mb-3">
        <Col xs="auto">
          <TicketCounter />
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
