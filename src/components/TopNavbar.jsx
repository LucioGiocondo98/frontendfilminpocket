import { Navbar, Container, Row, Col, Offcanvas, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/TopNavbar.css";

const TopNavbar = () => {
  // Componenti dei link (riutilizzabili)
  const navLinks = (
    <>
      <Nav.Link as={Link} to="/profilo" className="text-white">
        Profilo
      </Nav.Link>
      <Nav.Link as={Link} to="/impostazioni" className="text-white">
        Impostazioni
      </Nav.Link>
      <Nav.Link as={Link} to="/logout" className="text-white">
        Logout
      </Nav.Link>
    </>
  );

  return (
    <Navbar
      expand="lg"
      bg="dark"
      variant="dark"
      className="position-fixed w-100 top-0 z-3"
    >
      <Container fluid>
        <Row className="align-items-center w-100">
          {/* Immagine profilo - solo SM/MD */}
          <Col xs={2} className="d-lg-none">
            <img
              src="/path/to/profile.jpg"
              alt="Profilo"
              className="rounded-circle border border-warning"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </Col>

          {/* Titolo - centrato su SM/MD, sx su LG+ */}
          <Col
            xs={8}
            lg={4}
            className="text-center text-lg-start mx-auto mx-lg-0"
          >
            <Navbar.Brand
              style={{ fontFamily: "Lobster, cursive", fontSize: "1.8rem" }}
            >
              FilmInPocket
            </Navbar.Brand>
          </Col>

          {/* Area destra */}
          <Col xs={2} lg={8} className="text-end pe-3">
            {/* Toggle hamburger solo SM/MD */}
            <div className="d-lg-none">
              <Navbar.Toggle aria-controls="offcanvasNavbar" />
            </div>

            {/* Link + immagine profilo su LG+ */}
            <div className="d-none d-lg-flex justify-content-end align-items-center gap-3">
              {navLinks}
              <img
                src="/path/to/profile.jpg"
                alt="Profilo"
                className="rounded-circle border border-warning ms-3"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </div>
          </Col>
        </Row>

        {/* Offcanvas menu per SM/MD */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">{navLinks}</Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
