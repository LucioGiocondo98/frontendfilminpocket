import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import MainContent from "../components/MainContent";
import AdminHomeContent from "../components/AdminHomeContent";
import { useAuth } from "../context/AuthContext";
import { Col, Container, Row } from "react-bootstrap";

const HomePage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ROLE_ADMIN";

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />
      <Container className="my-5">
        <Row>
          <Col xs={12}>
            <main className="flex-grow-1 py-3" style={{ paddingTop: "70px" }}>
              {isAdmin ? <AdminHomeContent /> : <MainContent />}
            </main>
          </Col>
        </Row>
      </Container>

      <BottomNavbar />
    </div>
  );
};

export default HomePage;
