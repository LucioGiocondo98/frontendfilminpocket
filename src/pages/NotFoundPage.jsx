import { Center, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import TopNavbar from "../components/TopNavbar";
import BottomNavbar from "../components/BottomNavbar";

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column min-vh-100 text-light">
      <TopNavbar />

      <Center className="flex-grow-1">
        <div className="text-center">
          <h1 className="display-3 text-warning">404</h1>
          <h2 className="mb-3">Pagina non trovata</h2>
          <p className="mb-4">Ops! La pagina che cerchi non esiste.</p>
          <Button component={Link} to="/home" color="yellow">
            Torna alla Home
          </Button>
        </div>
      </Center>

      <BottomNavbar />
    </div>
  );
};

export default NotFoundPage;
