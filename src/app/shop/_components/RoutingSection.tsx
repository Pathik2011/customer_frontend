"use client";

import Link from "next/link";

export default function RoutingSection({
  productName,
}: {
  productName?: string;
}) {
  return (
    <section
      className="flex justify-center items-center lg:h-[200px] h-[36px] border-b border-b-dimGray_01"
      style={{ backgroundImage: "url(/images/shop_navigation_bg.png)" }}
    >
      <div className="flex justify-center">
        <div>
          <h1 className="font-semibold text-center lg:text-[25px] hidden lg:block text-[13px]">
            Shop
          </h1>
          <nav className="flex justify-center lg:text-[15px] items-center lg:gap-3 gap-[2px] text-[13px] font-medium text-[#003C22]">
            <Link
              href="/"
              className="underline cursor-pointer hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <span className="text-[28px] font-normal">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.42516 17.225C7.26683 17.225 7.1085 17.1667 6.9835 17.0417C6.74183 16.8 6.74183 16.4 6.9835 16.1583L12.4168 10.725C12.8168 10.325 12.8168 9.67502 12.4168 9.27502L6.9835 3.84168C6.74183 3.60002 6.74183 3.20002 6.9835 2.95835C7.22516 2.71668 7.62516 2.71668 7.86683 2.95835L13.3002 8.39168C13.7252 8.81668 13.9668 9.39168 13.9668 10C13.9668 10.6083 13.7335 11.1834 13.3002 11.6084L7.86683 17.0417C7.74183 17.1583 7.5835 17.225 7.42516 17.225Z"
                  fill="#003C22"
                />
              </svg>
            </span>
            <Link
              href="/shop"
              className="underline cursor-pointer hover:text-green-600 transition-colors"
            >
              Shop
            </Link>
            {productName && (
              <>
                {" "}
                <span className="text-[28px] font-normal">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.42516 17.225C7.26683 17.225 7.1085 17.1667 6.9835 17.0417C6.74183 16.8 6.74183 16.4 6.9835 16.1583L12.4168 10.725C12.8168 10.325 12.8168 9.67502 12.4168 9.27502L6.9835 3.84168C6.74183 3.60002 6.74183 3.20002 6.9835 2.95835C7.22516 2.71668 7.62516 2.71668 7.86683 2.95835L13.3002 8.39168C13.7252 8.81668 13.9668 9.39168 13.9668 10C13.9668 10.6083 13.7335 11.1834 13.3002 11.6084L7.86683 17.0417C7.74183 17.1583 7.5835 17.225 7.42516 17.225Z"
                      fill="#003C22"
                    />
                  </svg>
                </span>
                <Link
                  href="/shop"
                  className="underline cursor-pointer hover:text-green-600 transition-colors"
                >
                  {productName}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
