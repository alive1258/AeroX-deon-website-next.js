import type { Metadata } from "next";
import ShopPage from "@/src/components/Ui/ShopPage/ShopPage";

export const metadata: Metadata = {
  title: "Shop AeroX Max Pro",
  description:
    "Preorder AeroX Max Pro and choose the bundle that fits your flying style, plus accessories to extend every session.",
};

export default function Page() {
  return <ShopPage />;
}
