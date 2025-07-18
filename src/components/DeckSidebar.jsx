import { Button, Stack } from "react-bootstrap";

const DeckSidebar = ({ setMode }) => {
  return (
    <Stack gap={3} className="pt-4">
      <Button
        variant="outline-light"
        className="rounded-pill py-3"
        onClick={() => setMode("create")}
      >
        Crea Deck
      </Button>
      <Button
        variant="outline-light"
        className="rounded-pill py-3"
        onClick={() => setMode("edit")}
      >
        Modifica Deck
      </Button>
      <Button
        variant="outline-light"
        className="rounded-pill py-3"
        onClick={() => setMode("delete")}
      >
        Elimina Deck
      </Button>
      <Button
        variant="outline-light"
        className="rounded-pill py-3"
        onClick={() => setMode("view")}
      >
        I miei Deck
      </Button>
    </Stack>
  );
};

export default DeckSidebar;
