import { useState } from "react";
import { Form, Button, Alert, Card, Row, Col } from "react-bootstrap";
import "../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ToastMessage from "./ToastMessage";
import API_URL from "../apiConfig";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isClapping, setIsClapping] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  const showToast = (message, variant = "success") => {
    setToast({ show: true, message, variant });
  };
  const handleClap = () => {
    if (isClapping) return;
    setIsClapping(true);
    setTimeout(() => {
      setIsClapping(false);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClap();

    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleLogin = () => {
    const credentials = { username, password };
    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then(handleResponse)
      .then((data) => {
        console.log("User dopo login:", data.user);
        login(data.accessToken, data.user);
        showToast("Login effettuato con successo!", "success");

        navigate("/home");
      })
      .catch((err) => {
        setError(err.message);
        showToast(err.message || "Errore durante il login", "danger");
        console.error(err);
      });
  };

  const handleRegister = () => {
    const userData = { username, email, password };
    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(handleResponse)
      .then(() => {
        showToast(
          "Registrazione completata! Ora puoi effettuare il login.",
          "success"
        );
        setIsLogin(true);
        setError("");
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
        showToast(err.message || "Errore durante la registrazione", "danger");
        console.error(err);
      });
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      return response.json().then((err) => {
        throw new Error(err.message || "Operazione fallita");
      });
    }
    if (response.status === 201 || response.status === 204) {
      return null;
    }
    return response.json();
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="clapperboard">
      <div className={`clapper ${isClapping ? "clapping" : ""}`}></div>

      <div className="board">
        <div className="clapper-static"></div>
        <Card bg="transparent" border="0" text="white">
          <Card.Body>
            <h3 className="form-title">
              {isLogin ? "FilmInPocket" : "Registrati"}
            </h3>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  className="form-control-clapper"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              {!isLogin && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="form-control-clapper"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="form-control-clapper"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    className="action-button w-50"
                    style={{ backgroundColor: "#d4a24d", border: "none" }}
                  >
                    {isLogin ? "Azione!" : "Registrati"}
                  </Button>
                </Col>
              </Row>
            </Form>

            <div className="toggle-text">
              {isLogin ? "Non hai un account? " : "Hai già un account? "}
              <span onClick={toggleForm} className="toggle-link">
                {isLogin ? "Registrati" : "Accedi"}
              </span>
            </div>
          </Card.Body>
        </Card>
      </div>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default AuthForm;
