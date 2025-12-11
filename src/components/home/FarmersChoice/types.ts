export interface BundleItem {
  id: number;
  title: string;
  image: string;
  desc: string;
  subDesc?: string;
  price: number;
  unit: string;
}

// Shared logic for "Buy" button styling to keep it consistent
export const BUY_BTN_CLASS = "bg-[#003C22] text-white rounded-[12px] font-medium hover:bg-emerald-900 transition-colors flex items-center justify-center";