import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import CardForm from "../components/CardForm";
import ImageUpload from "../components/ImageUpload";
import CardPreview from "../components/CardPreview";
import ToastMessage from "../components/ToastMessage";
import API_URL from "../apiConfig";

const EditCardPage = () => {
  const { accessToken } = useAuth();
  const [inputId, setInputId] = useState("");
  const [formCard, setFormCard] = useState(null);
  const [cardType, setCardType] = useState("");
  const [filmographyInput, setFilmographyInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const handleFetch = () => {
    if (!inputId) return;
    fetch(`${API_URL}/cards/${inputId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Card non trovata");
        return res.json();
      })
      .then((data) => {
        setFormCard({
          ...data,
          imageUrl: data.imageUrl || "",
        });
        setCardType(data.cardType);
        setFilmographyInput((data.filmography || []).join(", "));
      })
      .catch((err) => {
        console.error(err);
        setFormCard(null);
        setToast({ show: true, message: err.message, variant: "danger" });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!formCard) return;
    if (name === "cardType") {
      setCardType(value);
    } else {
      setFormCard((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilmographyChange = (e) => {
    const value = e.target.value;
    setFilmographyInput(value);
    setFormCard((prev) => ({
      ...prev,
      filmography: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formCard || !inputId) return;

    const updatedCard = {
      ...formCard,
      cardType,
      imageUrl: formCard.imageUrl || "",
    };

    console.log("Dati da salvare:", updatedCard);

    fetch(`${API_URL}/cards/${inputId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore aggiornamento card");
        return res.json();
      })
      .then((data) => {
        if (imageFile) uploadImage(data.id);
        setToast({
          show: true,
          message: "Card aggiornata con successo!",
          variant: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        setToast({ show: true, message: err.message, variant: "danger" });
      });
  };

  const uploadImage = (id) => {
    const formDataImage = new FormData();
    formDataImage.append("image", imageFile);
    setUploading(true);

    fetch(`${API_URL}/cards/${id}/image`, {
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
      .then(() => console.log("Immagine aggiornata"))
      .catch(console.error)
      .finally(() => setUploading(false));
  };

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />
      <Container
        fluid
        className="flex-grow-1"
        style={{ padding: "2rem 1rem 100px" }}
      >
        <Row className="py-5">
          <Col md={5}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleFetch();
              }}
              className="mb-3"
            >
              <Form.Group>
                <Form.Label>ID della Card da modificare</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Inserisci ID"
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="warning" className="mt-2">
                Carica Card
              </Button>
            </Form>

            {formCard && (
              <Form onSubmit={handleSubmit}>
                <CardForm
                  cardType={cardType}
                  formData={formCard}
                  onChange={handleChange}
                  filmographyInput={filmographyInput}
                  onFilmographyChange={handleFilmographyChange}
                />
                <ImageUpload
                  imageFile={imageFile}
                  onImageChange={handleImageChange}
                  currentImageUrl={formCard.imageUrl}
                />
                <Button type="submit" variant="warning" className="mt-2">
                  {uploading ? (
                    <>
                      Caricamento... <Spinner animation="border" size="sm" />
                    </>
                  ) : (
                    "Aggiorna Card"
                  )}
                </Button>
              </Form>
            )}
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {formCard && (
              <CardPreview
                cardType={cardType}
                formData={formCard}
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
