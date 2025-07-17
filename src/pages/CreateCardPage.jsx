// CreateCardPage.jsx
import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import PersonCard from "../components/PersonCard";
import MovieCard from "../components/MovieCard";

const CreateCardPage = () => {
  const { accessToken } = useAuth();
  const [cardType, setCardType] = useState("MOVIE");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rarity: "COMMON",
    releaseYear: "",
    genre: "",
    directorName: "",
    bornDate: "",
    filmography: [],
  });
  const [filmographyInput, setFilmographyInput] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      rarity: "COMMON",
      releaseYear: "",
      genre: "",
      directorName: "",
      bornDate: "",
      filmography: [],
    });
    setFilmographyInput("");
    setImageFile(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilmographyChange = (e) => {
    const value = e.target.value;
    setFilmographyInput(value);
    setFormData((prev) => ({
      ...prev,
      filmography: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const body = {
      ...formData,
      cardType,
    };

    if (cardType === "MOVIE" && formData.releaseYear) {
      body.releaseYear = parseInt(formData.releaseYear);
    }

    fetch("http://localhost:8080/cards", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella creazione");
        return res.json();
      })
      .then((data) => {
        console.log("Card creata:", data);
        if (imageFile) uploadImage(data.id);
        resetForm(); // ✅ reset dopo successo
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
      .then((data) => {
        console.log("Immagine aggiornata:", data);
      })
      .catch(console.error)
      .finally(() => setUploading(false));
  };

  const renderTypeSpecificFields = () => {
    switch (cardType) {
      case "MOVIE":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Anno uscita</Form.Label>
              <Form.Control
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Genere</Form.Label>
              <Form.Control
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Regista</Form.Label>
              <Form.Control
                name="directorName"
                value={formData.directorName}
                onChange={handleChange}
              />
            </Form.Group>
          </>
        );
      case "ACTOR":
      case "DIRECTOR":
        return (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                name="bornDate"
                value={formData.bornDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Filmografia</Form.Label>
              <Form.Control
                name="filmography"
                value={filmographyInput}
                onChange={handleFilmographyChange}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  const imagePreviewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <Container fluid className="text-light full-height page-wrapper">
      <Row>
        <Col>
          <TopNavbar />
        </Col>
      </Row>
      <Container className="py-4 flex-grow-1 page-content">
        <Row>
          <Col md={6}>
            <h3>Crea una nuova card</h3>
            <Form onSubmit={handleCreate}>
              <Form.Group className="mb-2">
                <Form.Label>Tipo di Card</Form.Label>
                <Form.Select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value)}
                >
                  <option value="MOVIE">Movie</option>
                  <option value="ACTOR">Actor</option>
                  <option value="DIRECTOR">Director</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Rarità</Form.Label>
                <Form.Select
                  name="rarity"
                  value={formData.rarity}
                  onChange={handleChange}
                >
                  <option value="COMMON">COMMON</option>
                  <option value="RARE">RARE</option>
                  <option value="EPIC">EPIC</option>
                </Form.Select>
              </Form.Group>

              {renderTypeSpecificFields()}

              <Form.Group className="mb-2">
                <Form.Label>Immagine</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>

              <Button type="submit" variant="warning" className="mt-2">
                {uploading ? (
                  <>
                    Caricamento... <Spinner animation="border" size="sm" />
                  </>
                ) : (
                  "Crea Card"
                )}
              </Button>
            </Form>
          </Col>

          <Col
            md={6}
            className="d-flex align-items-center justify-content-center"
          >
            {cardType === "MOVIE" ? (
              <MovieCard
                card={{ ...formData, cardType, imageUrl: imagePreviewUrl }}
              />
            ) : (
              <PersonCard
                card={{ ...formData, cardType, imageUrl: imagePreviewUrl }}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Row>
        <Col>
          <BottomNavbar />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCardPage;
