import { Modal, Button, Row, Col, Form } from "react-bootstrap";
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
      show={show}
      onHide={onHide}
      animation={true}
      size="lg"
      centered
      dialogClassName="bg-dark text-light"
    >
      <Modal.Header closeButton className="bg-dark border-0">
        <Modal.Title className="text-warning">
          {editable ? deck.name || "Anteprima Mazzo" : deck.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark">
        {editable && (
          <Form.Control
            className="mb-3"
            placeholder="Nome del deck (almeno 3 caratteri)"
            value={deck.name}
            onChange={(e) => onDeckNameChange(e.target.value)}
          />
        )}
        <Row className="g-3">
          {deck.cards?.length > 0 ? (
            deck.cards.map((card) => {
              const isSelected = editable && selectedCardIds.includes(card.id);
              return (
                <Col key={card.id} xs={10} md={6} xl={4}>
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
                </Col>
              );
            })
          ) : (
            <p className="text-center text-muted">Nessuna carta nel mazzo</p>
          )}
        </Row>
      </Modal.Body>

      <Modal.Footer className="bg-dark border-0">
        {editable && (
          <Button variant="success" onClick={onSaveDeck}>
            {isEditMode ? "Salva Modifiche" : "Crea Mazzo"}
          </Button>
        )}
        <Button variant="secondary" onClick={onHide}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeckDetailsModal;
