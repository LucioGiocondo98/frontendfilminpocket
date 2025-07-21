import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import DeckSidebar from "../components/DeckSidebar";
import DeckCardGrid from "../components/DeckCardGrid";
import ToastMessage from "../components/ToastMessage";

const DeckBuilder = () => {
  const { accessToken } = useAuth();

  const [mode, setMode] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDecks, setUserDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [editingDeck, setEditingDeck] = useState(null);
  const [userCollection, setUserCollection] = useState([]);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    if (mode === "edit" || mode === "view" || mode === "delete") {
      fetch("http://localhost:8080/decks", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((data) => setUserDecks(data))
        .catch((err) => {
          console.error("Errore fetch deck:", err);
          setError("Impossibile caricare i deck.");
        });
    }
  }, [mode, accessToken]);

  const handleCardClick = (cardId) => {
    setSelectedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleSaveDeck = () => {
    if (!deckName.trim()) {
      alert("Inserisci un nome per il mazzo.");
      return;
    }
    if (selectedCards.length === 0) {
      alert("Seleziona almeno una carta.");
      return;
    }

    const deckData = {
      name: deckName,
      cardIds: selectedCards,
    };

    const method = editingDeck ? "PUT" : "POST";
    const endpoint = editingDeck
      ? `http://localhost:8080/decks/${editingDeck.id}`
      : "http://localhost:8080/decks";

    fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deckData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel salvataggio del mazzo");
        return res.json();
      })
      .then((data) => {
        setToast({
          show: true,
          message: `Mazzo \"${data.name}\" ${editingDeck ? "modificato" : "creato"} con successo!`,
          variant: "success",
        });
        setDeckName("");
        setSelectedCards([]);
        setEditingDeck(null);
        setMode("view");
      })
      .catch((err) => {
        console.error("Errore salvataggio mazzo:", err);
        setToast({
          show: true,
          message: "Errore durante il salvataggio del mazzo.",
          variant: "danger",
        });
      });
  };

  const handleDeleteDeck = (deckId) => {
    fetch(`http://localhost:8080/decks/${deckId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore eliminazione mazzo");
        setUserDecks((prev) => prev.filter((d) => d.id !== deckId));
        setToast({
          show: true,
          message: "Mazzo eliminato con successo!",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("Errore eliminazione:", err);
        setToast({
          show: true,
          message: "Errore durante l'eliminazione del mazzo.",
          variant: "danger",
        });
      });
  };

  return (
    <Container fluid className="text-light mt-4">
      <Row>
        <Col md={4}>
          {($1 || (mode === "edit" && editingDeck)) && (
            <>
              {editingDeck ? (
              <h4 className="mb-3 text-warning">Modifica mazzo: "{deckName}"</h4>
            ) : (
              <h4 className="mb-3">Crea un nuovo mazzo</h4>
            )}
              <Form.Control
                className="mb-3"
                placeholder="Nome del mazzo"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
              <Button
                variant="success"
                className="mb-4"
                onClick={handleSaveDeck}
              >
                Salva Mazzo
              </Button>
            </>
          )}
          <>
            <h4 className="mb-3">Seleziona card dal tuo deck da aggiungere</h4>
            <Form.Control
              className="mb-3"
              placeholder="Nome del mazzo"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
            />
            <Button
              variant="success"
              className="mb-4"
              onClick={handleSaveDeck}
            >
              Salva {editingDeck ? "Modifiche" : "Mazzo"}
            </Button>
            <DeckSidebar
            accessToken={accessToken}
            setMode={setMode}
            setCards={setCards}
            setUserDecks={setUserDecks}
            setLoading={setLoading}
            setError={setError}
            resetUI={() => {
              setDeckName("");
              setSelectedCards([]);
              setSelectedDeck(null);
              setEditingDeck(null);
              setError("");
            }}
          />
        </Col>

        <Col md={8}>
          <ToastMessage
            show={toast.show}
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast({ ...toast, show: false })}
          />

          {(mode === "create" || (mode === "edit" && editingDeck)) && (
            <DeckCardGrid
              cards={mode === "edit" ? userCollection : cards}
              selectedCardIds={selectedCards}
              onCardClick={handleCardClick}
            />
          )}

          {mode === "edit" && !editingDeck && (
            <>
              <h4 className="mb-3">Seleziona un mazzo da modificare</h4>
              {userDecks.map((deck) => (
                <div
                  key={deck.id}
                  className="mb-3 p-3 rounded"
                  style={{
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #444",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditingDeck(deck);
                    setDeckName(deck.name);
                    setSelectedCards(deck.cards.map((c) => c.id));
                    fetch("http://localhost:8080/cards/collection?size=100", {
                      headers: { Authorization: `Bearer ${accessToken}` },
                    })
                      .then((res) => res.json())
                      .then((data) => setUserCollection(data.content || data))
                      .catch(console.error);
                  }}
                >
                  <h5 className="text-warning mb-1">{deck.name}</h5>
                  <p className="text-light mb-2">
                    Carte contenute: {deck.cards.length}
                  </p>
                </div>
              ))}
            </>
          )}

          {mode === "view" && (
            <>
              <h4 className="mb-3">I miei Deck</h4>
              {userDecks.map((deck) => (
                <div
                  key={deck.id}
                  className="mb-3 p-3 rounded"
                  style={{
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #444",
                  }}
                >
                  <h5 className="text-warning mb-1">{deck.name}</h5>
                  <p className="text-light mb-2">
                    Carte contenute: {deck.cards.length}
                  </p>
                </div>
              ))}
            </>
          )}

          {mode === "delete" && (
            <>
              <h4 className="mb-3">Elimina un mazzo</h4>
              {userDecks.map((deck) => (
                <div
                  key={deck.id}
                  className="mb-3 p-3 rounded d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#1f1f1f", border: "1px solid #444" }}
                >
                  <div>
                    <h5 className="text-warning mb-1">{deck.name}</h5>
                    <p className="text-light mb-0">
                      Carte: {deck.cards.length}
                    </p>
                  </div>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteDeck(deck.id)}
                  >
                    Elimina
                  </Button>
                </div>
              ))}
            </>
          )}

          {mode === null && (
            <div className="text-center mt-5 text-secondary">
              <p>Seleziona un'opzione dal menu a sinistra.</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DeckBuilder;