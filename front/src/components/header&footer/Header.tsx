import logo from "../../assets/logo/logo.svg";
import search from "../../assets/header/search.svg";
import heart from "../../assets/header/heart.svg";
import bag from "../../assets/header/bag.svg";
import search2 from "../../assets/header/search2.svg";
import profileIcon from "../../assets/header/profileIcon.svg";
import menu from "../../assets/header/menu.svg";
import { useNavigate } from "react-router";

interface headerProps {
  notifications: number;
}

function Header({ notifications }: headerProps) {
  const navigate = useNavigate();
  return (
    <header className="flex flex-col items-center justify-center sticky top-0 left-0 w-full z-50">
      <section className="w-full py-2 justify-center items-center bg-blackCustom">
        <p className="text-whiteCustom text-sm font-segoe text-center">
          Free shipping on orders over $100 | New arrivals daily
        </p>
      </section>
      <section className="w-full px-4 py-4 justify-between items-center bg-whiteCustom flex flex-row md:px-4 lg:px-24 2xl:px-[14.375vw] border-b border-grayCustom">
        <img src={menu} alt="Menu" className="w-10 h-10 md:hidden" />
        <div
          onClick={() => navigate("/")}
          className="flex flex-row gap-2 items-center cursor-pointer"
        >
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <p className="text-blackCustom font-bold text-[1.25rem] font-segoe">
            STYLE
          </p>
        </div>
        <div className="hidden flex-row gap-8 md:gap-4 lg:gap-8 items-center md:flex">
          <button className="text-[rgba(3, 7, 17, 0.80)] font-semibold text-[0.875rem]">
            New In
          </button>
          <button className="text-[rgba(3, 7, 17, 0.80)] font-semibold text-[0.875rem]">
            Womam
          </button>
          <button className="text-[rgba(3, 7, 17, 0.80)] font-semibold text-[0.875rem]">
            Men
          </button>
          <button className="text-[rgba(3, 7, 17, 0.80)] font-semibold text-[0.875rem]">
            Sale
          </button>
        </div>
        <div className="hidden items-center flex-row bg-[rgba(243, 244, 246, 0.50)] rounded-[0.625rem] gap-4 px-3 py-[0.66rem] md:flex border border-grayCustom ">
          <img src={search} alt="Search" className="w-4 h-4" />
          <input
            placeholder="Search for products..."
            className="bg-transparent border-none focus:outline-none text-grayCustom3 text-[0.875rem] font-segoe"
          ></input>
        </div>
        <div className="flex flex-row items-center justify-center">
          <img src={search2} alt="Search" className="w-10 h-10 md:hidden" />
          <img src={heart} alt="Favorites" className="w-10 h-10" />
          <div
            onClick={() => navigate("/profile")}
            className="cursor-pointer w-fit h-fit"
          >
            <img src={profileIcon} alt="Profile" className="w-10 h-10" />
          </div>
          <div className="relative w-10 h-10">
            <img src={bag} alt="Itens" className="w-10 h-10" />
            {notifications > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blackCustom text-whiteCustom text-[0.75rem] font-semibold absolute top-0 right-0">
                {notifications}
              </span>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}
export default Header;
