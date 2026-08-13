const buttonBackgroundColor = {
    blackCustom: 'bg-blackCustom text-whiteCustom',
    whiteCustom: 'bg-whiteCustom text-blackCustom',
    grayCustom2: 'bg-grayCustom2 text-whiteCustom',
    redCustom: 'bg-redCustom text-whiteCustom',
}
interface buttonProps {
    backgroundColor: keyof typeof buttonBackgroundColor;
    py: string;
    px:string;
    width: string;
    text?: string;
    textSize?: string;
    src?: string;
    src2?: string;
    hasBorder?: boolean;
}
function Button({ text, src, hasBorder, src2, backgroundColor, py, px, textSize, width }: buttonProps) {
    return (
        <button className={`flex flex-row items-center ${py} ${px} ${width} justify-center gap-4 rounded-[0.625rem] hover:bg-opacity-80 cursor-pointer  ${buttonBackgroundColor[backgroundColor]} ${hasBorder ? 'border border-grayCustom' : ''}`}>
            {src && <img src={src} className="w-3 h-3" />}
            { text && <p className={` ${textSize} font-segoe font-semibold `}>{text}</p> }
            {src2 && <img src={src2} className="w-3 h-3" />}
        </button>
    );
}
export default Button;