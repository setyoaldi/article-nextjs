import { Header } from "@/types/global";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { AlertDialogCategory } from "../popup-alert/alert";

function HeaderComponent({
  style,
  title,
  wraperProfileStyle,
  imgStyle,
  profileTextStyle,
  wrapperTitleStyle,
  profileText,
  titleStyle,
  logoUrl,
  logoStyle,
  logoClickable,
  logoRedirectTo,
  dropdown,
  hamburgerMenu,
  handleNavbarClicked,
}: Header) {
  const [swetAlert, setSwetAlert] = useState({
    open: false,
    title: "",
    description: "",
    firstButtonText: "",
    secondButtonText: "",
    responValue: "",
    id: "",
  });
  const router = useRouter();
  const handleLogoClick = () => {
    if (logoClickable && logoRedirectTo) {
      router.push(logoRedirectTo);
    }
  };
  const handleGoToProfile = () => {
    router.push("/user/user-profile");
  };
  const handleProfileClick = () => {
    router.push("/admin/user-profile", { scroll: false });
  };
  const handleLogOut = () => {
    setSwetAlert((prev) => ({
      ...prev,
      open: true,
      title: "Logout",
      description: `Are you sure want to logout?`,
    }));
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
    <>
      <header className={`${style}`}>
        <div
          className={`title ${wrapperTitleStyle} ${
            hamburgerMenu && "flex items-center gap-2"
          }`}
        >
          {hamburgerMenu && (
            <Menu
              onClick={handleNavbarClicked}
              className="min-[1070px]:hidden cursor-pointer hover:opacity-70"
              size={27}
            />
          )}
          {title && <h2 className={`title ${titleStyle}`}>{title}</h2>}
          {logoUrl && (
            <img
              className={`${logoStyle} ${
                logoClickable ? "cursor-pointer" : ""
              }`}
              onClick={handleLogoClick}
              src={logoUrl}
              alt="this logo of header"
            />
          )}
        </div>
        {dropdown === "yes" ? (
          <DropdownMenu>
            <div className="relative">
              <DropdownMenuTrigger asChild>
                <div
                  className={`${wraperProfileStyle} profile cursor-pointer w-full`}
                >
                  <div className={`${imgStyle}`}>
                    <p>{profileText?.substring(0, 1).toUpperCase()}</p>
                  </div>
                  <p className={`${profileTextStyle}`}>{profileText}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="mt-2 w-48 z-50 bg-white shadow-md border border-gray-200"
              >
                <DropdownMenuItem
                  onClick={handleGoToProfile}
                  className="cursor-pointer"
                >
                  My Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogOut}
                  className="cursor-pointer flex gap-2 items-center"
                >
                  <LogOut size={16} className="text-[#EF4444]" />
                  <span className="text-[#EF4444]">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        ) : (
          <div
            className={`${wraperProfileStyle} profile cursor-pointer`}
            onClick={handleProfileClick}
          >
            <div className={`${imgStyle}`}>
              <p>{profileText?.substring(0, 1).toUpperCase()}</p>
            </div>
            <p className={`${profileTextStyle} max-[500px]:hidden`}>
              {profileText}
            </p>
          </div>
        )}
      </header>
      <AlertDialogCategory
        open={swetAlert?.open}
        description={swetAlert?.description}
        title={swetAlert?.title}
        onDialogClose={onDialogCloseRespon}
        onClose={handleCloseAlert}
      />
    </>
  );
}

export default HeaderComponent;
