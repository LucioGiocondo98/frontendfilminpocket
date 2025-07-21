// DeckPage.jsx
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";
import DeckSidebar from "../components/DeckSidebar";
import DeckBuilder from "../components/DeckBuilder";

const DeckPage = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />
      <Container
        fluid
        className="flex-grow-1"
        style={{ padding: "2rem 1rem 100px" }}
      >
        <DeckBuilder />
      </Container>
      <BottomNavbar />
    </div>
  );
};

export default DeckPage;
