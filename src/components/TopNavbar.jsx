import { Navbar, Offcanvas, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand={false} className="fixed-top">
      <Container fluid>
        {/* Titolo sempre a sinistra */}
        <Navbar.Brand
          className="ms-2"
          style={{ fontFamily: "Lobster, cursive", fontSize: "1.8rem" }}
        >
          FilmInPocket
        </Navbar.Brand>

        {/* Icona profilo */}
        <Image
          src="/path/to/profile.jpg"
          alt="Profilo"
          className="rounded-circle border border-warning"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
        />

        {/* Bottone hamburger */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" />

        {/* Offcanvas menu */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-dark text-white"
        >
          <Offcanvas.Header closeButton closeVariant="white">
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/collection" className="text-white">
                Collezione
              </Nav.Link>
              <Nav.Link as={Link} to="/deck" className="text-white">
                Mazzi
              </Nav.Link>
              <Nav.Link as={Link} to="/logout" className="text-white">
                Logout
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
