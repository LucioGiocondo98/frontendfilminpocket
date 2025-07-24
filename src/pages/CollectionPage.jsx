import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SidebarFiltri from "../components/SidebarFiltri";
import CardGrid from "../components/CardGrid";
import { useAuth } from "../context/AuthContext";
import BottomNavbar from "../components/BottomNavbar";
import TopNavbar from "../components/TopNavbar";
import API_URL from "../apiConfig";

export default function CollectionPage() {
  const { accessToken, user } = useAuth();
  console.log("Acces token in Collection Page: ", accessToken);
  const [cards, setCards] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (!accessToken || !user) return;

    const params = new URLSearchParams();
    if (filters.rarity) params.append("rarity", filters.rarity);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.year) params.append("year", filters.year);
    if (filters.cardType) params.append("cardType", filters.cardType);
    params.append("size", 100);

    const endpoint =
      user.role === "ROLE_ADMIN"
        ? `${API_URL}/admin/filtered/cards?${params.toString()}`
        : `${API_URL}/cards/collection?${params.toString()}`;

    fetch(endpoint, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel recupero delle card");
        return res.json();
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        setCards(data.content || data);
      })
      .catch((err) => {
        console.error("Errore fetch carte:", err);
        setCards([]);
      });
  }, [filters, accessToken, user]);

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />
      <Container fluid className="my-5 pt-4">
        <Row className="pt-5">
          <Col xs={12} md={3} lg={2} className="mb-3">
            <SidebarFiltri onFilterChange={setFilters} />
          </Col>
          <Col xs={12} md={9} lg={10}>
            <CardGrid cards={cards} />
          </Col>
        </Row>
        <BottomNavbar />
      </Container>
    </div>
  );
}
