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
    <div className="d-flex flex-column min-vh-100  text-light">
      <TopNavbar />
      <Container>
        <Row>
          <Col></Col>
        </Row>
        {user?.role === "ROLE_ADMIN" ? <AdminHomeContent /> : <MainContent />}
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default HomePage;
