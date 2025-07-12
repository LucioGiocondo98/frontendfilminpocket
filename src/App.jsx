import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import AuthForm from "./components/AuthForm";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";

const AuthLayout = () => (
  <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <AuthForm />
  </Container>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />
      <Route path="/login" element={<AuthLayout />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/collection" element={<CollectionPage />} />
    </Routes>
  );
}

export default App;
