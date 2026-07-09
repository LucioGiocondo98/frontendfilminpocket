import { FileInput } from "@mantine/core";

function ImageUpload({ imageFile, onImageChange, currentImageUrl }) {
  return (
    <FileInput
      mb="sm"
      label="Immagine"
      accept="image/*"
      onChange={(file) => onImageChange({ target: { files: file ? [file] : [] } })}
      description={
        imageFile
          ? "Nuova immagine selezionata."
          : currentImageUrl
          ? "Immagine attuale mantenuta se non cambiata."
          : "Nessuna immagine attuale."
      }
    />
  );
}

export default ImageUpload;
