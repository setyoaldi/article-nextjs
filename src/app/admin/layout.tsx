"use client";

import HeaderComponent from "@/components/header/header";
import SidebarComponent from "@/components/sidebar/sidebar";
import { getUserProfile } from "@/api/admin";
import { UserProfile } from "@/types/global";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [openNavbar, setOpenNavbar] = useState(false);
  const currentRoute = usePathname();
  let patchName = "";
  if (currentRoute.startsWith("/admin/article")) {
    patchName = "Articles";
  } else if (currentRoute.startsWith("/admin/category")) {
    patchName = "Category";
  }
  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
    };
    fetchUserProfile();
  }, []);

  const handleNavbarIconClicked = () => {
    setOpenNavbar(!openNavbar);
  };

  return (
    <div className="min-[1070px]:flex min-h-screen">
      <SidebarComponent
        handleNavbarClicked={handleNavbarIconClicked}
        isOpenNav={openNavbar}
      />
      <main className="flex-1 bg-[#F3F4F6]">
        <HeaderComponent
          style="w-full bg-[#F9FAFB] h-[68px] flex justify-between items-center px-5 border-b border-b-[#E2E8F0]"
          wraperProfileStyle="flex gap-1 items-center"
          imgStyle="bg-[#BFDBFE] flex justify-center font-semibold text-[#1E3A8A] items-center rounded-full h-[32px] w-[32px]"
          titleStyle="font-bold text-lg"
          profileTextStyle="underline font-semibold text-sm cursor-pointer"
          title={patchName}
          profileText={userProfile?.username}
          hamburgerMenu={true}
          handleNavbarClicked={handleNavbarIconClicked}
        />

        <div className="w-full h-[calc(100vh-68px)] bg-[#F3F4F6] max-[750px]:min-h-screen p-[24px] max-[750px]:overflow-x-auto overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
