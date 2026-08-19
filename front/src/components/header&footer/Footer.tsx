import Button from "../button/Button";

interface footerProps {
  title: string;
  text: string
  backgroundColor: string;
}
function Footer({ title, backgroundColor, text }: footerProps) {
  return (
    <footer className={`w-full ${backgroundColor} flex flex-col items-center justify-center py-20 gap-8 md:gap-10 px-4 md:px-16 2xl:px-160`}>
        <div className="flex flex-col items-center w-full justify-center gap-4 md:gap-6">
            <h1 className="text-whiteCustom text-4xl font-bold font-segoe text-center">{title}</h1>
            <p className="text-whiteCustom text-[1.25rem] font-segoe text-center">{text}</p>
        </div>
        <div className="flex w-full flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-fit px-4 py-[0.81rem] bg-whiteCustom rounded-xl ">
                <input placeholder="Enter your email" className=" text-[1rem] text-[#9CA3AF] w-full md:w-[17.12rem]"></input>
            </div>
                <Button type="button" py="py-[0.78rem]" px="px-8" width="w-full md:w-fit" backgroundColor="whiteCustom" text="Subscribe" textSize="text-[0.875rem]" />
        </div>
    </footer>
  );
}
export default Footer;