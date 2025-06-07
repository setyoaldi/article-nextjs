"use client";

import HeaderComponent from "@/components/header/header";
import { UserProfile } from "@/types/global";
import { useEffect, useState } from "react";
import logoImageUrl from "../../../assets/logoipsum-biru.png";
import logoFooterImageUrl from "../../../assets/logoipsum-putih.png";
import { getUserProfile } from "@/api/admin";
import FooterComponent from "@/components/footer/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { CircleX } from "lucide-react";
import imageNotAvailable from "../../../assets/image not availabe.jpg";
import { formatDate } from "@/utils/helper";

interface EditData {
  articleId: string;
  articleContent?: string;
  articleTitle?: string;
  imageUrl: string;
  categoryId: string;
  categoryName: string;
  createAd: string;
}

function PreviewComponent() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [dataFromParam, setDataFromParam] = useState<EditData>();
  const [isFromEdit, setIsFromEdit] = useState(false);

  const queryParamsArticle = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const content = localStorage.getItem("temporaryContentPreview");
    const isFromEdit = queryParamsArticle.get("fromEdit") ?? false;
    const dataEditCategory: EditData = {
      articleId: queryParamsArticle.get("articleId") ?? "",
      articleTitle: queryParamsArticle.get("title") ?? "",
      imageUrl: queryParamsArticle.get("imageUrl") ?? "",
      categoryId: queryParamsArticle.get("categoryId") ?? "",
      categoryName: queryParamsArticle.get("categoryName") ?? "",
      createAd: queryParamsArticle.get("createAd") ?? "",
      articleContent: content ?? "",
    };
    if (dataEditCategory?.categoryId) {
      setDataFromParam(dataEditCategory);
      setIsFromEdit(isFromEdit ? true : false);
    }
  }, []);

  const handleBackToOriginalRoute = () => {
    if (isFromEdit) {
      router.push(
        `/admin/article/form?articleId=${dataFromParam?.articleId}&imageUrl=${dataFromParam?.imageUrl}&title=${dataFromParam?.articleTitle}&categoryName=${dataFromParam?.categoryName}&categoryId=${dataFromParam?.categoryId}`
      );
      localStorage.setItem(
        "temporaryContentPreview",
        dataFromParam?.articleContent ?? ""
      );
    } else {
      router.push("/admin/article");
    }
  };

  return (
    <div className="w-full bg-white">
      <HeaderComponent
        style="w-full bg-[#F9FAFB] fixed h-[68px] flex justify-between items-center px-16 max-[500px]:px-5 border-b border-b-[#E2E8F0]"
        wraperProfileStyle="flex gap-1 items-center"
        imgStyle="bg-[#BFDBFE] flex justify-center font-semibold text-[#1E3A8A] items-center rounded-full h-[32px] w-[32px]"
        titleStyle="font-bold text-lg"
        profileTextStyle="underline font-semibold max-[500px]:hidden text-sm cursor-pointer"
        logoUrl={logoImageUrl?.src}
        logoStyle="w-[7rem]"
        profileText={userProfile?.username}
      />
      <div className="w-full min-h-screen px-[160px] max-[800px]:px-[100px] max-[700px]:px-[80px] max-[600px]:px-[60px] max-[500px]:px-[25px] pt-[68px]">
        <div className="w-full pt-[40px]">
          <div className="created w-full text-sm flex gap-5 justify-center text-[#475569]">
            <p>{formatDate(dataFromParam?.createAd ?? "")}</p>
            <ul>
              <li className="list-disc">{`Created by ${userProfile?.username}`}</li>
            </ul>
          </div>
          <div className="title w-full flex justify-center">
            <div className="max-w-[642px] font-[600] text-[30px]">
              <h1 className="text-center text-[#0F172A]">
                {dataFromParam?.articleTitle}
              </h1>
            </div>
          </div>
          <div className="image w-full h-[480px] max-[500px]:h-[200px] my-4">
            <img
              className="w-full h-full rounded-[12px] object-cover"
              src={dataFromParam?.imageUrl || imageNotAvailable?.src}
            />
          </div>
          <div
            className="content w-full"
            dangerouslySetInnerHTML={{
              __html: dataFromParam?.articleContent || "",
            }}
          ></div>
        </div>
        <div className="w-full mt-12">
          <div className="mb-2">
            <h1 className="text-xl font-bold">Other articles</h1>
          </div>
          <div className="w-full justify-center flex gap-10 flex-wrap">
            <div className="w-[30%] max-[1100px]:w-[40%] max-[900px]:w-[45%] max-[750px]:w-[90%]">
              <div>
                <img
                  className="w-full h-[240px] max-[1100px]:h-[190px] max-[900px]:h-[170px] max-[750px]:h-[220px] rounded-[12px]"
                  src="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg?quality=75&w=1500"
                />
              </div>
              <div className="text-[#475569] my-2 text-sm">April 13, 2025</div>
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  Cybersecurity Essentials Every Developer Should Know
                </h3>
                <p className="text-[#475569] my-2 text-ellipsis line-clamp-2">
                  Protect your apps and users with these fundamental
                  cybersecurity practices for Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  Technologhy
                </span>
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  design
                </span>
              </div>
            </div>

            <div className="w-[30%] max-[1100px]:w-[40%] max-[900px]:w-[45%] max-[750px]:w-[90%]">
              <div>
                <img
                  className="w-full h-[240px] max-[1100px]:h-[190px] max-[900px]:h-[170px] max-[750px]:h-[200px] rounded-[12px]"
                  src="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg?quality=75&w=1500"
                />
              </div>
              <div className="text-[#475569] my-2 text-sm">April 13, 2025</div>
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  Cybersecurity Essentials Every Developer Should Know
                </h3>
                <p className="text-[#475569] my-2 text-ellipsis line-clamp-2">
                  Protect your apps and users with these fundamental
                  cybersecurity practices for Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  Technologhy
                </span>
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  design
                </span>
              </div>
            </div>

            <div className="w-[30%] max-[1100px]:w-[40%] max-[900px]:w-[45%] max-[750px]:w-[90%]">
              <div>
                <img
                  className="w-full h-[240px] max-[1100px]:h-[190px] max-[900px]:h-[170px] max-[750px]:h-[200px] rounded-[12px]"
                  src="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg?quality=75&w=1500"
                />
              </div>
              <div className="text-[#475569] my-2 text-sm">April 13, 2025</div>
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A]">
                  Cybersecurity Essentials Every Developer Should Know
                </h3>
                <p className="text-[#475569] my-2 text-ellipsis line-clamp-2">
                  Protect your apps and users with these fundamental
                  cybersecurity practices for Lorem ipsum dolor sit amet
                  consectetur adipisicing elit.{" "}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  Technologhy
                </span>
                <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                  design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent
        style="w-full bg-[#2563EBDB] mt-8 min-h-[68px] max-[555px]:gap-0 max-[555px]:py-3 flex max-[555px]:flex-col justify-center gap-4 items-center px-16 max-[500px]:px-5"
        wraperProfileStyle="flex gap-1 items-center"
        titleStyle="font-bold text-lg"
        profileTextStyle="underline font-semibold text-sm cursor-pointer"
        logoUrl={logoFooterImageUrl?.src}
        logoStyle="w-[7rem]"
        imgStyle="text-white "
        profileText="© 2025 Blog genzet. All rights reserved."
      />
      <div className="fixed cursor-pointer right-10 animate-caret-blink top-[43rem]">
        <CircleX onClick={handleBackToOriginalRoute} size={30} />
      </div>
    </div>
  );
}

export default PreviewComponent;
