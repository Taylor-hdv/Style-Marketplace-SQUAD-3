import heartEmpty from "../../assets/imagesNavProduct/heartEmpty.svg";
import heartFull from "../../assets/imagesNavProduct/heartFull.svg";
import leftArrow from "../../assets/imagesNavProduct/leftArrow.svg";
import rightArrow from "../../assets/imagesNavProduct/rightArrow.svg";
import { useState } from "react";

interface ImageItem {
  id: number | string;
  src: string;
  alt: string;
}

interface ImageNavigationProps {
  images: ImageItem[];
}

export default function ImageNavigation({
  images: ImagesList = [],
}: ImageNavigationProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col gap-[1.13rem]">
      <div className="flex w-[21.44rem] h-[21.44rem] md:w-165 md:h-165 relative">
        {ImagesList.map((image, index) => (
          <img
            key={image.id}
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out absolute inset-0 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="flex justify-center items-center w-fit h-fit absolute top-1/2 right-4 px-3 py-3 cursor-pointer bg-white rounded-[0.625rem]">
          <button
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex + 1 + ImagesList.length) % ImagesList.length,
              )
            }
            className="flex justify-center items-center cursor-pointer"
          >
            <img src={rightArrow} alt="last image" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center items-center w-fit h-fit absolute top-1/2 left-4 px-3 py-3 cursor-pointer bg-white rounded-[0.625rem]">
          <button
            onClick={() =>
              setCurrentImageIndex(
                (currentImageIndex - 1 + ImagesList.length) % ImagesList.length,
              )
            }
            className="flex justify-center items-center cursor-pointer"
          >
            <img src={leftArrow} alt="next image" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-center items-center w-fit h-fit absolute top-4 right-4 px-3 py-3 cursor-pointer bg-white rounded-[0.625rem]">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="cursor-pointer"
          >
            <img
              src={isFavorite ? heartFull : heartEmpty}
              alt={isFavorite ? "favorite" : "unfavorite"}
              className="w-4 h-4 pointer-events-none"
            />
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-3 overflow-x-auto w-full h-fit lg:w-165">
        {ImagesList.map((image, index) => {
          const isSelected = index === currentImageIndex;
          return (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-[4.73rem] h-[4.73rem] md:w-[9.69rem] md:h-[9.69rem] shrink-0 overflow-hidden cursor-pointer transition-all ${isSelected ? "border-2 border-black opecity-100" : "opacity-60 hover:opacity-100"}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
