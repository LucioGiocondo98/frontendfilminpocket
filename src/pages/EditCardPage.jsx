import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import CardFetcherWithPreview from "../components/CardFetcherWithPreview";
import { useAuth } from "../context/AuthContext";

const EditCardPage = () => {
  const { accessToken } = useAuth();
  const [cardData, setCardData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!cardData) return;

    fetch(`http://localhost:8080/cards/${cardData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...cardData, ...updatedData }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore aggiornamento");
        return res.json();
      })
      .then((data) => {
        if (imageFile) uploadImage(data.id);
      })
      .catch(console.error);
  };

  const uploadImage = (id) => {
    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);
    setUploading(true);

    fetch(`http://localhost:8080/cards/${id}/image`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataImage,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore upload immagine");
        return res.json();
      })
      .then(console.log)
      .catch(console.error)
      .finally(() => setUploading(false));
  };

  const handleInputChange = (e) => {
    setUpdatedData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container fluid className="text-light">
      <TopNavbar />
      <Container className="py-4">
        <Row>
          <Col md={6}>
            <CardFetcherWithPreview onCardFetched={setCardData} />
            {cardData && (
              <Form onSubmit={handleUpdate} className="mt-4">
                <h5>Modifica Campi</h5>
                <Form.Group className="mb-2">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    name="name"
                    defaultValue={cardData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    name="description"
                    defaultValue={cardData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Immagine</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </Form.Group>
                <Button type="submit" variant="warning">
                  {uploading ? (
                    <>
                      Aggiornamento... <Spinner size="sm" />
                    </>
                  ) : (
                    "Salva Modifiche"
                  )}
                </Button>
              </Form>
            )}
          </Col>
          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {/* Preview già inclusa in CardFetcherWithPreview */}
          </Col>
        </Row>
      </Container>
      <BottomNavbar />
    </Container>
  );
};

export default EditCardPage;
