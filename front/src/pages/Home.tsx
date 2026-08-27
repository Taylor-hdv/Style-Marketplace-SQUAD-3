import Footer from "../components/header&footer/Footer";
import Button from "../components/button/Button";
import CardCategory from "../components/cardCategory/CardCategory";
import CardProduct from "../components/cardProduct/CardProduct";
import arrowWhite from "../assets/home/arrowWhite.svg";
import arrowBlack from "../assets/home/arrowBlack.svg";
import shipping from "../assets/home/shipping.svg";
import Return from "../assets/home/return.svg";
import security from "../assets/home/security.svg";
import productImage from "../assets/cardProduct/productImage.svg";
import { useNavigate } from "react-router";
import { useEffect } from "react";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    async function userLoged() {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/sign-in");
      }
    }
    userLoged();
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <section className="flex flex-col px-4 pt-[7.69rem] pb-20 w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 mb-8">
          <h1 className="text-5xl font-bold text-center font-segoe bg-[linear-gradient(90deg,#030711_0%,rgba(3,7,17,0.70)_100%)] bg-clip-text text-transparent">
            Style Redefined
          </h1>
          <p className="text-center text-[1.25rem] font-segoe text-grayCustom3 px-4">
            Discover the latest trends in fashion. Premium quality, sustainable
            materials, timeless designs.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center w-full gap-4 mb-[11.62rem] lg:flex-row lg:w-[24.44rem]">
          <Button
            type="button"
            text="Shop Now"
            backgroundColor="blackCustom"
            py="py-[0.63rem]"
            width="w-full"
            px="px-0"
            textSize="text-[1.125rem]"
            src2={arrowWhite}
          />
          <Button
            type="button"
            text="Learn More"
            backgroundColor="whiteCustom"
            hasBorder={true}
            py="py-[0.69rem]"
            px="px-0"
            width="w-full"
            textSize="text-[1.125rem]"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-8 mb-36 md:flex-row">
          <div className="flex flex-col items-center justify-center">
            <img src={shipping} className="w-16 h-16 mb-4" />
            <h2 className="text-[1.125rem] font-segoe font-semibold text-center text-blackCustom mb-2">
              Free Shipping
            </h2>
            <p className="text-center text-grayCustom3">
              Free shipping on orders over $100
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={Return} className="w-16 h-16 mb-4" />
            <h2 className="text-[1.125rem] font-segoe font-semibold text-center text-blackCustom mb-2">
              Easy Returns
            </h2>
            <p className="text-center text-grayCustom3">
              30-day hussle-free returns
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={security} className="w-16 h-16 mb-4" />
            <h2 className="text-[1.125rem] font-segoe font-semibold text-center text-blackCustom mb-2">
              Secure Payment
            </h2>
            <p className="text-center text-grayCustom3">
              Your payment information is secure
            </p>
          </div>
        </div>
        <section className="flex flex-col items-center justify-center gap-16 mb-40">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-[2.25rem] font-segoe font-bold text-center text-blackCustom mb-2">
              Shop by Category
            </h2>
            <p className="text-center text-grayCustom3 text-[1.25rem]">
              Explore our carefully curated collections for every style and
              occasion
            </p>
          </div>
          <div className="grid grid-col-1 gap-6 md:grid-cols-2 2xl:flex">
            <CardCategory
              src={productImage}
              alt="Blue flowery dress"
              title="Women's fashion"
              quantity="500"
            />
            <CardCategory
              src={productImage}
              alt="Denim Jacket"
              title="Men's fashion"
              quantity="350"
            />
            <CardCategory
              src={productImage}
              alt="golden ring with diamonds"
              title="Accessories"
              quantity="200"
            />
            <CardCategory
              src={productImage}
              alt="white Sneakers"
              title="Shoes"
              quantity="180"
            />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center gap-16 mb-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-[2.25rem] font-segoe font-bold text-center text-blackCustom mb-2">
              Featured Products
            </h2>
            <p className="text-center text-grayCustom3 text-[1.25rem]">
              Handpicked favorites from our latest collection
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 2xl:flex">
            <CardProduct
              src={productImage}
              alt="Denim Jacket with white shirt"
              title="Vintage Denim Jacket"
              price="89"
              oldPrice="120"
              rating={4.8}
              quantity={124}
              tag="Best Seller"
              tagColor="bg-blackCustom"
              onClick={() => navigate("/product-info")}
            />
            <CardProduct
              src={productImage}
              alt="Black blazer oversized with white lines"
              title="Oversized Blazer"
              price="145"
              rating={4.9}
              quantity={89}
              tag="New"
              tagColor="bg-blackCustom"
              onClick={() => navigate("/product-info")}
            />
            <CardProduct
              src={productImage}
              alt="Blue jeans with leather pockets"
              title="Confort Slim Jeans"
              price="79"
              oldPrice="99"
              rating={4.3}
              quantity={203}
              tag="Sale"
              tagColor="bg-redCustom"
              onClick={() => navigate("/product-info")}
            />
            <CardProduct
              src={productImage}
              alt="White silk blouse with V-neck and ruffles on the shoulders"
              title="Silk Blouse"
              price="125"
              rating={4.8}
              quantity={156}
              tag="Premium"
              tagColor="bg-blackCustom"
              onClick={() => navigate("/product-info")}
            />
          </div>
        </section>
        <div className="flex items-center justify-center">
          <Button
            type="button"
            text="View All Products"
            backgroundColor="whiteCustom"
            hasBorder={true}
            py="py-[0.72rem]"
            width="w-fit"
            px="px-[2.06rem]"
            textSize="text-[0.875rem]"
            src2={arrowBlack}
          />
        </div>
      </section>
      <Footer
        title="Stay in Style"
        text="Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips."
        backgroundColor="bg-blackCustom"
      />
    </div>
  );
}
export default Home;
