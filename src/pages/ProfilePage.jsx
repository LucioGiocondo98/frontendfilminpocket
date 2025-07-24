import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import ToastMessage from "../components/ToastMessage";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import API_URL from "../apiConfig";

const ProfilePage = () => {
  const { user, accessToken, setUser, refreshUser } = useAuth();

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user.imageUrl);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (accessToken) {
      refreshUser();
    }
  }, [accessToken, refreshUser]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setPreviewUrl(user.imageUrl || "");
    }
  }, [user]);

  const handleUpdateProfile = () => {
    fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore aggiornamento profilo");
        return res.json();
      })
      .then((data) => {
        setToast({
          show: true,
          message: "Profilo aggiornato con successo!",
          variant: "success",
        });
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        setEditMode(false);
      })
      .catch(() => {
        setToast({
          show: true,
          message: "Errore durante l'aggiornamento.",
          variant: "danger",
        });
      });
  };

  const handleImageUpload = () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    fetch(`${API_URL}/users/me/image`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore upload immagine");
        return res.json();
      })
      .then((data) => {
        setToast({
          show: true,
          message: "Immagine aggiornata!",
          variant: "success",
        });
        setPreviewUrl(data.imageUrl);
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => {
        setToast({
          show: true,
          message: "Errore durante il caricamento.",
          variant: "danger",
        });
      });
  };

  const formatDateTime = (isoString) => {
    return new Date(isoString).toLocaleString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <TopNavbar />
      <Container className="my-3 text-light">
        <ToastMessage
          {...toast}
          onClose={() => setToast({ ...toast, show: false })}
        />
        <Row className="justify-content-center align-items-center mt-5 py-3">
          <Col xs={8} className="text-center">
            <Card
              bg="dark"
              text="light"
              className="p-3 border border-3 border-light"
            >
              {previewUrl && (
                <Card.Img
                  variant="top"
                  src={previewUrl}
                  style={{
                    width: 160,
                    height: 160,
                    objectFit: "cover",
                    borderRadius: "50%",
                    alignSelf: "center",
                  }}
                  className="mx-auto my-3 border border-2 border-secondary"
                />
              )}
              <Card.Body>
                <Card.Title className="text-warning">
                  Ciao, {user.username}
                </Card.Title>
                {editMode && (
                  <>
                    <Form.Group className="mb-2 w-100">
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                    <Button
                      variant="info"
                      onClick={handleImageUpload}
                      className="mb-4"
                    >
                      Modifica Foto Profilo
                    </Button>
                  </>
                )}
                {editMode ? (
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    <li className="mb-3 w-75">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </li>
                    <li className="mb-3 w-75">
                      <Form.Label>Nuova Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </li>
                    <li className="d-flex gap-2">
                      <Button variant="success" onClick={handleUpdateProfile}>
                        Salva Modifiche
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditMode(false)}
                      >
                        Annulla
                      </Button>
                    </li>
                  </ul>
                ) : (
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    <li className="mb-2">
                      <strong>Email:</strong> {user.email}
                    </li>
                    <li className="mb-2">
                      <strong>Ruolo:</strong> {user.role.replace("ROLE_", "")}
                    </li>
                    <li>
                      <Button
                        variant="warning"
                        onClick={() => setEditMode(true)}
                      >
                        Modifica
                      </Button>
                    </li>
                  </ul>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <BottomNavbar />
    </>
  );
};

export default ProfilePage;
