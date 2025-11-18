import UserSupportSection from "../_components/UserSupportSection";
import AllProductSection from "./_components/AllProductSection";
import RoutingSection from "./_components/RoutingSection";

export default function ShopPage() {
  return (
    <div>
      <RoutingSection />
      <AllProductSection />
      <UserSupportSection />
    </div>
  );
}
