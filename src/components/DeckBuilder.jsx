import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import DeckSidebar from "../components/DeckSidebar";
import DeckDetailsModal from "../components/DeckDetailsModal";
import ToastMessage from "../components/ToastMessage";
import API_URL from "../apiConfig";

const DeckBuilder = () => {
  const { accessToken } = useAuth();

  const [mode, setMode] = useState(null);
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDecks, setUserDecks] = useState([]);
  const [editingDeck, setEditingDeck] = useState(null);
  const [userCollection, setUserCollection] = useState([]);
  const [modalDeck, setModalDeck] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    if (["edit", "view", "delete"].includes(mode)) {
      fetch(`${API_URL}/decks`, {
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
    if (!deckName.trim()) return alert("Inserisci un nome per il mazzo.");
    if (selectedCards.length === 0) return alert("Seleziona almeno una carta.");

    const deckData = { name: deckName, cardIds: selectedCards };
    const method = editingDeck ? "PUT" : "POST";
    const endpoint = editingDeck
      ? `${API_URL}/decks/${editingDeck.id}`
      : `${API_URL}/decks`;

    fetch(endpoint, {
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deckData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel salvataggio del deck");
        return res.json();
      })
      .then((data) => {
        setToast({
          show: true,
          message: `Deck "${data.name}" ${
            editingDeck ? "modificato" : "creato"
          } con successo!`,
          variant: "success",
        });
        handleCloseModal();
        setMode("view");
      })
      .catch((err) => {
        console.error("Errore salvataggio mazzo:", err);
        setToast({
          show: true,
          message: "Errore durante il salvataggio del deck.",
          variant: "danger",
        });
      });
  };

  const handleDeleteDeck = (deckId) => {
    fetch(`${API_URL}/decks/${deckId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore eliminazione mazzo");
        setUserDecks((prev) => prev.filter((d) => d.id !== deckId));
        setToast({
          show: true,
          message: "Deck eliminato con successo!",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("Errore eliminazione:", err);
        setToast({
          show: true,
          message: "Errore durante l'eliminazione del deck.",
          variant: "danger",
        });
      });
  };

  const handleCloseModal = () => {
    setEditingDeck(null);
    setDeckName("");
    setSelectedCards([]);
    setModalDeck(null);
    setMode(null);
  };

  return (
    <Container fluid className="text-light mt-4">
      <Row className="py-3">
        <Col md={4}>
          <DeckSidebar
            accessToken={accessToken}
            setMode={setMode}
            setCards={setCards}
            setUserDecks={setUserDecks}
            setLoading={setLoading}
            setError={setError}
            resetUI={handleCloseModal}
          />
        </Col>

        <Col md={8}>
          <ToastMessage
            show={toast.show}
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast({ ...toast, show: false })}
          />

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
                    cursor: "pointer",
                  }}
                  onClick={() => setModalDeck({ ...deck, editable: false })}
                >
                  <h5 className="text-warning mb-1">{deck.name}</h5>
                  <p className="text-light mb-2">
                    Carte contenute: {deck.cards.length}
                  </p>
                </div>
              ))}
            </>
          )}

          {mode === "edit" && !editingDeck && (
            <>
              <h4 className="mb-3">Seleziona deck da modificare</h4>
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
                    fetch("${API_URL}/cards/collection?size=100", {
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

          {mode === "delete" && (
            <>
              <h4 className="mb-3">Elimina un mazzo</h4>
              {userDecks.map((deck) => (
                <div
                  key={deck.id}
                  className="mb-3 p-3 rounded d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: "#1f1f1f",
                    border: "1px solid #444",
                  }}
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

          {(mode === "create" || (mode === "edit" && editingDeck)) && (
            <DeckDetailsModal
              show={true}
              onHide={handleCloseModal}
              deck={{
                name: deckName,
                cards: mode === "edit" ? userCollection : cards,
              }}
              editable={true}
              selectedCardIds={selectedCards}
              onCardToggle={handleCardClick}
              onSaveDeck={handleSaveDeck}
              isEditMode={!!editingDeck}
              onDeckNameChange={setDeckName}
            />
          )}

          {modalDeck && !modalDeck.editable && (
            <DeckDetailsModal
              show={true}
              onHide={handleCloseModal}
              deck={modalDeck}
              editable={false}
            />
          )}

          {mode === null && (
            <div className="text-center mt-5 text-warning">
              <h3>Seleziona un'opzione dal menu.</h3>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DeckBuilder;
