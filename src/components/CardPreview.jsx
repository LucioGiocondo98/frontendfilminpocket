import MovieCard from "./MovieCard";
import PersonCard from "./PersonCard";

function CardPreview({ cardType, formData, imageFile }) {
  const previewCard = {
    ...formData,
    cardType,
    imageUrl: imageFile
      ? URL.createObjectURL(imageFile)
      : formData.imageUrl || null,
  };
  return (
    <div className="d-flex align-items-center justify-content-center">
      {cardType === "MOVIE" ? (
        <MovieCard card={previewCard} />
      ) : (
        <PersonCard card={previewCard} />
      )}
    </div>
  );
}

export default CardPreview;
