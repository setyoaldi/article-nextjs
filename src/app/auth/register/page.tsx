"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputTypeText from "@/components/input/text-input";
import InputTypeSelect from "@/components/input/select";
import PrimaryButton from "@/components/button/primary-button";
import InputTypePassword from "@/components/input/password-input";
import { InputSelect } from "@/types/global";
import LogoIpsumBiru from "../../../../public/logoipsum-biru.png";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "@/api/auth";

export default function RegisterPage() {
  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const registerSchema = z.object({
    username: z.string().nonempty("Username field cannot be empty"),
    password: z
      .string()
      .nonempty("Password field cannot be empety")
      .min(8, "Password must be at least 8 characters long"),
    role: z.string().nonempty("Please choose role"),
  });
  const {
    formState: { errors, isValid },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "",
    },
    mode: "all",
  });
  const dropDownSelectRole: InputSelect[] = [
    { label: "User", value: "User" },
    { label: "Admin", value: "Admin" },
  ];
  const handleEyeClicked = () => {
    setIsEyeOpen(!isEyeOpen);
  };
  const handleFormSubmit = async () => {
    const formValue = control?._formValues;
    if (isValid) {
      try {
        const res = await registerUser({
          username: formValue?.username,
          password: formValue?.password,
          role: formValue?.role,
        });
        if (res) {
          toast.success("Register successfully");
          window.location.href = "/auth/login";
        }
      } catch (e) {
        toast.error(`Failed Register ${e}`);
      }
    } else {
      // handle error
    }
    reset();
  };

  return (
    <>
      <div className="w-[400px] min-h-[452px] bg-[#FFFFFF] max-[500px]:w-full max-[500px]:flex max-[500px]:items-center max-[500px]:flex-col max-[500px]:p-0 max-[500px]:px-7 max-[500px]:justify-center max-[500px]:rounded-none max-[500px]:min-h-screen rounded-[12px] p-4">
        <header className="w-full mt-5 max-[500px]:mt-0 flex justify-center items-center mb-5">
          <img
            className="w-[7rem] max-[500px]:w-[8rem]"
            src={LogoIpsumBiru?.src}
            alt="Image of header register"
          />
        </header>
        <form className="w-full pb-4">
          <div>
            <label className="text-sm font-semibold">Username</label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputTypeText
                  onChange={onChange}
                  errorMessage={errors?.username?.message}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Input username"
                  inputStyle="focus:outline-none w-full h-[2.2rem] text-sm p-[0.4rem]"
                  inputStyleFromComponent="flex items-center border-1 min-w-full p-[0.1rem] rounded-md focus:outline"
                  type="text"
                />
              )}
              name="username"
            />
          </div>

          {/* Input Password Section */}
          <div className="mt-3">
            <label className="text-sm font-semibold">Password</label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputTypePassword
                  onChange={onChange}
                  errorMessage={errors?.password?.message}
                  onBlur={onBlur}
                  value={value}
                  type={isEyeOpen ? "text" : "password"}
                  preffixIcon={
                    isEyeOpen ? (
                      <Eye
                        className="cursor-pointer opacity-50"
                        onClick={handleEyeClicked}
                        size={16}
                      />
                    ) : (
                      <EyeOff
                        className="cursor-pointer opacity-50"
                        onClick={handleEyeClicked}
                        size={16}
                      />
                    )
                  }
                  inputStyle="focus:outline-none w-full text-sm h-[2.2rem] p-[0.4rem]"
                  placeholder="Input password"
                />
              )}
              name="password"
            />
          </div>
          <div className="mt-3">
            <label className="text-sm font-semibold">Role</label>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputTypeSelect
                  onChange={onChange}
                  errorMessage={errors?.role?.message}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Select Role"
                  dropDownValue={dropDownSelectRole}
                  inputStyle="focus:outline-none w-full text-sm p-[0.1rem] text-sm w-full h-[2.2rem]"
                  inputStyleFromComponent="flex p-[0.1rem] items-center pr-2 border-1 min-w-full rounded-md focus:outline"
                />
              )}
              name="role"
            />
          </div>
          <div className="mt-7">
            <PrimaryButton
              onClick={handleSubmit(handleFormSubmit)}
              styles="bg-[#2563EB] cursor-pointer rounded-sm w-full text-white text-sm px-2 py-[0.45rem]"
              text="Register"
            />
          </div>
          <div className="mt-7">
            <p className="text-center text-sm">
              Already have account ?
              <span className="ml-1">
                <PrimaryButton
                  patchName="/login"
                  styles="underline text-blue-700"
                  text="Login"
                />
              </span>
            </p>
          </div>
        </form>
        <Toaster position="bottom-right" />
      </div>
    </>
  );
}
