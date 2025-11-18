import HeroSection from "@/app/_components/HeroSection";
import CategoriesSection from "@/app/_components/CategoriesSection";
import ProductsSection from "@/app/_components/ProductsSection";
import TrustBadgesSection from "@/app/_components/TrustBadgesSection";
import TopBrands from "./_components/TopBrands";
import ProductsAccordingToCrops from "./_components/ProductsAccordingToCrops";
import BrandedProduct from "./_components/BrandedProduct";
import WatchUsOnYoutube from "./_components/WatchUsOnYoutube";
import SeedsSection from "./_components/SeedsSection";
import ProductsForUpcomingSeasons from "./_components/ProductsForUpcomingSeasons";
import PopularProducts from "./_components/PopularProducts";
import UserSupportSection from "./_components/UserSupportSection";
import SeasonalSection from "./_components/SeasonalSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <TrustBadgesSection />
      <SeasonalSection />
      <TopBrands />
      <ProductsAccordingToCrops />
      <BrandedProduct />
      <WatchUsOnYoutube />
      <SeedsSection />
      <TrustBadgesSection />
      <ProductsForUpcomingSeasons />
      <PopularProducts />
      <UserSupportSection />
    </>
  );
}
