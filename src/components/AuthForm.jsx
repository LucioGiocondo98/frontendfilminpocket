import { useState } from "react";
import { TextInput, Button, Center } from "@mantine/core";
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
        login(data.accessToken, data.user);
        showToast("Login effettuato con successo!", "success");

        navigate("/home");
      })
      .catch((err) => {
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
        navigate("/");
      })
      .catch((err) => {
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
  };

  return (
    <div className="clapperboard">
      <div className={`clapper ${isClapping ? "clapping" : ""}`}></div>

      <div className="board">
        <div className="clapper-static"></div>
        <div className="text-white">
          <h3 className="form-title">
            {isLogin ? "FilmInPocket" : "Registrati"}
          </h3>

          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              placeholder="Username"
              classNames={{ input: "form-control-clapper" }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              mb="md"
            />

            {!isLogin && (
              <TextInput
                type="email"
                placeholder="Email"
                classNames={{ input: "form-control-clapper" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                mb="md"
              />
            )}

            <TextInput
              type="password"
              placeholder="Password"
              classNames={{ input: "form-control-clapper" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mb="md"
            />

            <Center>
              <Button type="submit" unstyled className="action-button w-50">
                {isLogin ? "Azione!" : "Registrati"}
              </Button>
            </Center>
          </form>

          <div className="toggle-text">
            {isLogin ? "Non hai un account? " : "Hai già un account? "}
            <span onClick={toggleForm} className="toggle-link">
              {isLogin ? "Registrati" : "Accedi"}
            </span>
          </div>
        </div>
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
