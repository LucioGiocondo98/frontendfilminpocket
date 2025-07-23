import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

const CardPreview = function ({ cardType, formData, imageFile }) {
  const previewCard = {
    ...formData,
    cardType,
    imageUrl: imageFile
      ? URL.createObjectURL(imageFile)
      : formData.imageUrl || null,
  };

  const type = cardType?.toUpperCase();

  return (
    <div className="d-flex align-items-center justify-content-center">
      {type === "MOVIE" ? (
        <MovieCard card={previewCard} />
      ) : (
        <PersonCard card={previewCard} />
      )}
    </div>
  );
};

export default CardPreview;
