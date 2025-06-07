"use client";

import HeaderComponent from "@/components/header/header";
import HeroSection from "./hero-section";
import ArticleList from "./list-article";
import FooterComponent from "@/components/footer/footer";
import logoPutih from "../../../assets/logoipsum-putih.png";
import logoBiru from "../../../assets/logoipsum-biru.png";
import { useState, useEffect } from "react";
import { getAllArticles, getAllCategory, getUserProfile } from "@/api/admin";
import {
  Articles,
  Category,
  Categorys,
  UserProfile,
  UniqueCategoryInterface,
} from "@/types/global";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useDebounce } from "@/utils/helper";

function ArticlesPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [categorys, setCategorys] = useState<
    Categorys | UniqueCategoryInterface[]
  >();
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchArticle, setSearchArticle] = useState("");
  const [articles, setArticles] = useState<Articles>();
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const debouncedSearchQuery: string = useDebounce(searchArticle, 300);
  const limit = 9;

  async function fetchArticles() {
    setIsLoading(true);
    try {
      const data: Articles = await getAllArticles(
        debouncedSearchQuery,
        page,
        limit,
        categoryId
      );
      setArticles(data);
      setDataCount(data?.data?.length ?? 0);
    } catch (e) {
      throw new Error(`Error when get data article from component: ${e}`);
    } finally {
      setIsLoading(false);
    }
  }
  const uniqCategory = (category: Category[]): void => {
    const uniqCategory = [
      ...new Set(
        category
          .filter((el) => el?.name)
          .map((el) => {
            return {
              name: el?.name,
              id: el?.id,
            };
          })
      ),
    ];

    setCategorys(uniqCategory);
  };

  useEffect(() => {
    fetchArticles();
  }, [debouncedSearchQuery, categoryId, page]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    async function fetchAllCategory() {
      setIsLoading(true);
      try {
        let allDataCategory: Category[] = [];
        let page = 1;
        const limit = 10;
        while (true) {
          const res = await getAllCategory(page, limit);
          allDataCategory = [...allDataCategory, ...res.data];
          if (res?.currentPage === res?.totalPages) break;
          page++;
        }
        setCategorys(allDataCategory);
        uniqCategory(allDataCategory);
      } catch (e) {
        throw new Error(`Error when get data category from component: ${e}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAllCategory();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 452) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 500);
      if (window.innerWidth < 500) {
        setIsSmallScreen(true);
        setIsScrolled(false);
      } else {
        setIsSmallScreen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  function getPageList(currentPage: number, totalPages: number) {
    const delta = 1;
    const range: number[] = [];
    const rangeWithDots: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }
    let prev: number | null = null;
    for (const page of range) {
      if (prev !== null) {
        if (page - prev! > 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(page);
      prev = page;
    }
    return rangeWithDots;
  }

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleSearchChange = (value: string) => {
    setSearchArticle(value);
    setPage(1);
  };

  const handleCategorySelected = (id: string) => {
    setCategoryId(id === "All" ? "" : id);
    setPage(1);
  };

  return (
    <>
      <HeaderComponent
        style={`w-full bg-[#F9FAFB] fixed min-[500px]:border-0 z-30 max-[500px]:bg-[#F9FAFB] max-[500px]:border-b max-[500px]:border-b-[#E2E8F0] ${
          isScrolled
            ? "bg-[#F9FAFB] border-b border-b-[#E2E8F0]"
            : "bg-transparent border-b-0"
        } h-[68px] flex justify-between items-center px-16 max-[640px]:px-7 border-b border-b-[#E2E8F0]`}
        wraperProfileStyle="flex gap-1 items-center"
        imgStyle="bg-[#BFDBFE] flex justify-center font-semibold text-[#1E3A8A] items-center rounded-full h-[32px] w-[32px]"
        titleStyle="font-bold text-lg"
        profileTextStyle={`underline font-semibold max-[640px]:hidden ${
          isScrolled ? "text-black" : "text-white"
        } text-sm cursor-pointer opacity-80`}
        logoUrl={isScrolled || isSmallScreen ? logoBiru?.src : logoPutih?.src}
        logoStyle="w-[7rem] opacity-80"
        profileText={userProfile?.username}
        dropdown={"yes"}
      />
      <HeroSection
        categorys={Array.isArray(categorys) ? categorys : undefined}
        onSearchChange={handleSearchChange}
        onCategorySelected={handleCategorySelected}
      />
      <ArticleList articles={articles} isLoading={isLoading} />
      <div className="p-[24px]">
        <Pagination
          className={`${dataCount === 0 ? "invisible" : "visible"} pl-7`}
        >
          <PaginationContent>
            <PaginationItem
              className={`${
                (articles?.limit ?? 0) * (articles?.page ?? 0) <
                (articles?.total ?? 0)
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100 cursor-pointer pointer-events-auto"
              }`}
            >
              <button onClick={handlePrev}>
                <PaginationPrevious />
              </button>
            </PaginationItem>
            {getPageList(
              articles?.page ?? 0,
              Math.ceil((articles?.total ?? 0) / (articles?.limit ?? 0)) ?? 0
            ).map((item, idx) => {
              if (item === "...") {
                return (
                  <PaginationItem key={`dot-${idx}`} className="relative mx-2">
                    <PaginationEllipsis className="absolute -top-3 -left-4" />
                  </PaginationItem>
                );
              } else {
                return (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href="#"
                      isActive={item === articles?.page}
                      onClick={() => setPage(item)}
                      className="cursor-pointer"
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}
            <PaginationItem
              className={`relative ml-1.5 mr-8 ${
                (articles?.limit ?? 0) * (articles?.page ?? 0) >=
                (articles?.total ?? 0)
                  ? "opacity-40 pointer-events-none"
                  : "opacity-100 cursor-pointer pointer-events-auto"
              }`}
            >
              <button onClick={handleNext}>
                <PaginationNext className="cursor-pointer" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <h1
          className={
            dataCount === 0
              ? "block text-center font-extrabold opacity-50"
              : "hidden"
          }
        >
          No data found !
        </h1>
      </div>
      <FooterComponent
        style="w-full bg-[#2563EBDB] mt-8 min-h-[68px] max-[555px]:gap-0 max-[555px]:py-3 flex max-[555px]:flex-col justify-center gap-4 items-center px-16 max-[500px]:px-5"
        wraperProfileStyle="flex gap-1 items-center"
        titleStyle="font-bold text-lg"
        profileTextStyle="underline font-semibold text-sm cursor-pointer"
        logoUrl={logoBiru?.src}
        logoStyle="w-[7rem]"
        imgStyle="text-white "
        profileText="© 2025 Blog genzet. All rights reserved."
      />
    </>
  );
}

export default ArticlesPage;
