import BestPricesAssured from "@/icons/BestPricesAssured";
import ProductDelivery from "@/icons/ProductDelivery";
import QuerySolutionsIcon from "@/icons/QuerySolutionsIcon";
import SecurePayments from "@/icons/SecurePayments";

export default function TrustBadgesSection() {
  const badges = [
    {
      Icon: SecurePayments,
      title: "100%",
      subtitle: "Secure Payments",
      bgColor: "bg-primary_01",
    },
    {
      Icon: BestPricesAssured,
      title: "100%",
      subtitle: "Best Prices Assured",
      bgColor: "bg-primary_01",
    },
    {
      Icon: QuerySolutionsIcon,
      title: "100%",
      subtitle: "Query Solutions",
      bgColor: "bg-primary_01",
    },
    {
      Icon: ProductDelivery,
      title: "100%",
      subtitle: "Product Delivery",
      bgColor: "bg-primary_01",
    },
  ];

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="px-0 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-row lg:flex-row sm:flex-row items-center justify-evenly text-center sm:text-left gap-2 sm:gap-3"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 ${badge.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                <badge.Icon className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {badge.title}
                </h3>
                <p className="w-max text-xs sm:text-sm text-gray-600">
                  {badge.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
