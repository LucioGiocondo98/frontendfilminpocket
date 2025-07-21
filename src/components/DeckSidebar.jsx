import { Button, Stack } from "react-bootstrap";

const DeckSidebar = ({
  accessToken,
  setMode,
  setCards,
  setUserDecks,
  setLoading,
  setError,
  resetUI,
}) => {
  const fetchDecks = () => {
    setLoading(true);
    fetch("http://localhost:8080/decks", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then(setUserDecks)
      .catch((err) => {
        console.error("Errore fetch deck:", err);
        setError("Impossibile caricare i deck.");
      })
      .finally(() => setLoading(false));
  };

  const fetchCards = () => {
    setLoading(true);
    fetch("http://localhost:8080/cards/collection?size=100", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => setCards(data.content || data))
      .catch((err) => {
        console.error("Errore fetch carte:", err);
        setError("Impossibile caricare le carte.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Stack gap={3} className="pt-4">
      <Button
        variant="outline-light bg-dark"
        className="rounded-pill py-3"
        onClick={() => {
          resetUI();
          setMode("create");
          fetchCards();
        }}
      >
        Crea Deck
      </Button>

      <Button
        variant="outline-light bg-dark"
        className="rounded-pill py-3"
        onClick={() => {
          resetUI();
          setMode("edit");
          fetchDecks();
        }}
      >
        Modifica Deck
      </Button>

      <Button
        variant="outline-light bg-dark"
        className="rounded-pill py-3"
        onClick={() => {
          resetUI();
          setMode("delete");
        }}
      >
        Elimina Deck
      </Button>

      <Button
        variant="outline-light bg-dark"
        className="rounded-pill py-3"
        onClick={() => {
          resetUI();
          setMode("view");
          fetchDecks();
        }}
      >
        I miei Deck
      </Button>
    </Stack>
  );
};

export default DeckSidebar;
