import { Navbar, Container, Nav, Offcanvas, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TopNavbar.css";
import { GiFilmSpool } from "react-icons/gi";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { TiFilm } from "react-icons/ti";
import { TbCardsFilled } from "react-icons/tb";
import { FaDoorOpen } from "react-icons/fa6";
import { TfiUser } from "react-icons/tfi";
export default function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="top-navbar" variant="dark">
      <Container fluid>
        <Row className="flex-grow-1 w-100 align-items-center">
          {/* Colonna con il brand */}
          <Col xs={6}>
            <Navbar.Brand
              as={Link}
              to="/home"
              className="top-navbar-brand d-flex align-items-center"
            >
              <GiFilmSpool size={40} />
              <span className="ms-2 navbar-title-text">FilmInPocket</span>
            </Navbar.Brand>
          </Col>

          {/* Colonna con il menu/hamburger */}
          <Col xs={6} className="text-end">
            <Navbar.Toggle aria-controls="navbar-offcanvas" />
          </Col>
        </Row>

        {/* Offcanvas menu (hamburger per mobile) */}
        <Navbar.Offcanvas
          id="navbar-offcanvas"
          aria-labelledby="navbar-offcanvas-label"
          placement="end"
          className="top-navbar-offcanvas bg-dark"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="navbar-offcanvas-label" className="text-white">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto flex-column flex-lg-row gap-2">
              <Nav.Link as={Link} to="/home" className="top-navbar-link">
                <TiFilm size={20} />
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/collection" className="top-navbar-link">
                <TbCardsFilled size={20} />
                Collezione
              </Nav.Link>
              <Nav.Link as={Link} to="/mazzi" className="top-navbar-link">
                <MdOutlineCollectionsBookmark size={20} />
                Mazzi
              </Nav.Link>
              <Nav.Link as={Link} to="/profilo" className="top-navbar-link">
                <TfiUser size={20} />
                Profilo
              </Nav.Link>
              <Nav.Link onClick={handleLogout} className="top-navbar-link">
                <FaDoorOpen size={20} />
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
