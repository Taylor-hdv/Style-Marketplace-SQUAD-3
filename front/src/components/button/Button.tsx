export const buttonBackgroundColor = {
    blackCustom: 'bg-blackCustom text-whiteCustom',
    whiteCustom: 'bg-whiteCustom text-blackCustom',
    grayCustom2: 'bg-grayCustom2 text-whiteCustom',
    redCustom: 'bg-redCustom text-whiteCustom',
} as const;
interface buttonProps {
    backgroundColor: keyof typeof buttonBackgroundColor;
    py: string;
    px:string;
    width: string;
    type: "button" | "submit" | "reset";
    text?: string;
    textSize?: string;
    src?: string;
    src2?: string;
    hasBorder?: boolean;
    onClick?: () => void;
}
function Button({ text, src, hasBorder, src2, backgroundColor, py, px, textSize, width, type, onClick }: buttonProps) {
    return (
        <button type={type} onClick={onClick} className={`flex flex-row items-center ${py} ${px} ${width} justify-center gap-4 rounded-[0.625rem] hover:bg-opacity-80 cursor-pointer  ${buttonBackgroundColor[backgroundColor]} ${hasBorder ? 'border border-grayCustom' : ''}`}>
            {src && <img src={src} className="w-3 h-3" />}
            { text && <p className={` ${textSize} font-segoe font-semibold `}>{text}</p> }
            {src2 && <img src={src2} className="w-3 h-3" />}
        </button>
    );
}
export default Button;