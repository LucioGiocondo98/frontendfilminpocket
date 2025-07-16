import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import MainContent from "../components/MainContent";
import "../styles/HomePage.css";
import { Container, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container fluid className="mt-0">
      <Row>
        <Col>
          <TopNavbar />
        </Col>
      </Row>
      <MainContent />
      <BottomNavbar />
    </Container>
  );
};

export default HomePage;
