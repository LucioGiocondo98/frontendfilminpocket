import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";

import AuthForm from "./components/AuthForm";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import PackOpenedPage from "./pages/PackOpenedPage";
import ProtectedRoute from "./components/ProtectedRoute"; // <-- Usa questo nome

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

      {/* Pagine protette */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collection"
        element={
          <ProtectedRoute>
            <CollectionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pack-opened"
        element={
          <ProtectedRoute>
            <PackOpenedPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
