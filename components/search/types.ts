import { ProductListingPage } from "apps/commerce/types.ts";

export type ProductListingPageAndSearch = ProductListingPage & {
  search: {
    term: string | null;
    url: URL;
  };
  isNotFoundPage?: boolean;
  searchQueryParam?: string;
};

export interface Route {
  /**
   * @title Route
   */
  label: string;
}

export interface Size {
  /**
   * @title Size
   */
  label: string;
}
