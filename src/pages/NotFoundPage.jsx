import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 text-light bg-dark">
      <TopNavbar />

      <Container className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <Row className="text-center">
          <Col>
            <h1 className="display-3 text-warning">404</h1>
            <h2 className="mb-3">Pagina non trovata</h2>
            <p className="mb-4">Ops! La pagina che cerchi non esiste.</p>
            <Button as={Link} to="/home" variant="warning">
              Torna alla Home
            </Button>
          </Col>
        </Row>
      </Container>

      <BottomNavbar />
    </div>
  );
};

export default NotFoundPage;
