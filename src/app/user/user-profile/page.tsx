"use client";

import HeaderComponent from "@/components/header/header";
import logoBiru from "../../../../public/logoipsum-biru.png";
import { UserProfile } from "@/types/global";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/api/admin";
import PrimaryButton from "@/components/button/primary-button";
import FooterComponent from "@/components/footer/footer";
import logoPutih from "../../../../public/logoipsum-biru.png";
import { useRouter } from "next/navigation";

export default function UserProfileComponent() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
    };
    fetchUserProfile();
  }, []);

  const handleBackButton = () => {
    router.push("/user/login");
  };

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <HeaderComponent
        style="w-full bg-[#F9FAFB] h-[68px] flex justify-between items-center px-10 border-b border-b-[#E2E8F0]"
        wraperProfileStyle="flex gap-1 items-center"
        imgStyle="bg-[#BFDBFE] flex justify-center font-semibold text-[#1E3A8A] items-center rounded-full h-[32px] w-[32px]"
        titleStyle="font-bold text-lg"
        profileTextStyle={`underline font-semibold max-[640px]:hidden text-black text-sm cursor-pointer opacity-80`}
        logoUrl={logoBiru?.src}
        logoStyle="w-[7rem] opacity-80"
        profileText={userProfile?.username}
        dropdown={"yes"}
      />
      <div className="w-full flex-grow flex justify-center items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-8">
            <h1 className="text-[#0F172A] text-xl font-semibold">
              User Profile
            </h1>
            <div className="bg-[#BFDBFE] flex justify-center text-2xl font-semibold text-[#1E3A8A] items-center rounded-full h-[68px] w-[68px]">
              {userProfile?.username?.substring(0, 1).toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-[368px] max-[500px]:w-[80vw] h-[44px] rounded-[6px] bg-[#F3F4F6] border border-[#E2E8F0] flex py-[10px] px-[12px]">
              <p className="w-[26%] max-[500px]:w-[35%] text-[#111827] font-semibold">
                Username
              </p>
              <span className="w-[5%] max-[500px]:w-[10%]">:</span>
              <p className="w-[69%] max-[500px]:w-[50%] text-[#0F172A] text-center">
                {userProfile?.username}
              </p>
            </div>
            <div className="w-[368px] h-[44px] max-[500px]:w-[80vw] rounded-[6px] bg-[#F3F4F6] border border-[#E2E8F0] flex py-[10px] px-[12px]">
              <p className="w-[26%] max-[500px]:w-[35%] text-[#111827] font-semibold">
                Password
              </p>
              <span className="w-[5%] max-[500px]:w-[10%]">:</span>
              <p className="w-[69%] max-[500px]:w-[50%] text-[#0F172A] text-center">
                XXXXXX
              </p>
            </div>
            <div className="w-[368px] h-[44px] max-[500px]:w-[80vw] rounded-[6px] bg-[#F3F4F6] border border-[#E2E8F0] flex py-[10px] px-[12px]">
              <p className="w-[26%] max-[500px]:w-[35%] text-[#111827] font-semibold">
                Role
              </p>
              <span className="w-[5%] max-[500px]:w-[10%]">:</span>
              <p className="w-[69%] max-[500px]:w-[50%] text-[#0F172A] text-center">
                {userProfile?.role}
              </p>
            </div>
            <PrimaryButton
              onClick={handleBackButton}
              styles="bg-[#2563EB] max-[500px]:w-[80vw] cursor-pointer rounded-md w-full text-white text-sm px-2 py-[0.7rem] hover:opacity-80 mt-3"
              text="Back to home"
            />
          </div>
        </div>
      </div>
      <FooterComponent
        style="w-full bg-[#2563EBDB] mt-8 min-h-[68px] max-[555px]:gap-0 max-[555px]:py-3 flex max-[555px]:flex-col justify-center gap-4 items-center px-16 max-[500px]:px-5"
        wraperProfileStyle="flex gap-1 items-center"
        titleStyle="font-bold text-lg"
        profileTextStyle="underline font-semibold text-sm cursor-pointer"
        logoUrl={logoPutih?.src}
        logoStyle="w-[7rem]"
        imgStyle="text-white"
        profileText="© 2025 Blog genzet. All rights reserved."
      />
    </div>
  );
}
