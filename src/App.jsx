import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";
import AuthForm from "./components/AuthForm";
import HomePage from "./pages/HomePage";

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
    </Routes>
  );
}

export default App;
