import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import CardForm from "../components/CardForm";
import ImageUpload from "../components/ImageUpload";
import CardPreview from "../components/CardPreview";
import ToastMessage from "../components/ToastMessage";

const EditCardPage = () => {
  const { accessToken } = useAuth();
  const [cardData, setCardData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilmographyChange = (e) => {
    const value = e.target.value;
    setUpdatedData((prev) => ({
      ...prev,
      filmography: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!cardData) return;

    const payload = {
      ...cardData,
      ...updatedData,
    };

    fetch(`http://localhost:8080/cards/${cardData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore aggiornamento");
        return res.json();
      })
      .then((data) => {
        if (imageFile) {
          uploadImage(data.id);
        } else {
          setToast({
            show: true,
            message: "Card aggiornata con successo!",
            variant: "success",
          });
        }
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
      .then(() => {
        setToast({
          show: true,
          message: "Card aggiornata e immagine caricata!",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        setToast({
          show: true,
          message: err.message || "Errore",
          variant: "danger",
        });
      })
      .finally(() => setUploading(false));
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
            <Form onSubmit={handleUpdate} className="mt-4">
              <h5>Modifica una card esistente (inserisci ID)</h5>
              <Form.Group className="mb-3">
                <Form.Label>ID della Card</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci ID"
                  onChange={(e) => {
                    const id = e.target.value;
                    if (id) {
                      fetch(`http://localhost:8080/cards/${id}`, {
                        headers: { Authorization: `Bearer ${accessToken}` },
                      })
                        .then((res) => {
                          if (!res.ok) throw new Error("Card non trovata");
                          return res.json();
                        })
                        .then((data) => setCardData(data))
                        .catch(console.error);
                    }
                  }}
                />
              </Form.Group>
              {cardData && (
                <>
                  <CardForm
                    cardType={cardData.cardType}
                    formData={{ ...cardData, ...updatedData }}
                    onChange={handleInputChange}
                    filmographyInput={(
                      updatedData.filmography || cardData.filmography
                    )?.join(", ")}
                    onFilmographyChange={handleFilmographyChange}
                  />
                  <ImageUpload
                    imageFile={imageFile}
                    onImageChange={handleImageChange}
                  />
                  <Button type="submit" variant="warning" className="mt-2">
                    {uploading ? (
                      <>
                        Aggiornamento...{" "}
                        <Spinner animation="border" size="sm" />
                      </>
                    ) : (
                      "Salva Modifiche"
                    )}
                  </Button>
                </>
              )}
            </Form>
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {cardData && (
              <CardPreview
                cardType={cardData.cardType}
                formData={{ ...cardData, ...updatedData }}
                imageFile={imageFile}
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

export default EditCardPage;
