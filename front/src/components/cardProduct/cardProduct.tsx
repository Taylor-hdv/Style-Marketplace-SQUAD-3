import starRating from '../../assets/cardProduct/starRating.svg'
import Button from '../button/button'
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
        <section className="flex flex-col items-center justify-start w-[20rem] h-112 bg-white shadow-[0 10px 15px -3px rgba(0, 0, 0, 0.10), 0 4px 6px -4px rgba(0, 0, 0, 0.10)] rounded-xl relative" >
            <div className="w-full h-80 relative">
                <img src={src} alt={alt} className="w-full h-80 rounded-t-xl" />
                <span className={`absolute top-3 left-3 px-[0.65rem] py-[0.2rem] rounded-[625rem] text-whiteCustom text-[0.75rem] font-semibold font-segoe ${tagColor}`}>{tag}</span>
            </div>
            <div className="flex flex-col items-start justify-center gap-3 px-4 py-4 w-fit">
                <h3 className="text-blackCustom text-[1.125rem] font-semibold font-segoe">{title}</h3>
                {rating && <div className="flex flex-row items-center justify-start gap-1">
                    <img src={starRating} alt="Star Rating" className="w-[0.8rem] h-[0.8rem]" />
                    <p className="text-blackCustom text-[0.875rem] font-segoe font-semibold">{rating}</p>
                    <p className="text-grayCustom text-[0.875rem] font-segoe">({quantity})</p>
                </div>}
                <div className="flex flex-row items-center justify-start gap-2">
                    <p className="text-blackCustom text-[1.125rem] font-bold font-segoe">{price}</p>
                    {oldPrice && <p className="text-grayCustom text-[0.875rem] font-segoe line-through">{oldPrice}</p>}
                </div>
                <Button py="py-[0.78rem]" px="px-8" width="w-full" backgroundColor="bg-blackCustom" text="Add to Cart" textColor="text-blackCustom" textSize="text-[0.875rem] hasBorder="true" />
            </div>

        </section>
    );
}
export default CardProduct;