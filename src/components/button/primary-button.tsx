"use client";

import { ButtonProps } from "@/types/global";
import Link from "next/link";

const PrimaryButton = ({
  styles,
  text,
  img,
  onClick,
  disabled = false,
  patchName,
  type,
}: ButtonProps) => {
  return (
    <>
      {!patchName && (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          className={styles}
        >
          {img && img}
          {text}
        </button>
      )}

      {patchName && (
        <Link className={styles} href={patchName}>
          {text}
        </Link>
      )}
    </>
  );
};

export default PrimaryButton;
