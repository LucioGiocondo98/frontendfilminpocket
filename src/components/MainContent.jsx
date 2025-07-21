import { Container, Row, Col } from "react-bootstrap";
import AcquirePack from "./AcquirePack";
import "../styles/HomePage.css";

const MainContent = () => {
  return (
    <Container className="text-center py-4">
      <Row className="justify-content-center mb-3 px-0">
        <Col xs={12}>
          <AcquirePack />
        </Col>
      </Row>
    </Container>
  );
};

export default MainContent;
