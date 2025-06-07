"use client";

import LogoImage from "../../assets/logoipsum-putih.png";
import { redirect, usePathname } from "next/navigation";
import { LogOut, NewspaperIcon, TagIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { AlertDialogCategory } from "../popup-alert/alert";
import { Sidebar } from "@/types/global";
import Image from "next/image";

function SidebarComponent({ isOpenNav, handleNavbarClicked }: Sidebar) {
  const [swetAlert, setSwetAlert] = useState({
    open: false,
    title: "",
    description: "",
    firstButtonText: "",
    secondButtonText: "",
    responValue: "",
    id: "",
  });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();
  const activeIndex = pathname.startsWith("/admin/article")
    ? 0
    : pathname.startsWith("/admin/category")
    ? 1
    : -1;

  const sidebarContent = [
    {
      label: "Articles",
      href: "/admin/article",
      icon: <NewspaperIcon className="w-[20px] h-[20px]" />,
    },
    {
      label: "Category",
      href: "/admin/category",
      icon: <TagIcon className="w-[20px] h-[20px]" />,
    },
    {
      label: "Logout",
      href: "logout",
      icon: <LogOut className="w-[20px] h-[20px]" />,
    },
  ];
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 500);
      if (window.innerWidth < 500) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const handleSidebarClick = (routh: string) => {
    if (routh !== "logout") {
      if (isSmallScreen && handleNavbarClicked) {
        handleNavbarClicked();
      }
      redirect(routh);
    } else {
      setSwetAlert((prev) => ({
        ...prev,
        open: true,
        title: "Logout",
        description: `Are you sure want to logout?`,
      }));
    }
  };
  const onDialogCloseRespon = async (responValue?: true | false) => {
    setSwetAlert((prev) => ({ ...prev, open: false }));
    if (responValue) {
      try {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        document.cookie = "token=; Max-Age=0; path=/;";
        document.cookie = "role=; Max-Age=0; path=/;";
        window.location.reload();
      } catch (e) {
        throw new Error(`Error when try to delete article: ${e}`);
      }
    }
  };
  const handleCloseAlert = () => {
    setSwetAlert((prev) => ({ ...prev, open: false }));
  };
  return (
    <div className={`max-[1070px]:relative`}>
      <aside
        className={`w-[267px] bg-[#2563EB] p-5 max-[1070px]:absolute min-h-screen max-[1070px]:z-50 duration-1000 ${
          isOpenNav ? "left-0" : "-left-[20rem]"
        }`}
      >
        <div className="max-[1070px]:flex max-[1070px]:justify-between max-[1070px]:items-center">
          <Image
            className="w-[8rem] max-[500px]:w-[8rem]"
            src={LogoImage?.src}
            alt="Image of header login"
            width={128}
            height={128}
          />
          <X
            onClick={handleNavbarClicked}
            size={26}
            color="white"
            className="min-[1070px]:hidden cursor-pointer hover:opacity-70"
          />
        </div>
        <ul className="space-y-2 mt-5">
          {sidebarContent.map(
            (el: { label: string; href: string; icon: React.ReactNode }, i) => (
              <li
                key={el?.label}
                onClick={() => handleSidebarClick(el?.href)}
                className={`w-full h-full text-white cursor-pointer flex pl-3 p-2 gap-3 rounded-md items-center ${
                  activeIndex === i ? "bg-[#3B82F6]" : ""
                }`}
              >
                {el?.icon}
                {el?.label}
              </li>
            )
          )}
        </ul>
      </aside>
      <AlertDialogCategory
        open={swetAlert?.open}
        description={swetAlert?.description}
        title={swetAlert?.title}
        onDialogClose={onDialogCloseRespon}
        onClose={handleCloseAlert}
      />
    </div>
  );
}
export default SidebarComponent;
