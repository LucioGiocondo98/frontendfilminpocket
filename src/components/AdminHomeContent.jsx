import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import "../styles/AdminPage.css";

const AdminHomeContent = () => {
  const navigate = useNavigate();

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
            <div className="admin-grid-item d-flex align-items-center justify-content-center gap-2">
              <GiFilmSpool size={30} />
              <span className="fw-bold">FilmInPocket</span>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminHomeContent;
