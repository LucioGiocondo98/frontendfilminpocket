// DeckBuilder.jsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CardGrid from "../components/CardGrid";
import DeckSidebar from "../components/DeckSidebar";
import { useAuth } from "../context/AuthContext";

const DeckBuilder = () => {
  const { accessToken } = useAuth();
  const [mode, setMode] = useState(null);
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    if (mode === "create") {
      fetch("http://localhost:8080/cards/collection", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setCards(data.content || []))
        .catch(console.error);
    } else if (mode === "view") {
      fetch("http://localhost:8080/decks", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setDecks(data))
        .catch(console.error);
    }
  }, [mode, accessToken]);

  const handleCardClick = (cardId) => {
    setSelected((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSaveDeck = () => {
    const deck = {
      name: "Mazzo Personalizzato",
      cardIds: selected,
    };

    fetch("http://localhost:8080/decks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deck),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore salvataggio mazzo");
        return res.json();
      })
      .then(() => {
        setMode("view");
        setSelected([]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container fluid className="text-light pt-4">
      <Row>
        <Col md={4}>
          <DeckSidebar setMode={setMode} />
        </Col>
        <Col md={8}>
          {mode === "create" && (
            <>
              <h4>Seleziona le carte per il tuo mazzo</h4>
              <CardGrid
                cards={cards}
                onCardClick={handleCardClick}
                selectedCards={selected}
                mode="deck"
              />
              <div className="d-flex justify-content-end mt-3">
                <Button variant="success" onClick={handleSaveDeck}>
                  Salva Mazzo
                </Button>
              </div>
            </>
          )}

          {mode === "view" && (
            <>
              <h4>I tuoi Deck</h4>
              {decks.length === 0 ? (
                <p>Nessun mazzo disponibile</p>
              ) : (
                decks.map((deck) => (
                  <div
                    key={deck.id}
                    className="mb-3 border rounded p-3 bg-secondary"
                  >
                    <h5>{deck.name}</h5>
                    <small>{deck.cards?.length || 0} carte</small>
                  </div>
                ))
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DeckBuilder;
