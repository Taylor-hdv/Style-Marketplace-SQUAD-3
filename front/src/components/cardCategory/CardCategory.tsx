interface cardCategoryProps {
    src: string;
    alt: string;
    title: string;
    quantity: string;
}
function CardCategory({ src, alt, title, quantity }: cardCategoryProps) {
    return (
        <div className="w-81 h-81 bg-white shadow-[0_10px_15px_-3px_rgba(0,0,0,0.10),0_4px_6px_-4px_rgba(0,0,0,0.10)] rounded-xl relative">
            <img src={src} alt={alt} className="w-full h-full rounded-xl" />
            <h3 className="absolute bottom-9 left-4 text-white text-[1.125rem] font-semibold font-segoe">{title}</h3>
            <p className="absolute bottom-4 left-4 text-white text-[0.875rem] font-segoe">{quantity}+ items</p>
        </div>
    )
}
export default CardCategory;