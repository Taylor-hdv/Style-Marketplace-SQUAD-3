import Header from "../components/header&footer/Header";
import Button from "../components/button/Button";
import logo from "../assets/logo/logo.svg";
import checkboxDefault from "../assets/signUp/checkboxDefault.svg";
import checkboxChecked from "../assets/signUp/checkboxChecked.svg";
import visible from "../assets/signUp/visible.svg";
import nonVisible from "../assets/signUp/nonVisible.svg";
import passwordIcon from "../assets/signUp/passwordIcon.svg";
import personIcon from "../assets/signUp/personIcon.svg";
import emailIcon from "../assets/signUp/emailIcon.svg";
import googleIcon from "../assets/signUp/googleIcon.svg";
import facebookIcon from "../assets/signUp/facebookIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpFormData } from "../schemas/schema";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: { errors }} = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });
  const navigate = useNavigate();
  
  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    navigate("/home");
  };
  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-[linear-gradient(135deg,rgba(243,244,246,0.30)_0%,rgba(243,244,246,0.10)_100%)]">
        <Header notifications={2} />
        <section className="flex flex-col items-center justify-center w-full h-full py-12 lg:py-32 md:w-md px-4 gap-2">
            <div className="flex flex-row gap-2 items-center ">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <p className="text-blackCustom font-bold text-[1.5rem] font-segoe">STYLE</p>
            </div>
            <p className="text-grayCustom3 font-segoe text-center pb-6">Create your account and start shopping</p>
            <section className="flex flex-col items-center justify-center px-6 pb-6 w-full gap-6 bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                <div className="flex flex-col items-center justify-center w-full gap-1 pt-6">
                    <h2 className="text-blackCustom font-segoe text-[1.5rem] font-bold text-center">Create Account</h2>
                    <p className="text-grayCustom3 font-segoe text-center text-[0.988rem]">Join our community and discover amazing fashion</p>
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-1">
                    <button className="flex flex-row items-center justify-center w-full gap-4 px-4 py-[0.6rem] cursor-pointer border border-grayCustom rounded-lg">
                        <img src={googleIcon} alt="GoogleIcon" className="w-4 h-4" />
                        <p className="text-blackCustom font-segoe text-[0.875rem] font-semibold text-center">Continue with Google</p>
                    </button>
                    <button className="flex flex-row items-center justify-center w-full gap-4 px-4 py-[0.6rem] cursor-pointer border border-grayCustom rounded-lg">
                        <img src={facebookIcon} alt="FacebookIcon" className="w-4 h-4" />
                        <p className="text-blackCustom font-segoe text-[0.875rem] font-semibold text-center">Continue with Facebook</p>
                    </button>
                </div>
                <div className="flex flex-row items-center justify-center w-full gap-2">
                    <hr className="flex-1 border-t border-grayCustom" />
                    <p className="text-grayCustom3 font-segoe text-[0.75rem] uppercase">or create with email</p>
                    <hr className="flex-1 border-t border-grayCustom" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start justify-center w-full gap-4">
                    <div className="flex flex-row items-start justify-center w-full gap-4 mb-[0.34rem]">
                        <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                           <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >First Name</label>
                                <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                    <img src={personIcon} alt="" className="w-4 h-4" />
                                    <input aria-label="First Name" {...register("firstName")} type="text" placeholder="First Name" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                                </div>
                                {errors.firstName && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.firstName.message}</span>}
                        </div>
                        <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                           <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Last Name</label>
                                <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                    <input aria-label="Last Name" {...register("lastName")} type="text" placeholder="Last Name" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                                </div> 
                                {errors.lastName && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.lastName.message}</span>}
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center w-full gap-[0.78rem] mb-[0.34rem]">
                        <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Email Adress</label>
                            <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                <img src={emailIcon} alt="" className="w-4 h-4" />
                                <input aria-label="Email Adress" {...register("email")} type="email" placeholder="Enter your email" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                            </div> 
                            {errors.email && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col w-full gap-2 mb-[0.34rem]" >
                        <div className="flex flex-col items-start justify-center gap-[0.8rem]">
                            <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Password</label>
                            <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                <img src={passwordIcon} alt="" className="w-4 h-4" />
                                <input type={showPassword ? "text" : "password"} {...register("password")} aria-label="Password" placeholder="Create a password" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                                <button type="button" aria-label={showPassword ? "hide password" : "show password"} className="absolute right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <img src={showPassword ? visible : nonVisible} alt={showPassword ? "hide password" : "show password"} className="w-4 h-4" />
                                </button>
                            </div>
                            {errors.password && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.password.message}</span>}
                        </div>
                        <p className="text-grayCustom3 text-[0.75rem] font-segoe">Must be at least 8 characters long</p>
                    </div>
                    <div className="flex flex-col w-full gap-[0.8rem]" >
                        <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Confirm Password</label>
                        <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                            <img src={passwordIcon} alt="" className="w-4 h-4" />
                            <input type={showPassword ? "text" : "password"} {...register("confirmPassword")} aria-label="Confirm Password" placeholder="Confirm your password" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                            <button type="button" aria-label={showPassword ? "hide password" : "show password"} className="absolute right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? visible : nonVisible} alt={showPassword ? "hide password" : "show password"} className="w-4 h-4" />
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.confirmPassword.message}</span>}
                    </div>
                <div className="flex flex-col items-start justify-center gap-[0.78rem] w-full">
                    <div className="flex flex-row items-center justify-start gap-2">
                        <label className="w-4 h-4 cursor-pointer">
                            <input type="checkbox" className="peer hidden" {...register("checkBox")} />
                            <img src={checkboxChecked} alt="Checked" className="w-4 h-4 hidden peer-checked:block" />
                            <img src={checkboxDefault} alt="Unchecked" className="w-4 h-4 peer-checked:hidden" />
                        </label>
                        <p className="text-blackCustom text-[0.875rem] font-segoe font-semibold">I agree to the Terms of Service and Privacy Policy</p>
                    </div>
                    {errors.checkBox && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.checkBox.message}</span>}
                    <div className="flex flex-row items-center justify-start gap-2">
                        <label className="w-4 h-4 cursor-pointer">
                            <input type="checkbox" className="peer hidden" />
                            <img src={checkboxChecked} alt="Checkbox" className="w-4 h-4 hidden peer-checked:block" />
                            <img src={checkboxDefault} alt="Unchecked" className="w-4 h-4 peer-checked:hidden" />
                        </label>
                        <p className="text-blackCustom text-[0.875rem] font-segoe font-semibold">Subscribe to our newsletter for exclusive offers and updates</p>
                    </div>
                </div>
                <Button type="submit" py="py-[0.72rem]" px="px-8" width="w-full" backgroundColor="blackCustom" text="Create Account" textSize="text-[0.875rem]" hasBorder={false} />
                </form>

                <p className="text-grayCustom3 font-segoe text-center font-semibold text-[0.875rem]">Already have an account? <a className="text-blackCustom text-[0.875rem] text-center font-semibold cursor-pointer" onClick={() => navigate("/login")}>Log in</a></p>
            </section>
        </section>
    </div>

  )
}
export default SignUp;
