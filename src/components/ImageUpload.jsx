import { Form } from "react-bootstrap";

const ImageUpload = function ({ imageFile, onImageChange, currentImageUrl }) {
  return (
    <Form.Group className="mb-2">
      <Form.Label>Immagine</Form.Label>
      <Form.Control type="file" accept="image/*" onChange={onImageChange} />
      <Form.Text className="text-muted">
        {imageFile
          ? "Nuova immagine selezionata."
          : currentImageUrl
          ? "Immagine attuale mantenuta se non cambiata."
          : "Nessuna immagine attuale."}
      </Form.Text>
    </Form.Group>
  );
};

export default ImageUpload;
