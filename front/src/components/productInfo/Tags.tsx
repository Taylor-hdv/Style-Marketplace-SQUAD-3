export const tagsBackgroundColor = {
  whiteCustom: "bg-whiteCustom text-blackCustom border border-[#E5E7EB]",
  grayCustom: "bg-[#F3F4F6] text-blackCustom",
  redCustom: "bg-redCustom text-whiteCustom",
} as const;
interface TagsProps {
  text: string;
  backgroundColor: keyof typeof tagsBackgroundColor;
}
export default function Tags({ text, backgroundColor }: TagsProps) {
  return (
    <div
      className={`${tagsBackgroundColor[backgroundColor]} flex items-center justify-center py-[0.19rem] pr-[0.69rem] pl-[0.67rem]  rounded-[624.9375rem]`}
    >
      <p className="font-segoe text-[0.75rem] font-semibold">{text}</p>
    </div>
  );
}
