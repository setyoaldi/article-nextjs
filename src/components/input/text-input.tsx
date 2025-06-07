"use client";

import { InputText } from "@/types/global";

const InputTypeText = ({
  type,
  placeholder,
  suffixIcon,
  prefixIcon,
  onBlur,
  value,
  errorMessage,
  onChange,
  inputStyle,
  inputStyleFromComponent,
}: InputText) => {
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
  };
  return (
    <>
      <div className={`${inputStyleFromComponent}`}>
        {suffixIcon && <span>{suffixIcon}</span>}
        <input
          type={type}
          onBlur={handleBlur}
          onChange={onChange}
          className={inputStyle}
          placeholder={placeholder}
          value={value}
        />
        {prefixIcon && <span>{prefixIcon}</span>}
      </div>
      {errorMessage && (
        <p className="text-sm ml-1 text-red-500">{errorMessage}</p>
      )}
    </>
  );
};
export default InputTypeText;
