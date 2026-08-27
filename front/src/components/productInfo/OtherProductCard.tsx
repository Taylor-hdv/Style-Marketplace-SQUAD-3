import starRating from "../../assets/cardProduct/starRating.svg";
import Button from "../button/Button";
interface productCardProps {
  src: string;
  alt: string;
  title: string;
  price: number;
  rating?: number;
  oldPrice?: number;
}
function OtherProductCard({
  src,
  alt,
  title,
  price,
  rating,
  oldPrice,
}: productCardProps) {
  return (
    <section className="flex flex-col items-center justify-start w-full bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] rounded-xl relative">
      <div className="w-full relative">
        <img
          src={src}
          alt={alt}
          className="w-full h-full rounded-t-xl object-cover"
        />
      </div>
      <div className="flex flex-col items-start justify-center gap-[0.62rem] px-4 pt-4 pb-6 w-full">
        <h3 className="text-blackCustom text-[1rem] font-semibold font-segoe">
          {title}
        </h3>
        {rating && (
          <div className="flex flex-row items-center justify-start gap-[0.33rem]">
            <img
              src={starRating}
              alt="Star Rating"
              className="w-[0.8rem] h-[0.8rem]"
            />
            <p className="text-blackCustom text-[0.875rem] font-segoe font-semibold">
              {rating}
            </p>
          </div>
        )}
        <div className="flex flex-row items-center justify-start mt-[0.38rem] gap-[0.48rem]">
          <p className="text-blackCustom text-[1.125rem] font-bold font-segoe">
            ${price}
          </p>
          {oldPrice && (
            <p className="text-grayCustom3 text-[0.875rem] font-segoe line-through">
              {oldPrice}
            </p>
          )}
        </div>
        <div className="w-fit absolute bottom-4 right-4">
          <Button
            type="button"
            py="pt-2 pb-[0.56rem]"
            px="pr-[0.79rem] pl-[0.81rem]"
            width="w-fit"
            backgroundColor="whiteCustom"
            text="View"
            textSize="text-[0.875rem]"
            hasBorder={true}
          />
        </div>
      </div>
    </section>
  );
}
export default OtherProductCard;
