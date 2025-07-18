import { Form } from "react-bootstrap";

function ImageUpload({ imageFile, onImageChange }) {
  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <Form.Group className="mb-2">
      <Form.Label>Immagine</Form.Label>
      <Form.Control type="file" accept="image/*" onChange={onImageChange} />
    </Form.Group>
  );
}

export default ImageUpload;
