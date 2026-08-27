import emptyStar from "../assets/productInfo/emptyStar.svg";
import fullStar from "../assets/productInfo/fullStar.svg";
import cart from "../assets/productInfo/cart.svg";
import share from "../assets/productInfo/share.svg";
import Images from "../components/productInfo/Images";
import ImageNavigation from "../components/productInfo/ImagesNav";
import Tags from "../components/productInfo/Tags";
import Colors from "../components/productInfo/Colors";
import Sizes from "../components/productInfo/Sizes";
import Button from "../components/button/Button";
import OtherProductCard from "../components/productInfo/OtherProductCard";
import productImage from "../assets/cardProduct/productImage.svg";
import Return from "../assets/home/return.svg";
import shipping from "../assets/home/shipping.svg";
import security from "../assets/home/security.svg";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productOrderSchema,
  type ProductOrderFormData,
} from "../schemas/schema";
import { useState, useEffect } from "react";

interface ProductInfoProps {
  productName: string;
  rating: number;
  reviews: number;
  price: number;
  maxItems: number;
  stock?: number;
  oldPrice?: number;
}

export default function ProductInfo({
  productName,
  rating,
  reviews,
  price,
  stock,
  oldPrice,
  maxItems,
}: ProductInfoProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductOrderFormData>({
    resolver: zodResolver(productOrderSchema),
  });
  const handleAddCart = (data: ProductOrderFormData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    } else {
      navigate("/product-info");
    }
  };
  const handleBuyNow = (data: ProductOrderFormData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
    } else {
      navigate("/check-out");
    }
  };
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setValue("quantity", quantity);
  }, [quantity, setValue]);
  return (
    <section className="flex flex-col justify-center items-center py-8 px-4 mb-8 xl:px-[15.78rem]">
      <div className="flex flex-row w-full justify-start items-center gap-2 mb-[2.06rem]">
        <p
          onClick={() => navigate("/")}
          className="text-grayCustom3 font-segoe text-[0.875rem] text-center cursor-pointer"
        >
          Home
        </p>
        <p className="text-grayCustom3 font-segoe text-[0.875rem] text-center ">
          /
        </p>
        <p className="text-grayCustom3 font-segoe text-[0.875rem] text-center ">
          Sale
        </p>
        <p className="text-grayCustom3 font-segoe text-[0.875rem] text-center ">
          /
        </p>
        <p className="text-blackCustom font-segoe text-[0.875rem] text-center ">
          Premium Cotton T-Shirt
        </p>
      </div>
      <div className="flex w-full flex-col lg:flex-row md:gap-12 justify-center items-start">
        <div className="flex justify-center items-center mb-12">
          <ImageNavigation images={Images} />
        </div>
        <div className="flex flex-col items-start justify-center w-full">
          <div className="flex flex-col items-start justify-center gap-2 w-full mb-[1.73rem]">
            <div className="flex flex-row justify-start items-center gap-2">
              <Tags text="Tops" backgroundColor="whiteCustom" />
              <Tags text="Limited Times" backgroundColor="grayCustom" />
            </div>
            <h1 className="font-segoe text-blackCustom font-bold text-[1.875rem]">
              {productName}
            </h1>
            <h2 className="font-segoe text-grayCustom3">STYLE Premium</h2>
          </div>
          <div className="flex flex-row items-center justify-center mb-8">
            <div className="flex flex-row items-center justify-center mr-[0.6rem]">
              <img src={rating < 1 ? emptyStar : fullStar} alt="" />
              <img src={rating < 2 ? emptyStar : fullStar} alt="" />
              <img src={rating < 3 ? emptyStar : fullStar} alt="" />
              <img src={rating < 4 ? emptyStar : fullStar} alt="" />
              <img src={rating < 5 ? emptyStar : fullStar} alt="" />
            </div>
            <p className=" text-blackCustom font-segoe font-semibold mr-4">
              {rating}
            </p>
            <p className=" text-grayCustom3 font-segoe">({reviews} reviews)</p>
          </div>
          <div className="flex flex-row items-center justify-start gap-4 mb-7">
            <p className=" text-redCustom font-bold text-[1.875rem]">
              ${price}
            </p>
            {oldPrice && (
              <p className="text-grayCustom3 font-segoe text-[1.25rem] line-through">
                ${oldPrice}
              </p>
            )}
            {oldPrice && (
              <Tags
                text={`Save $${oldPrice - price}`}
                backgroundColor="redCustom"
              />
            )}
          </div>
          <div className="flex flex-row items-center justify-center gap-2 mb-6">
            <span
              className={`${stock ? "bg-[#16A34A]" : "bg-redCustom"} rounded-full w-3 h-3`}
            />
            <p
              className={`${stock ? "text-[#16A34A]" : "text-redCustom"} font-segoe font-semibold`}
            >
              {stock ? `In stock (${stock} left)` : "Out of stock"}
            </p>
          </div>
          <div className="flex flex-col items-start justify-center w-full mb-16">
            <form className="gap-6 flex flex-col w-full">
              <hr className="w-full border border-grayCustom" />
              <div className="flex flex-col gap-3 items-start justify-center">
                <h3 className="text-blackCustom font-semibold font-segoe">
                  Colors:
                </h3>
                <div className="flex flex-row gap-3">
                  {Colors.map((color, index) => {
                    const unavailable = color.quantity === 0;
                    return (
                      <label key={index} className="cursor-pointer relative">
                        <input
                          type="radio"
                          value={color.name}
                          {...register("color")}
                          disabled={unavailable}
                          className="hidden peer"
                        />
                        <div
                          className={`${color.bgColor} rounded-full w-10 h-10 ${unavailable && "opacity-50 cursor-not-allowed"} ring-2 ring-[#D1D5DB] transition-all hover:scale-110 peer-checked:ring-offset-2 peer-checked:ring-black`}
                        />
                        {unavailable && (
                          <p className="text-redCustom text-4xl font-segoe absolute top-0.75 right-3.75 opacity-50">
                            \
                          </p>
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.color && (
                  <p className="text-redCustom text-sm font-segoe">
                    {errors.color.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-3 items-start justify-center w-full">
                <h3 className="text-blackCustom font-semibold font-segoe">
                  Sizes:
                </h3>
                <div className="flex flex-row gap-2 w-full">
                  {Sizes.map((size, index) => {
                    const unavailable = size.quantity === 0;
                    return (
                      <label
                        key={index}
                        className="cursor-pointer relative flex-1"
                      >
                        <input
                          type="radio"
                          value={size.name}
                          {...register("size")}
                          disabled={unavailable}
                          className="hidden peer"
                        />
                        <div
                          className={`flex items-center justify-center w-full h-fit pt-[0.88rem] pb-[0.94rem] bg-white rounded-[0.625rem]  ${unavailable && "opacity-50 cursor-not-allowed"} cursor-pointer ring-2 ring-grayCustom transition-all hover:scale-110 peer-checked:ring-offset-2 peer-checked:ring-black`}
                        >
                          <p className="text-blackCustom font-segoe text-center">
                            {size.name}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
                <p className="text-blackCustom font-segoe text-[0.875rem] font-semibold">
                  Sizes guide
                </p>
                {errors.size && (
                  <p className="text-redCustom text-sm font-segoe">
                    {errors.size.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-center items-start gap-[0.81rem]">
                <h3 className="text-blackCustom font-semibold font-segoe">
                  Quantity:
                </h3>
                <div className="flex flex-row gap-[0.81rem] justify-start items-center">
                  <div className="flex flex-row border border-grayCustom bg-white rounded-[0.625rem] gap-[1.61rem] items-center justify-start w-fit">
                    <div className="flex items-center justify-center h-fit w-fit py-3 px-3">
                      <p
                        onClick={() => {
                          quantity === 1 ? null : setQuantity(quantity - 1);
                        }}
                        className={`text-blackCustom font-segoe font-semibold ${quantity === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        -
                      </p>
                    </div>
                    <p className="text-blackCustom font-segoe font-semibold">
                      {quantity}
                    </p>
                    <div className="flex items-center justify-center h-fit w-fit py-3 px-3">
                      <p
                        onClick={() => {
                          quantity === maxItems
                            ? null
                            : setQuantity(quantity + 1);
                        }}
                        className={`text-blackCustom font-segoe font-semibold ${quantity === maxItems ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        +
                      </p>
                    </div>
                  </div>
                  <p className="text-grayCustom3 font-segoe text-[0.875rem]">
                    Max {maxItems} items
                  </p>
                </div>
                {errors.quantity && (
                  <p className="text-redCustom text-sm font-segoe">
                    {errors.quantity.message}
                  </p>
                )}
              </div>
              <hr className="w-full border border-grayCustom" />
              <div className="flex flex-col justify-center items-center gap-4">
                <div className="flex flex-row justify-start items-center w-full gap-3">
                  <Button
                    src={cart}
                    text="Add to Cart"
                    type="button"
                    onClick={handleSubmit(handleAddCart)}
                    backgroundColor="blackCustom"
                    width="w-full"
                    imageSize="w-4 h-4"
                    px=""
                    py="pt-[0.75rem] pb-[0.81rem] h-max-[2.75rem]"
                  />
                  <Button
                    src={share}
                    type="button"
                    onClick={() => {}}
                    backgroundColor="whiteCustom"
                    imageSize="w-4 h-4"
                    hasBorder={true}
                    px="px-[2.06rem]"
                    py="py-[0.88rem] h-max-[2.75rem]"
                    width="w-fit"
                  />
                </div>
                <Button
                  text="Buy Now"
                  type="button"
                  onClick={handleSubmit(handleBuyNow)}
                  backgroundColor="whiteCustom"
                  hasBorder={true}
                  width="w-full"
                  px="px-0"
                  py="pt-[0.75rem] pb-[0.81rem] h-max-[2.75rem]"
                />
              </div>
              <hr className="w-full border border-grayCustom" />
              <div className="flex items-center justify-between flex-row">
                <div className="flex flex-col items-center justify-center">
                  <img src={shipping} className="w-8 h-8 mb-4" />
                  <h2 className="text-[0.875rem] font-segoe font-semibold text-center text-blackCustom mb-2">
                    Free Shipping
                  </h2>
                  <p className="text-center text-grayCustom3 text-[0.75rem]">
                    O orders over $50
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img src={Return} className="w-8 h-8 mb-4" />
                  <h2 className="text-[0.875rem] font-segoe font-semibold text-center text-blackCustom mb-2">
                    Easy Returns
                  </h2>
                  <p className="text-center text-grayCustom3 text-[0.75rem]">
                    30-day return policy
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <img src={security} className="w-8 h-8 mb-4" />
                  <h2 className="text-[0.875rem] font-segoe font-semibold text-center text-blackCustom mb-2">
                    Secure Payment
                  </h2>
                  <p className="text-center text-grayCustom3 text-[0.75rem]">
                    100% secure checkout
                  </p>
                </div>
              </div>
              <hr className="w-full border border-grayCustom" />
            </form>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-center px-1 py-1 h-8 bg-[#F3F4F6] rounded-[0.625rem] mb-6">
        <div className=" flex flex-row items-center justify-center gap-2 py-2 w-full h-full bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
          <p className="text-blackCustom font-segoe text-[0.875rem] font-semibold text-center">
            Description
          </p>
        </div>
        <div className=" flex flex-row items-center justify-center gap-2 w-full h-full">
          <p className="text-grayCustom3 font-segoe text-[0.875rem] font-semibold text-center">
            Specifications
          </p>
        </div>
        <div className="flex flex-row items-center justify-center gap-2 w-full h-full">
          <p className="text-grayCustom3 font-segoe text-[0.875rem] font-semibold text-center">
            Reviews ({reviews})
          </p>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col items-start justify-center px-[1.56rem] pt-[1.69rem] pb-[1.56rem] gap-[1.13rem] border border-grayCustom rounded-xl">
        <p className="text-blackCustom font-segoe text-[1.125rem]">
          Made from 100% premium organic cotton, this t-shirt offers exceptional
          comfort and style. The perfect addition to your wardrobe for both
          casual and semi-formal occasions.
        </p>
        <div className="w-full flex flex-col items-start justify-center gap-3">
          <p className="text-blackCustom font-segoe text-[1rem]">
            Key Features:
          </p>
          <ul className="list-disc space-y-[0.7rem] list-inside gap-[0.7rem] text-blackCustom font-segoe text-[1rem]">
            <li>100% Organic Cotton</li>
            <li>Pre-shrunk fabric</li>
            <li>Reinforced seams</li>
            <li>Machine washable</li>
            <li>Eco-friendly dyes</li>
          </ul>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-center gap-8 mt-16">
        <h2 className="text-blackCustom font-bold font-segoe text-[1.5rem]">
          You Might Also Like
        </h2>
        <div className="w-full flex flex-col md:flex-row justify-start items-start gap-6">
          <OtherProductCard
            src={productImage}
            alt="Cotton Blue Polo Shirt Full-Sleeve"
            title="Cotton Polo Shirt"
            price={39}
            rating={4.7}
            oldPrice={55}
            onClick={() => navigate("/product-info")}
          />
          <OtherProductCard
            src={productImage}
            alt="Navy Blue Casual Henley"
            title="Casual Henley"
            price={35}
            rating={4.6}
            onClick={() => navigate("/product-info")}
          />
          <OtherProductCard
            src={productImage}
            alt="Grey Premium Hoodie"
            title="Premium Hoodie"
            price={79}
            rating={4.8}
            oldPrice={99}
            onClick={() => navigate("/product-info")}
          />
        </div>
      </div>
    </section>
  );
}
