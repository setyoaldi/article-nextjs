import PrimaryButton from "@/components/button/primary-button";
import InputTypeText from "@/components/input/text-input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/types/global";
import { createCategory, editCategory } from "@/api/admin";

interface DialogWrapperProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  dataEdit?: Category;
  onDialogClose?: (reason: "cancel" | "submit") => void;
}

function DialogCategoryForm({
  onOpenChange,
  open,
  title,
  onDialogClose,
  dataEdit,
}: DialogWrapperProps) {
  const loginSchema = z.object({
    category: z.string().nonempty("Category field cannot be empty"),
  });
  const {
    formState: { errors, isValid },
    control,
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      category: "",
    },
    mode: "all",
  });
  useEffect(() => {
    if (dataEdit) {
      reset({ category: dataEdit?.name });
    }
  }, [dataEdit, reset]);
  const handleCloseButton = () => {
    onOpenChange?.(false);
    onDialogClose?.("cancel");
    reset({ category: "" });
  };
  const handleSubmitButtonDialog = async () => {
    const value = control?._formValues?.category;
    const error = dataEdit ? "edit" : "create";
    const idCategory = dataEdit?.id ?? "";
    if (isValid) {
      try {
        const res = !dataEdit
          ? await createCategory(value)
          : await editCategory(idCategory, value);
        if (res) {
          onDialogClose?.("submit");
        }
      } catch (e) {
        throw new Error(
          `Error when send ${error} category form component: ${e}`
        );
      } finally {
        onOpenChange?.(false);
        reset();
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="sm:max-w-[425px] min-h-[260px] [&>button]:hidden"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className=" gap-4">
              <p className="mb-1">Category</p>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputTypeText
                    onChange={onChange}
                    onBlur={onBlur}
                    errorMessage={errors?.category?.message}
                    value={value}
                    inputStyle="focus:outline-none w-full h-[2.2rem] text-sm p-[0.4rem]"
                    inputStyleFromComponent="flex items-center border-1 min-w-full p-[0.1rem] rounded-md focus:outline"
                    placeholder="Input category"
                  />
                )}
                name="category"
              />
            </div>
          </div>
          <DialogFooter>
            <PrimaryButton
              onClick={handleCloseButton}
              styles="min-w-[74px] max-[500px]:w-full hover:opacity-80 cursor-pointer h-[40px] border-[#E2E8F0] border rounded-md"
              text="Cancel"
            />
            <PrimaryButton
              onClick={handleSubmit(handleSubmitButtonDialog)}
              styles="min-w-[54px] max-[500px]:w-full hover:opacity-80 px-3 cursor-pointer h-[40px] bg-[#2563EB] text-white border-[#E2E8F0] border rounded-md"
              text={dataEdit ? "Save change" : "Add"}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogCategoryForm;
