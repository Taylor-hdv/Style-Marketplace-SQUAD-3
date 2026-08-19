import starRating from '../../assets/cardProduct/starRating.svg'
import Button from '../button/Button'
interface productCardProps {
    src: string;
    alt: string;
    title: string;
    price: string;
    quantity: number;
    tag: string;
    tagColor: string;
    rating?: number;
    oldPrice?: string;
}
function CardProduct({ src, alt, title, price, quantity, tag, tagColor, rating, oldPrice }: productCardProps) {
    return (
        <section className="flex flex-col items-center justify-start w-[20rem] h-112 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] rounded-xl relative" >
            <div className="w-full h-80 relative">
                <img src={src} alt={alt} className="w-full h-80 rounded-t-xl" />
                <span className={`absolute top-3 left-3 px-[0.65rem] py-[0.2rem] rounded-[625rem] text-whiteCustom text-[0.75rem] font-semibold font-segoe ${tagColor}`}>{tag}</span>
            </div>
            <div className="flex flex-col items-start justify-center gap-3 px-4 py-4 w-full">
                <h3 className="text-blackCustom text-[1.125rem] font-semibold font-segoe">{title}</h3>
                {rating && <div className="flex flex-row items-center justify-start gap-1">
                    <img src={starRating} alt="Star Rating" className="w-[0.8rem] h-[0.8rem]" />
                    <p className="text-blackCustom text-[0.875rem] font-segoe font-semibold">{rating}</p>
                    <p className="text-grayCustom3 text-[0.875rem] font-segoe">({quantity})</p>
                </div>}
                <div className="flex flex-row items-center justify-start gap-2">
                    <p className="text-blackCustom text-[1.125rem] font-bold font-segoe">{price}</p>
                    {oldPrice && <p className="text-grayCustom3 text-[0.875rem] font-segoe line-through">{oldPrice}</p>}
                </div>
                <div className="w-fit absolute bottom-4 right-4">
                <Button type="button" py="py-[0.47rem]" px="px-[0.81rem]" width="w-full" backgroundColor="whiteCustom" text="Add to Cart" textSize="text-[0.875rem]" hasBorder={true} />
                </div>
            </div>

        </section>
    );
}
export default CardProduct;