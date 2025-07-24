import { Toast, ToastContainer } from "react-bootstrap";

const ToastMessage = function ({
  show,
  onClose,
  message,
  variant = "success",
}) {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{
        zIndex: 1055,
        position: "fixed",
        top: "1rem",
        right: "1rem",
      }}
    >
      <Toast onClose={onClose} show={show} delay={4000} autohide bg={variant}>
        <Toast.Header closeButton>
          <strong className="me-auto">
            {variant === "success"
              ? "Successo"
              : variant === "danger"
              ? "Errore"
              : "Informazione"}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastMessage;
