import { Modal, Button, Grid, TextInput } from "@mantine/core";
import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";
import "../styles/CardGrid.css";

const DeckDetailsModal = ({
  show,
  onHide,
  deck,
  editable = false,
  selectedCardIds = [],
  onCardToggle,
  onSaveDeck,
  isEditMode = false,
  onDeckNameChange = () => {},
}) => {
  if (!deck) return null;

  return (
    <Modal
      opened={show}
      onClose={onHide}
      size="lg"
      centered
      title={
        <span className="text-warning">
          {editable ? deck.name || "Anteprima Mazzo" : deck.name}
        </span>
      }
      classNames={{
        content: "bg-dark text-light",
        header: "bg-dark",
        body: "bg-dark",
      }}
    >
      {editable && (
        <TextInput
          mb="md"
          placeholder="Nome del deck (almeno 3 caratteri)"
          value={deck.name}
          onChange={(e) => onDeckNameChange(e.target.value)}
        />
      )}
      <Grid gutter="md">
        {deck.cards?.length > 0 ? (
          deck.cards.map((card) => {
            const isSelected = editable && selectedCardIds.includes(card.id);
            return (
              <Grid.Col key={card.id} span={{ base: 10, md: 6, xl: 4 }}>
                <div
                  className={`selectable-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => editable && onCardToggle(card.id)}
                  style={{
                    cursor: editable ? "pointer" : "default",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      minHeight: "320px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {card.cardType === "MOVIE" ? (
                      <MovieCard card={card} />
                    ) : (
                      <PersonCard card={card} />
                    )}
                  </div>
                </div>
              </Grid.Col>
            );
          })
        ) : (
          <p className="text-center text-muted">Nessuna carta nel mazzo</p>
        )}
      </Grid>

      <div className="d-flex justify-content-end gap-2 mt-3">
        {editable && (
          <Button color="green" onClick={onSaveDeck}>
            {isEditMode ? "Salva Modifiche" : "Crea Mazzo"}
          </Button>
        )}
        <Button color="gray" onClick={onHide}>
          Chiudi
        </Button>
      </div>
    </Modal>
  );
};

export default DeckDetailsModal;
