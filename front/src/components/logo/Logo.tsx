import logo from '../../assets/logo/logo.svg'

function Logo() {
    return (
        <div className="flex flex-row gap-2 items-center ">
            <img src={logo} alt="Logo" className="w-8 h-8" />
            <p className="text-blackCustom font-bold text-[1.25rem] font-segoe">STYLE</p>
        </div>
    );
};
export default Logo