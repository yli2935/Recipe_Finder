import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { Recipe } from "../../types/SafeRecipe";
import EmptyState from "../EmptyState";
interface ListingHeadProps {
  title: string;
  category: string;
  imageSrc: string;
  id: string;
  area: string;
  strYoutube: string;
  data: Recipe;
}
const getYoutubeVideoId = (url: string | null | undefined) => {
  if (!url) {
    return null;
  }
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  } catch (error) {
    console.error("Invalid URL:", url, "Error:", error);
    return null;
  }
};

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  category,
  imageSrc,
  id,
  area,
  strYoutube,
  data,
}) => {
  const videoId = getYoutubeVideoId(strYoutube);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${category}, ${area}`}
      />
      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="
            w-full
            md:w-1/2
            h-[50vh]
            overflow-hidden
            rounded-xl
            relative
            shadow-lg
          "
        >
          <img
            src={imageSrc}
            alt={title}
            className="object-cover h-full w-full rounded-xl transform transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-5 right-5">
            <HeartButton meal={data} />
          </div>
        </div>
        <div
          className="
            w-full
            md:w-1/2
            h-[50vh]
            overflow-hidden
            rounded-xl
            relative
            shadow-lg

            flex
            flex-col
            justify-center
          "
        >
          {strYoutube ? (
            <div className="w-full h-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <EmptyState title="Video not available" subtitle=""/>
          )}
        </div>
      </div>
    </>
  );
};

export default ListingHead;
