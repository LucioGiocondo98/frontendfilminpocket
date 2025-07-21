{
  /*import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

const CardFetcherWithPreview = ({ onCardFetched }) => {
  const { accessToken } = useAuth();
  const [cardId, setCardId] = useState("");
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCard = () => {
    setLoading(true);
    fetch(`http://localhost:8080/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Card non trovata");
        return res.json();
      })
      .then((data) => {
        setCard(data);
        onCardFetched(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Carta non trovata o errore nel server.");
        setCard(null);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>ID della Card</Form.Label>
        <Form.Control
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
        />
      </Form.Group>
      <Button variant="info" onClick={fetchCard} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Carica Card"}
      </Button>
      {error && <div className="text-danger mt-2">{error}</div>}
      <div className="mt-4">
        {card && card.cardType === "MOVIE" && <MovieCard card={card} />}
        {card &&
          (card.cardType === "ACTOR" || card.cardType === "DIRECTOR") && (
            <PersonCard card={card} />
          )}
      </div>
    </>
  );
};

export default CardFetcherWithPreview;
*/
}
