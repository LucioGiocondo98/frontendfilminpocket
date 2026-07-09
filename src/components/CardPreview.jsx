import { Center } from "@mantine/core";
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
    <Center>
      {type === "MOVIE" ? (
        <MovieCard card={previewCard} />
      ) : (
        <PersonCard card={previewCard} />
      )}
    </Center>
  );
};

export default CardPreview;
