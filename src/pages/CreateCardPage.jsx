// CreateCardPage.jsx
import { useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import { useAuth } from "../context/AuthContext";
import CardForm from "../components/CardForm";
import ImageUpload from "../components/ImageUpload";
import CardPreview from "../components/CardPreview";
import ToastMessage from "../components/ToastMessage";

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
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

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
    const { name, value } = e.target;
    if (name === "cardType") {
      setCardType(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilmographyChange = (e) => {
    const value = e.target.value;
    setFilmographyInput(value);
    setFormData((prev) => ({
      ...prev,
      filmography: value.split(",").map((s) => s.trim()),
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
        if (imageFile) {
          uploadImage(data.id);
        } else {
          setToast({
            show: true,
            message: "Card creata con successo!",
            variant: "success",
          });
          resetForm();
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
          message: "Immagine caricata con successo!",
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
      .finally(() => {
        setUploading(false);
        resetForm();
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
        <Row className="py-5">
          <h3 style={{ color: "#F0C420" }}>Crea una nuova card</h3>

          <Col md={5}>
            <Form onSubmit={handleCreate}>
              <CardForm
                cardType={cardType}
                formData={formData}
                onChange={handleChange}
                filmographyInput={filmographyInput}
                onFilmographyChange={handleFilmographyChange}
              />
              <ImageUpload
                imageFile={imageFile}
                onImageChange={handleImageChange}
              />
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

          <Col md={6}>
            <CardPreview
              cardType={cardType}
              formData={formData}
              imageFile={imageFile}
            />
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

export default CreateCardPage;
