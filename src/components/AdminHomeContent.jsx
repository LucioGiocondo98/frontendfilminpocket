import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";
import "../styles/AdminPage.css";
import { GiFilmSpool } from "react-icons/gi";

const AdminHomeContent = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="admin-page-container text-light">
      <Row className="justify-content-center align-items-center flex-grow-1 text-center">
        <Col xs={12} md={8} lg={6}>
          <div className="admin-grid-box">
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/create")}
            >
              Crea
              <br />
              Card
            </div>
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/edit")}
            >
              Modifica
              <br />
              Card
            </div>
            <div
              className="admin-grid-item"
              onClick={() => navigate("/admin/delete")}
            >
              Elimina
              <br />
              Card
            </div>
            <div className="admin-grid-item logo-cell">
              <GiFilmSpool size={40} />
              <span className="ms-2 navbar">FilmInPocket</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomeContent;
