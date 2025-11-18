import React from "react";

type Props = { className?: string };

const ResetIcon = ({ className }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M2.5915 13.7V17.8667V13.7Z" fill="black" />
      <path
        d="M18.3332 10C18.3332 14.6 14.5998 18.3334 9.99984 18.3334C5.39984 18.3334 2.5915 13.7 2.5915 13.7M2.5915 13.7H6.35817M2.5915 13.7V17.8667M1.6665 10C1.6665 5.40002 5.3665 1.66669 9.99984 1.66669C15.5582 1.66669 18.3332 6.30002 18.3332 6.30002M18.3332 6.30002V2.13335M18.3332 6.30002H14.6332"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ResetIcon;
