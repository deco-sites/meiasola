import { ProductListingPage } from "apps/commerce/types.ts";

export interface MeiaSola_ProductListingPage
  extends Omit<ProductListingPage, "@type" | "pageInfo"> {
  "@type": "MeiaSola_ProductListingPage";
  image?: string;
}
