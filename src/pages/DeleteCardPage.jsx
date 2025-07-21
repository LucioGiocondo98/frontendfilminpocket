import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import CardPreview from "../components/CardPreview";
import ToastMessage from "../components/ToastMessage";
import { useAuth } from "../context/AuthContext";

const DeleteCardPage = () => {
  const { accessToken } = useAuth();
  const [inputId, setInputId] = useState("");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleFetch = () => {
    if (!inputId) return;
    fetch(`http://localhost:8080/cards/${inputId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Card non trovata");
        return res.json();
      })
      .then((data) => setCardToDelete(data))
      .catch((err) => {
        console.error(err);
        setCardToDelete(null);
        setToast({
          show: true,
          message: err.message || "Errore",
          variant: "danger",
        });
      });
  };

  const handleDelete = () => {
    if (!inputId) return;
    fetch(`http://localhost:8080/cards/${inputId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore eliminazione");
        setToast({
          show: true,
          message: "Carta eliminata con successo!",
          variant: "success",
        });
        setCardToDelete(null);
        setInputId("");
      })
      .catch((err) => {
        console.error(err);
        setToast({
          show: true,
          message: err.message || "Errore",
          variant: "danger",
        });
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />
      <Container
        fluid
        className="flex-grow-1"
        style={{ padding: "2rem 1rem 100px" }}
      >
        <Row>
          <Col xs={12} md={5}>
            <Form
              className="mb-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleFetch();
              }}
            >
              <Form.Group>
                <Form.Label>ID della Card</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Inserisci ID"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="info" className="mt-2">
                Carica Card
              </Button>
            </Form>

            {cardToDelete && (
              <Button variant="danger" className="mt-2" onClick={handleDelete}>
                Elimina Card
              </Button>
            )}
          </Col>

          <Col
            xs={12}
            className="d-flex align-items-center justify-content-center mt-3"
          >
            {cardToDelete && (
              <CardPreview
                cardType={cardToDelete.cardType}
                formData={cardToDelete}
                imageFile={cardToDelete.imageFile}
              />
            )}
          </Col>
        </Row>
      </Container>
      <BottomNavbar />
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default DeleteCardPage;
