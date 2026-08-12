interface buttonProps {
    backgroundColor: string;
    py: string;
    px:string;
    width: string;
    text?: string;
    textColor?: string;
    textSize?: string;
    src?: string;
    src2?: string;
    hasBorder?: boolean;
}
function Button({ text, src, hasBorder, src2, backgroundColor, py, px, textSize, textColor, width }: buttonProps) {
    return (
        <button className={`flex flex-row items-center ${py} ${px} ${width} justify-center gap-4 rounded-[0.625rem]  ${backgroundColor} ${hasBorder ? 'border border-grayCustom' : ''}`}>
            {src && <img src={src} className="w-3 h-3" />}
            { text && <p className={`${textColor} ${textSize} font-segoe font-semibold `}>{text}</p> }
            {src2 && <img src={src2} className="w-3 h-3" />}
        </button>
    );
}
export default Button;