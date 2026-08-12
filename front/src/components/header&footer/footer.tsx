import Button from "../button/button";
interface footerProps {
  title: string;
  text: string
  backgoundColor: string;
}
function Footer({ title, backgoundColor, text }: footerProps) {
  return (
    <footer className={`w-screen ${backgoundColor} flex flex-col items-center justify-center py-20 gap-8 px-4 lg:px-160`}>
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-whiteCustom text-4xl font-bold font-segoe">{title}</h1>
            <p className="text-whiteCustom text-[1.25rem] font-segoe text-center">{text}</p>
        </div>
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-4">
            <div className="w-full lg:w-fit px-4 py-[0.81rem] rounded-[0.75 rem] bg-whiteCustom rounded-xl ">
                <input placeholder="Enter your email" className=" text-[1 rem] text-[#9CA3AF] w-[17.12 rem]"></input>
            </div>
                <Button py="py-[0.78rem]" px="px-8" width="w-full lg:w-fit" backgroundColor="bg-whiteCustom" text="Subscribe" textColor="text-blackCustom" textSize="text-[0.875rem]" />
        </div>
    </footer>
  );
}
export default Footer;