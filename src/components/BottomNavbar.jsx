import { Container, Row, Col } from "react-bootstrap";
import { Globe } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import "../styles/BottomNavbar.css";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import { TiFilm } from "react-icons/ti";
import { TbCardsFilled } from "react-icons/tb";
const BottomNavbar = () => {
  return (
    <div className="bottom-navbar-container d-lg-none fixed-bottom bg-dark border-secondary shadow-sm">
      <Container fluid className="p-0">
        <Row className="justify-content-evenly text-center gx-0">
          <Col xs={3} className="bottom-icon p-0">
            <Link to="/home" className="d-block py-2 nav-link-custom">
              <TiFilm size={20} />
              <div className="nav-text">Home</div>
            </Link>
          </Col>
          <Col xs={3} className="bottom-icon  p-0">
            <Link to="/collection" className="d-block py-2 nav-link-custom">
              <TbCardsFilled size={20} />
              <div className="nav-text">Collezione</div>
            </Link>
          </Col>
          <Col xs={3} className="bottom-icon p-0">
            <Link to="/mazzi" className="d-block py-2 nav-link-custom">
              <MdOutlineCollectionsBookmark size={20} />
              <div className="nav-text">Mazzi</div>
            </Link>
          </Col>
          <Col xs={3} className="bottom-icon p-0">
            <Link to="/community" className="d-block py-2 nav-link-custom">
              <Globe size={20} />
              <div className="nav-text">Community</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BottomNavbar;
