import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Container } from "react-bootstrap";

import AuthForm from "./components/AuthForm";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import PackOpenedPage from "./pages/PackOpenedPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./components/AdminHomeContent";
import AdminRoute from "./components/AdminRoute";
import CreateCardPage from "./pages/CreateCardPage";
import EditCardPage from "./pages/EditCardPage";
import DeleteCardPage from "./pages/DeleteCardPage";
import DeckPage from "./pages/DeckPage";

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
        path="/cards/:id"
        element={
          <ProtectedRoute>
            <CardDetailsPage />
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
      <Route
        path="/decks"
        element={
          <ProtectedRoute>
            <DeckPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/create"
        element={
          <AdminRoute>
            <CreateCardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/edit"
        element={
          <AdminRoute>
            <EditCardPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/delete"
        element={
          <AdminRoute>
            <DeleteCardPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
