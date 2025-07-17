import { useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import CardFetcherWithPreview from "../components/CardFetcherWithPreview";
import { useAuth } from "../context/AuthContext";

const DeleteCardPage = () => {
  const { accessToken } = useAuth();
  const [cardToDelete, setCardToDelete] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleDelete = () => {
    if (!cardToDelete) return;
    fetch(`http://localhost:8080/cards/${cardToDelete.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore eliminazione");
        setSuccessMsg("Carta eliminata con successo.");
        setCardToDelete(null);
      })
      .catch(console.error);
  };

  return (
    <Container fluid className="text-light">
      <TopNavbar />
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <CardFetcherWithPreview onCardFetched={setCardToDelete} />
            {cardToDelete && (
              <Button variant="danger" className="mt-3" onClick={handleDelete}>
                Elimina Card
              </Button>
            )}
            {successMsg && (
              <Alert variant="success" className="mt-2">
                {successMsg}
              </Alert>
            )}
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {/* Preview inclusa in CardFetcherWithPreview */}
          </Col>
        </Row>
      </Container>
      <BottomNavbar />
    </Container>
  );
};

export default DeleteCardPage;
