import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastMessage({
  show,
  onClose,
  message,
  variant = "success",
}) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={show} delay={4000} autohide bg={variant}>
        <Toast.Header closeButton>
          <strong className="me-auto">FilmInPocket</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
