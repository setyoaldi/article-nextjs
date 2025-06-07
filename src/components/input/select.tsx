"use client";

import { useState } from "react";
import { InputSelect, SelectRole } from "@/types/global";

const InputTypeSelect = ({
  placeholder,
  suffixIcon,
  prefixIcon,
  onBlur,
  value,
  errorMessage,
  onChange,
  inputStyle,
  dropDownValue,
  inputStyleFromComponent,
}: SelectRole) => {
  const [isUserSelected, setIsUserSelected] = useState(false);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserSelected(Boolean(event?.target?.value));
    onChange?.(event);
  };
  const inputStyles = ` ${
    errorMessage ? "border-red-500" : "border-[#E2E8F0]"
  }`;
  return (
    <>
      <div className={`${inputStyles} ${inputStyleFromComponent}`}>
        {suffixIcon && <span>{suffixIcon}</span>}
        <select
          onBlur={onBlur}
          value={value}
          onChange={handleSelectChange}
          className={`${inputStyle} ${
            !isUserSelected ? "opacity-50" : "opacity-100"
          }`}
        >
          <option className={`${isUserSelected && "hidden"}`} value="">
            {placeholder}
          </option>
          {dropDownValue?.map((el: InputSelect) => (
            <option key={el?.value} value={el?.value}>
              {el?.label}
            </option>
          ))}
        </select>
        {prefixIcon && <span>{prefixIcon}</span>}
      </div>
      {errorMessage && (
        <p className="text-sm ml-1 text-red-500">{errorMessage}</p>
      )}
    </>
  );
};
export default InputTypeSelect;
