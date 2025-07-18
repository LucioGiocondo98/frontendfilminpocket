import { useState } from "react";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import CardPreview from "../components/CardPreview";
import ToastMessage from "../components/ToastMessage";
import { useAuth } from "../context/AuthContext";

const DeleteCardPage = () => {
  const { accessToken } = useAuth();
  const [cardToDelete, setCardToDelete] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleFetch = (id) => {
    if (!id) return;
    fetch(`http://localhost:8080/cards/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Card non trovata");
        return res.json();
      })
      .then((data) => setCardToDelete(data))
      .catch((err) => {
        console.error(err);
        setToast({
          show: true,
          message: err.message || "Errore",
          variant: "danger",
        });
      });
  };

  const handleDelete = () => {
    if (!cardToDelete) return;
    fetch(`http://localhost:8080/cards/${cardToDelete.id}`, {
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
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <TopNavbar />
      <Container
        fluid
        className="flex-grow-1"
        style={{ padding: "2rem 1rem 100px" }}
      >
        <Row>
          <Col md={6}>
            <Form className="mb-3">
              <Form.Group>
                <Form.Label>ID della Card</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci ID"
                  onChange={(e) => handleFetch(e.target.value)}
                />
              </Form.Group>
            </Form>

            {cardToDelete && (
              <Button variant="danger" className="mt-2" onClick={handleDelete}>
                Elimina Card
              </Button>
            )}
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {cardToDelete && (
              <CardPreview
                cardType={cardToDelete.cardType}
                formData={cardToDelete}
                imageFile={null}
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
