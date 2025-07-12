import { Container, Row, Col } from "react-bootstrap";
import SidebarFiltri from "../components/SidebarFiltri";
import CardGrid from "../components/CardGrid";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CollectionPage() {
  const { accessToken } = useAuth();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/cards/collection", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setCards(data.content)) // `.content` perché è una Page
      .catch((err) => console.error("Errore nel recupero carte", err));
  }, [accessToken]);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={2}>
          <SidebarFiltri />
        </Col>
        <Col xs={10}>
          <CardGrid cards={cards} />
        </Col>
      </Row>
    </Container>
  );
}
