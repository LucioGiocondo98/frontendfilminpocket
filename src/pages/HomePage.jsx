import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import MainContent from "../components/MainContent";
import AdminHomeContent from "../components/AdminHomeContent";
import "../styles/HomePage.css";
import { Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Container fluid className="mt-0">
      <Row>
        <Col>
          <TopNavbar />
        </Col>
      </Row>

      {/* Contenuto principale: AdminHomeContent o MainContent */}
      {user?.role === "ROLE_ADMIN" ? <AdminHomeContent /> : <MainContent />}

      <BottomNavbar />
    </Container>
  );
};

export default HomePage;
