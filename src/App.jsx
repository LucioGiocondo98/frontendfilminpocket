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
import WelcomePage from "./pages/WelcomePage";
import PackOpeningAnimation from "./components/PackOpeningAnimation";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

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
      <Route path="/" element={<WelcomePage />} />
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
        path="/pack-opening"
        element={
          <ProtectedRoute>
            <PackOpeningAnimation />
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
        path="/profilo"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
