import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import ToastMessage from "./ToastMessage";
import CardGrid from "./CardGrid";
import "../styles/DeckBuilder.css";

const DeckBuilder = () => {
  const { accessToken } = useAuth();
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    fetch("http://localhost:8080/cards/collection", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dati ricevuti:", data);
        if (Array.isArray(data.content)) {
          setCards(data.content);
        } else {
          console.error("La risposta non contiene un array di card:", data);
          setCards([]);
        }
      })
      .catch((err) => console.error("Errore nel fetch delle carte", err));
  }, [accessToken]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSaveDeck = () => {
    const body = {
      name: "Mazzo Personalizzato",
      cardIds: selected,
    };

    console.log("Deck da salvare:", body);

    fetch("http://localhost:8080/decks", {
      // FIX se serve: aggiungi /api se configurato
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore creazione mazzo");
        return res.json();
      })
      .then(() => {
        setToast({
          show: true,
          message: "Mazzo creato con successo!",
          variant: "success",
        });
        setSelected([]);
      })
      .catch((err) => {
        setToast({ show: true, message: err.message, variant: "danger" });
      });
  };

  return (
    <>
      <CardGrid
        cards={cards}
        selectedIds={selected}
        onCardClick={toggleSelect}
      />

      {cards.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <Button
            variant="success"
            onClick={handleSaveDeck}
            disabled={selected.length === 0}
          >
            Salva Mazzo
          </Button>
        </div>
      )}

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};

export default DeckBuilder;
