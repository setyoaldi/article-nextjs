"use client";

import { Suspense } from "react";
import HeaderComponent from "@/components/header/header";
import logoPutih from "../../../../public/logoipsum-putih.png";
import logoBiru from "../../../../public/logoipsum-biru.png";
import { useState, useEffect } from "react";
import { Article, Articles, UserProfile } from "@/types/global";
import { getArticleById } from "@/api/user";
import { getAllArticles, getUserProfile } from "@/api/admin";
import FooterComponent from "@/components/footer/footer";
import { useRouter, useSearchParams } from "next/navigation";
import { formatDate } from "@/utils/helper";

function ArticleDetail() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [dataFromParamId, setDataFromParamId] = useState<string>();
  const [dataArticle, setDataArticle] = useState<Article>();
  const [relatedArticles, setRelatedArticles] = useState<Article[]>();

  const searchParams = useSearchParams();
  const articleId = searchParams.get("articleId");
  const router = useRouter();

  useEffect(() => {
    if (articleId) {
      setDataFromParamId(articleId);
    }
  }, [articleId]);

  useEffect(() => {
    if (!dataFromParamId) return;
    const getOneArticle = async () => {
      const res = await getArticleById(dataFromParamId);
      if (res) {
        setDataArticle(res?.data[0]);
      }
    };
    getOneArticle();
  }, [dataFromParamId]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (!dataArticle?.categoryId) return;
    const fetchRelatedArticles = async () => {
      try {
        const allArticles: Articles = await getAllArticles(
          "",
          1,
          10,
          dataArticle.categoryId
        );
        const filtered = allArticles?.data
          ?.filter(
            (article) =>
              article?.categoryId === dataArticle?.categoryId &&
              article?.id !== dataArticle?.id
          )
          .slice(0, 3);
        setRelatedArticles(filtered);
      } catch (e) {
        throw e;
      }
    };
    fetchRelatedArticles();
  }, [dataArticle]);

  const handleClickRelated = (articleId: string) => {
    router.push(`/user/article/detail-article?articleId=${articleId}`);
  };

  return (
    <div className="w-full bg-white">
      <HeaderComponent
        style="w-full bg-[#F9FAFB] fixed h-[68px] flex justify-between items-center px-16 max-[500px]:px-5 border-b border-b-[#E2E8F0]"
        wraperProfileStyle="flex gap-1 items-center"
        imgStyle="bg-[#BFDBFE] flex justify-center font-semibold text-[#1E3A8A] items-center rounded-full h-[32px] w-[32px]"
        titleStyle="font-bold text-lg"
        profileTextStyle="underline font-semibold max-[500px]:hidden text-sm cursor-pointer"
        logoUrl={logoBiru?.src}
        logoStyle="w-[7rem]"
        profileText={userProfile?.username}
        logoClickable={true}
        logoRedirectTo="/user/article"
        dropdown="yes"
      />
      <div className="w-full min-h-screen px-[160px] max-[800px]:px-[100px] max-[700px]:px-[80px] max-[600px]:px-[60px] max-[500px]:px-[25px] pt-[68px]">
        <div className="w-full pt-[40px]">
          <div className="created w-full text-sm flex gap-5 justify-center text-[#475569]">
            <p>{formatDate(dataArticle?.createdAt ?? "")}</p>
            <ul>
              <li className="list-disc">{`Created by ${userProfile?.username}`}</li>
            </ul>
          </div>
          <div className="title w-full flex justify-center">
            <div className="max-w-[642px] font-[600] text-[30px]">
              <h1 className="text-center text-[#0F172A]">
                {dataArticle?.title}
              </h1>
            </div>
          </div>
          <div className="image w-full h-[480px] max-[500px]:h-[200px] my-4">
            <img
              className="w-full h-full rounded-[12px]"
              src={dataArticle?.imageUrl}
            />
          </div>
          <div
            className="content w-full"
            dangerouslySetInnerHTML={{ __html: dataArticle?.content ?? "" }}
          ></div>
        </div>
        <div className="w-full mt-12">
          <div className="mb-2">
            <h1 className="text-xl font-bold">Other articles</h1>
          </div>
          <div
            className={`w-full ${
              (relatedArticles?.length ?? 0) < 2
                ? "justify-start"
                : "justify-center"
            } flex gap-10 flex-wrap`}
          >
            {relatedArticles?.map((el) => (
              <div
                key={el?.id}
                onClick={() => handleClickRelated(el?.id ?? "")}
                className="w-[30%] max-[1100px]:w-[40%] max-[900px]:w-[45%] max-[750px]:w-[90%]"
              >
                <div>
                  <img
                    className="w-full h-[240px] cursor-pointer max-[1100px]:h-[190px] max-[900px]:h-[170px] max-[750px]:h-[220px] rounded-[12px]"
                    src={el?.imageUrl}
                    alt="related article with same category"
                  />
                </div>
                <div className="text-[#475569] my-2 text-sm">
                  {formatDate(el?.createdAt ?? "")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A]">
                    {el?.title}
                  </h3>
                  <p
                    className="text-[#475569] my-2 text-ellipsis line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: el?.content ?? "" }}
                  ></p>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                    {el?.category?.name}
                  </span>
                  <span className="bg-[#BFDBFE] rounded-full px-[12px] py-[4px] text-[#1E3A8A] text-sm">
                    design
                  </span>
                </div>
              </div>
            ))}

            {relatedArticles?.length === 0 && (
              <p className={`block text-center font-extrabold opacity-50`}>
                No data found !
              </p>
            )}
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
        imgStyle="text-white "
        profileText="© 2025 Blog genzet. All rights reserved."
      />
    </div>
  );
}
export default ArticleDetail;
