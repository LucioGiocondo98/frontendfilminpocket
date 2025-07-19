import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <Container className="welcome-container d-flex flex-column justify-content-center align-items-center text-light">
      <h1 className="mb-4">Benvenuto in FilmInPocket 🎬</h1>
      <p className="mb-4 text-center">
        Colleziona le tue star preferite. Scopri, gioca, vivi il cinema.
      </p>
      <Button
        variant="warning"
        className="rounded-pill px-4"
        onClick={() => navigate("/login")}
      >
        Inizia
      </Button>
    </Container>
  );
}
