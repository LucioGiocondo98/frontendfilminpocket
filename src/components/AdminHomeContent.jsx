import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import ToastMessage from "./ToastMessage";
import "../styles/AdminPage.css";

const AdminHomeContent = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });

  return (
    <Container
      fluid
      className="admin-page-container text-light d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Container>
        <Row className=" g-2 justify-content-center text-center">
          <Col xs={6}>
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/create")}
            >
              Crea
              <br />
              Card
            </div>
          </Col>
          <Col xs={6}>
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/edit")}
            >
              Modifica
              <br />
              Card
            </div>
          </Col>
        </Row>
        <Row className="g-2 justify-content-center text-center">
          <Col xs={6}>
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/delete")}
            >
              Elimina
              <br />
              Card
            </div>
          </Col>
          <Col xs={6}>
            <div
              className="admin-grid-item d-flex align-items-center justify-content-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                fetch(`${API_URL}/admin/recharge-tickets`, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      "accessToken"
                    )}`,
                  },
                })
                  .then((res) => {
                    if (!res.ok)
                      throw new Error("Errore nella ricarica ticket");
                    setToast({
                      show: true,
                      message: "Ticket ricaricati con successo!",
                      variant: "success",
                    });
                  })
                  .catch((err) => {
                    console.error("Errore:", err);
                    setToast({
                      show: true,
                      message: "Errore durante la ricarica dei ticket.",
                      variant: "danger",
                    });
                  });
              }}
            >
              <GiFilmSpool size={30} />
              <span className="fw-bold">FilmInPocket</span>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </Container>
  );
};

export default AdminHomeContent;
