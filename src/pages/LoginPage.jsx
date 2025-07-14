import { Container } from "react-bootstrap";
import AuthForm from "../components/AuthForm";

const LoginPage = () => (
  <Container
    className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh" }}
  >
    <AuthForm />
  </Container>
);

export default LoginPage;
