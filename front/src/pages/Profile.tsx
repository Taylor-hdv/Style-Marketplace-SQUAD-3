import heartIcon from "../assets/profile/heartIcon.svg";
import ordersIcon from "../assets/profile/ordersIcon.svg";
import ordersIcon2 from "../assets/profile/ordersIcon2.svg";
import settingsIcon from "../assets/profile/settingsIcon.svg";
import starIcon from "../assets/profile/starIcon.svg";
import cancelIcon from "../assets/profile/cancelIcon.svg";
import profileIcon from "../assets/profile/profileIcon.svg";
import Button from "../components/button/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MaskedInput from "react-maskedinput";
import { profileSchema, type ProfileFormData } from "../schemas/schema";
interface ProfileCardProps {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    orders: number;
    wishlist: number;
    ratings: number;
    memberSince: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
}
function Profile({firstName, lastName, email, profileImage, orders, wishlist, ratings, memberSince, phone, dateOfBirth, gender}: ProfileCardProps) {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema)
    });
    const onSubmit = (data: ProfileFormData) => {
        console.log(data);
    };
    return (
        <div className="w-full h-full px-0 xl:px-65">
            <div className="flex flex-col items-start justify-center gap-2 px-4 py-8 bg-white">
                <div className="flex flex-row items-center justify-center gap-6">
                    <div className="flex items-center justify-center w-fit h-fit bg-whiteCustom">
                        <img src={profileImage} alt="Profile Image" className="w-20 h-20" />
                    </div>
                    <div className="flex flex-col items-start justify-center mb-6 gap-0">
                        <h2 className="text-blackCustom font-segoe text-[1.875rem] font-bold">{firstName} {lastName}</h2>
                        <p className="text-grayCustom3 text-[1rem] font-segoe mb-2">{email}</p>
                        <div className="flex flex-row items-center justify-start gap-4">
                            <div className="items-center justify-center w-fit px-[0.69rem] py-[0.19rem] bg-[#F3F4F6] rounded-[624.9375rem]">
                                <p className="text-blackCustom font-segoe text-[0.75rem] font-semibold">{orders} Orders</p>
                            </div>
                            <div className="items-center justify-center w-fit px-[0.69rem] py-[0.19rem] bg-[#F3F4F6] rounded-[624.9375rem]">
                                <p className="text-blackCustom font-segoe text-[0.75rem] font-semibold">member since {memberSince}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-row items-center justify-center px-1 py-1 h-8 bg-[#F3F4F6] rounded-[0.625rem]">
                    <div className=" flex flex-row items-center justify-center gap-2 py-2 w-full h-full bg-white rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                        <img src={profileIcon} alt="Profile Icon" className="w-4 h-4 hidden md:block" />
                        <p className="text-blackCustom font-segoe text-[0.875rem] font-semibold text-center">Profile</p>
                    </div>
                    <div className=" flex flex-row items-center justify-center gap-2 w-full h-full">
                        <img src={ordersIcon} alt="Orders Icon" className="w-4 h-4 hidden md:block" />
                        <p className="text-grayCustom3 font-segoe text-[0.875rem] font-semibold text-center">Orders</p>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2 w-full h-full">
                        <img src={settingsIcon} alt="Settings Icon" className="w-4 h-4 hidden md:block" />
                        <p className="text-grayCustom3 font-segoe text-[0.875rem] font-semibold text-center">Settings</p>
                    </div>
                </div>
                <section className="flex flex-col items-center justify-center w-full gap-6 px-6 py-6 bg-white rounded-xl border border-grayCustom shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <div className="flex flex-row items-center justify-between w-full gap-[5.32rem]">
                        <p className="text-blackCustom font-segoe text-6 font-semibold">Profile Information</p>
                        <Button type="button" onClick={() => reset()} backgroundColor="whiteCustom" hasBorder={true} src={cancelIcon} px="px-[0.81rem]" py="pt-[0.47rem] pb-[0.53rem]" text="Cancel" textSize="text-[0.875rem]" width="w-fit" />
                    </div>
                    <form className="flex flex-col items-start justify-center w-full gap-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                                <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >First Name</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                <input aria-label="First Name" {...register("firstName")} type="text" placeholder={firstName} className="w-full text-[1rem] font-segoe text-blackCustom placeholder:text-blackCustom focus:outline-none" />
                                </div> 
                                {errors.firstName && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.firstName.message}</span>}
                            </div>
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                            <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Last Name</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                    <input aria-label="Last Name" {...register("lastName")} type="text" placeholder={lastName} className="w-full text-[1rem] font-segoe text-blackCustom placeholder:text-blackCustom focus:outline-none" />
                                </div> 
                                {errors.lastName && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.lastName.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                                <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Email</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                    <input aria-label="Email" {...register("email")} type="email" placeholder={email} className="w-full text-[1rem] font-segoe text-blackCustom placeholder:text-blackCustom focus:outline-none" />
                                </div> 
                                {errors.email && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.email.message}</span>}
                            </div>
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                            <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Phone</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <MaskedInput
                                                mask="(11) 11111-1111"
                                                aria-label="Phone"
                                                placeholder={phone}
                                                value={field.value}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                className="w-full text-[1rem] font-segoe text-blackCustom placeholder:text-blackCustom focus:outline-none"
                                            />
                                        )}
                                    />
                                </div>
                                {errors.phone && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.phone.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 w-full">
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                            <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Date of Birth</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                    <input aria-label="Date of Birth" {...register("dateOfBirth")} type="date" placeholder={dateOfBirth} className="w-full text-[1rem] font-segoe text-blackCustom placeholder:text-blackCustom focus:outline-none" />
                                </div> 
                                {errors.dateOfBirth && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.dateOfBirth.message}</span>}
                            </div>
                            <div className="flex flex-col items-start justify-center w-full gap-[0.78rem]">
                            <label className="font-segoe text-[0.875rem] text-blackCustom font-semibold" >Gender</label>
                                <div className="flex flex-row justify-start items-center w-full h-10 px-[0.81rem] border border-grayCustom bg-white rounded-xl" >
                                    <select aria-label="Gender" {...register("gender")} defaultValue={gender} className="w-full text-[1rem] font-segoe text-blackCustom focus:outline-none">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non Binary">Non Binary</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div> 
                                {errors.gender && <span className="text-redCustom text-[0.75rem] font-segoe">{errors.gender.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start w-full gap-4">
                            <Button type="submit" py="pt-[0.59rem] pb-[0.66rem]" px="px-4" width="w-fit" backgroundColor="blackCustom" text="Save Changes" textSize="text-[0.875rem]" />
                            <Button type="button" onClick={() => reset()} py="pt-[0.59rem] pb-[0.66rem]" px="px-[1.06rem]" width="w-fit" backgroundColor="whiteCustom" hasBorder={true} text="Cancel" textSize="text-[0.875rem]" />
                        </div>
                    </form>
                </section>
                <div className="flex flex-col items-center justify-start w-full gap-6">
                    <div className="flex flex-col items-center justify-center w-full  w-max-89 h-35 py-6 bg-white rounded-xl border border-grayCustom shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                        <img src={ordersIcon2} alt="Orders Icon" className="w-8 h-8 mb-2" />
                        <p className="text-blackCustom font-segoe text-[1.5rem] font-bold text-center">{orders}</p>
                        <p className="text-grayCustom3 font-segoe text-[0.875rem]">Total orders</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full w-max-89 h-35 py-6 bg-white rounded-xl border border-grayCustom shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                        <img src={heartIcon} alt="Orders Icon" className="w-8 h-8 mb-2" />
                        <p className="text-blackCustom font-segoe text-[1.5rem] font-bold text-center">{wishlist}</p>
                        <p className="text-grayCustom3 font-segoe text-[0.875rem]">Wishlist Items</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full w-max-89 h-35 py-6 bg-white rounded-xl border border-grayCustom shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                        <img src={starIcon} alt="Orders Icon" className="w-8 h-8 mb-2" />
                        <p className="text-blackCustom font-segoe text-[1.5rem] font-bold text-center">{ratings}</p>
                        <p className="text-grayCustom3 font-segoe text-[0.875rem]">Avg. rating</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Profile;