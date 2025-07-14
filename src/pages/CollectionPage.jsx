import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarFiltri from "../components/SidebarFiltri";
import CardGrid from "../components/CardGrid";
import { useAuth } from "../context/AuthContext";

export default function CollectionPage() {
  const { accessToken } = useAuth();
  console.log("Acces token in Collection Page: ", accessToken); // ✅ PRIMA DI QUALSIASI USO
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!accessToken) return;

    const params = new URLSearchParams();
    if (filters.rarity) params.append("rarity", filters.rarity);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.year) params.append("year", filters.year);
    if (filters.cardType) params.append("cardType", filters.cardType);
    params.append("size", 100);

    fetch(`http://localhost:8080/cards/collection?${params.toString()}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero delle card");
        return res.json();
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        setCards(data.content);
      })
      .catch((err) => {
        console.error("Errore fetch carte:", err);
        setCards([]);
      });
  }, [filters, accessToken]);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col xs={12} md={3} lg={2} className="mb-3">
          <SidebarFiltri onFilterChange={setFilters} />
        </Col>
        <Col xs={12} md={9} lg={10}>
          <CardGrid cards={cards} />
        </Col>
      </Row>
    </Container>
  );
}
