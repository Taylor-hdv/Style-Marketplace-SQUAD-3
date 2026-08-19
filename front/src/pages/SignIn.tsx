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
import { SignInSchema, type SignInFormData } from "../schemas/schema";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: { errors }} = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });
  const navigate = useNavigate();
  
  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    navigate("/home");
  };
  return (
        <section className="flex flex-col items-center justify-center w-full h-full py-12 lg:py-32 md:w-md mx-auto px-4 gap-2 bg-[linear-gradient(135deg,rgba(243,244,246,0.30)_0%,rgba(243,244,246,0.10)_100%)]">
            <div className="flex flex-row gap-2 items-center ">
                <img src={logo} alt="Logo" className="w-10 h-10" />
                <p className="text-blackCustom font-bold text-[1.5rem] font-segoe">STYLE</p>
            </div>
            <p className="text-grayCustom3 font-segoe text-center pb-6">Welcome back to your passion</p>
            <section className="flex flex-col items-center justify-center px-6 pb-6 w-full gap-6 bg-white rounded-xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)]">
                <div className="flex flex-col items-center justify-center w-full gap-1 pt-6">
                    <h2 className="text-blackCustom font-segoe text-[1.5rem] font-bold text-center">Sign In</h2>
                    <p className="text-grayCustom3 font-segoe text-center text-[0.988rem]">Enter your credencials to acess your account</p>
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
                    <div className="flex flex-col items-start justify-center w-full gap-[0.78rem] mb-[0.34rem]">
                        <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Email Adress</label>
                            <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                <img src={emailIcon} alt="" className="w-4 h-4" />
                                <input aria-label="Email Adress" {...register("email")} type="email" placeholder="Enter your email" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                            </div> 
                            {errors.email && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col w-full gap-2 mb-[0.34rem]" >
                            <div className="flex flex-row items-center justify-between w-full">
                                <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Password</label>
                                <p className="text-blackCustom text-[0.875rem] font-segoe cursor-pointer" onClick={() => navigate("/forgot-password")}>Forgot Password?</p>
                            </div>
                            <div className="flex flex-row justify-start items-center w-full px-3 py-3 border border-grayCustom bg-white relative gap-[0.8rem] rounded-xl" >
                                <img src={passwordIcon} alt="" className="w-4 h-4" />
                                <input type={showPassword ? "text" : "password"} {...register("password")} aria-label="Password" placeholder="Create a password" className="w-full text-[1rem] font-segoe text-grayCustom3 focus:outline-none" />
                                <button type="button" aria-label={showPassword ? "hide password" : "show password"} className="absolute right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    <img src={showPassword ? visible : nonVisible} alt={showPassword ? "hide password" : "show password"} className="w-4 h-4" />
                                </button>
                            </div>
                            {errors.password && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.password.message}</span>}
                    </div>
                <Button type="submit" py="py-[0.72rem]" px="px-8" width="w-full" backgroundColor="blackCustom" text="Sign In" textSize="text-[0.875rem]" hasBorder={false} />
                </form>
                <p className="text-grayCustom3 font-segoe text-center font-semibold text-[0.875rem]">Don't have an account? <a className="text-blackCustom text-[0.875rem] text-center font-semibold cursor-pointer" onClick={() => navigate("/sign-up")}>Sign Up</a></p>
            </section>
            <p className="text-grayCustom3 font-segoe text-center font-semibold text-[0.875rem]">By signing in, you agree to our <a className="text-blackCustom text-[0.875rem] text-center font-semibold cursor-pointer" onClick={() => navigate("/terms-and-conditions")}>Terms and Conditions</a> and <a className="text-blackCustom text-[0.875rem] text-center font-semibold cursor-pointer" onClick={() => navigate("/privacy-policy")}>Privacy Policy</a></p>
        </section>
  )
}
export default SignUp;
