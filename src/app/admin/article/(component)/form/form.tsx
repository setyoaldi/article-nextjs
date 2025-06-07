"use client";

import PrimaryButton from "@/components/button/primary-button";
import InputTypeText from "@/components/input/text-input";
import {
  createArticle,
  editArticle,
  getAllCategory,
  uploadImage,
} from "@/api/admin";
import { ArrowLeft, ImagePlus } from "lucide-react";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuillEditorComponent from "@/components/quill/quill";
import { RichTextEditorHandle } from "@/types/global";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, EditData } from "@/types/global";

function Form() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [dataEdit, setDataEdit] = useState<EditData>({} as EditData);
  const [isEdit, setIsEdit] = useState(false);

  const editorRef = useRef<RichTextEditorHandle>(null);
  const queryParamsArticle = useSearchParams();
  const router = useRouter();

  const createSchema = z.object({
    img: z.string().nonempty("Please enter picture"),
    title: z.string().nonempty("Please enter title"),
    categoryId: z.string().nonempty("Please enter category"),
    content: z.string().nonempty("Content field cannot be empty"),
  });

  const {
    control,
    setValue,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      img: "",
      title: "",
      categoryId: "",
      content: "",
    },
    mode: "all",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const content = localStorage.getItem("temporaryContentPreview");
    const dataEditCategory: EditData = {
      articleId: queryParamsArticle.get("articleId") ?? "",
      articleContent: content ?? "",
      articleTitle: queryParamsArticle.get("title") ?? "",
      imageUrl: queryParamsArticle.get("imageUrl") ?? "",
      categoryId: queryParamsArticle.get("categoryId") ?? "",
      categoryName: queryParamsArticle.get("categoryName") ?? "",
    };
    if (dataEditCategory?.categoryId) {
      setDataEdit(dataEditCategory);
    }
  }, []);

  useEffect(() => {
    if (dataEdit?.categoryId && categorys.length > 0) {
      if (dataEdit?.articleId && dataEdit?.articleId !== "undefined") {
        setIsEdit(true);
      }
      reset({
        title: dataEdit.articleTitle,
        categoryId: dataEdit.categoryId,
        content: dataEdit.articleContent,
        img: dataEdit.imageUrl,
      });
      setImageUrl(dataEdit.imageUrl);
      trigger("content");
    }
  }, [dataEdit, categorys]);

  useEffect(() => {
    async function fetchAllCategory() {
      try {
        let allDataCategory: Category[] = [];
        let page = 1;
        const limit = 10;
        while (true) {
          const res = await getAllCategory(page, limit);
          allDataCategory = [...allDataCategory, ...res?.data];
          if (res?.currentPage === res?.totalPages) break;
          page++;
        }
        setCategorys(allDataCategory);
        uniqCategory(allDataCategory);
      } catch (e) {
        throw new Error(`Error when get data category from component: ${e}`);
      }
    }
    fetchAllCategory();
  }, []);

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

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleClickButtonBack = () => {
    window.location.href = "/admin/article";
  };

  const handlePreviewButtonClicked = () => {
    const categoryName = categorys.filter(
      (el) => el.id === control?._formValues?.categoryId
    );
    localStorage.setItem(
      "temporaryContentPreview",
      control?._formValues?.content ?? ""
    );
    router.push(
      `/preview?imageUrl=${imageUrl}&title=${
        control?._formValues?.title
      }&categoryName=${categoryName}&categoryId=${
        control?._formValues?.categoryId
      }&fromEdit=${true}&articleId=${dataEdit?.articleId}`
    );
  };

  const handleSubmitFormButton = async () => {
    if (isValid) {
      try {
        const res = isEdit
          ? await editArticle(
              control?._formValues?.title,
              control?._formValues?.content,
              control?._formValues?.categoryId,
              dataEdit?.articleId
            )
          : await createArticle(
              control?._formValues?.title,
              control?._formValues?.content,
              control?._formValues?.categoryId
            );

        if (res) {
          reset();
          window.location.href = "/admin/article";
        }
      } catch (e) {
        throw new Error(
          `Getting error when try to create article from compontne: ${e}`
        );
      }
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    try {
      const resUrl = await uploadImage(file);
      setImageUrl(resUrl);
      setValue("img", resUrl);
    } catch (e) {
      throw new Error(`Error when upload image in component: ${e}`);
    }
  };
  return (
    <div className="w-full min-h-[84vh]">
      <div className="bg-[#F9FAFB] p-[24px] border-[#E2E8F0] border border-b-0 rounded-t-[12px] flex items-center gap-2">
        <div>
          <PrimaryButton
            onClick={handleClickButtonBack}
            styles="w-dit cursor-pointer h-full flex items-center"
            img={<ArrowLeft className="w-[20px] h-[20px]" />}
          />
        </div>
        <div>
          <p className="font-semibold">
            {isEdit ? "Edit Articles" : "Create Articles"}
          </p>
        </div>
      </div>
      <form className="w-full bg-[#F9FAFB] p-[24px] border-[#E2E8F0] border-x">
        <div className="w-full">
          <p className="mb-1 font-semibold">Thumbnails</p>
          <div className="w-[223px] h-[163px]">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            {imageUrl ? (
              <div className="rounded-[12px] min-w-full min-h-full bg-[#FFFFFF] flex flex-col items-center border border-[#CBD5E1]">
                <img
                  src={imageUrl}
                  alt="Uploaded Image"
                  className="w-[199px] mt-2.5 rounded-[6px] h-[115px] object-cover"
                />
                <div className="w-full justify-center h-[16px] mt-1.5 flex gap-2">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="text-[#2563EB] cursor-pointer border-b border-b-[#2563EB] pb-4 text-sm"
                  >
                    Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="text-[#EF4444] cursor-pointer border-b border-b-[#EF4444] pb-4 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="h-full rounded-[12px] w-full bg-[#FFFFFF] border-dashed border border-[#CBD5E1] cursor-pointer flex flex-col justify-center items-center text-center p-[12px] hover:opacity-70 relative"
                onClick={handleClick}
              >
                <ImagePlus className="w-[20px] text-[#64748B] h-[20px] mb-2" />
                <div className="text-[#64748B] text-sm">
                  <p className="border-b-[0.01rem] border-[#64748bab] inline-block">
                    Click to select files
                  </p>
                  <p>Support File Type: jpg or png</p>
                </div>
              </div>
            )}
            {errors?.img && (
              <p className="text-sm ml-1 text-red-500">
                {errors?.img?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-4">
            <p className="font-semibold mb-1">Title</p>
            <Controller
              name="title"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputTypeText
                  value={value}
                  onChange={onChange}
                  errorMessage={errors?.title?.message}
                  onBlur={onBlur}
                  placeholder="Input title"
                  inputStyle="focus:outline-none w-full h-[2.2rem] text-sm p-[0.4rem]"
                  inputStyleFromComponent="flex items-center border min-w-full p-[0.1rem] bg-[#FFFFFF] border-[#E2E8F0] rounded-md focus:outline"
                />
              )}
            />
          </div>
          <div className="w-full mt-4">
            <p className="font-semibold mb-1">Category</p>
            <Controller
              name="categoryId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onValueChange={(selectedValue) => {
                    onChange(selectedValue);
                  }}
                >
                  <SelectTrigger className="w-full bg-[#FFFFFF] border-[#E2E8F0] border cursor-pointer">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent
                    onCloseAutoFocus={() => trigger("categoryId")}
                    className="!max-h-[20rem]"
                  >
                    {categorys
                      ?.filter(
                        (category): category is Category => !!category?.id
                      )
                      .map((category) => (
                        <SelectItem
                          key={category.id}
                          className="cursor-pointer"
                          value={category?.id ?? ""}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors?.categoryId?.message && (
              <p className="text-sm ml-1 text-red-500">
                {errors?.categoryId?.message}
              </p>
            )}
            <p className="text-sm text-[#64748B] mt-0.5">
              The existing category list can be seen in the{" "}
              <span className="text-[#2563EB]">
                <a href="#">category</a>
              </span>{" "}
              menu
            </p>
          </div>
          <div className="w-full mt-6">
            <Controller
              name="content"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <>
                  <QuillEditorComponent
                    ref={editorRef}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </>
              )}
            />
            {errors?.content?.message && (
              <p className="text-sm ml-1 text-red-500">
                {errors?.content?.message}
              </p>
            )}
          </div>

          <div className="w-full mt-4 flex justify-end items-center gap-1 max-[500px]:gap-1">
            <PrimaryButton
              type="button"
              onClick={handleClickButtonBack}
              text="Cancel"
              styles="bg-[#FFFFFF] border border-[#E2E8F0] rounded-md px-3.5 py-1.5 font-semibold cursor-pointer hover:opacity-60 max-[500px]:px-2 py-0.5"
            />
            <PrimaryButton
              type="button"
              onClick={handlePreviewButtonClicked}
              text="Preview"
              styles="bg-[#E2E8F0] rounded-md px-3.5 py-1.5 font-semibold cursor-pointer hover:opacity-60 max-[500px]:px-2 py-0.5"
            />
            <PrimaryButton
              type="button"
              onClick={handleSubmit(handleSubmitFormButton)}
              text="Upload"
              styles="bg-[#2563EB] text-white rounded-md px-3.5 py-1.5 font-semibold cursor-pointer hover:opacity-60 max-[500px]:px-2 py-0.5"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
