import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Filters from "$store/components/search/Filters.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "../product/ProductGallery.tsx";

import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { ProductListingPage } from "apps/commerce/types.ts";
// import { MeiaSola_ProductListingPage } from "$store/types/page.ts";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-10">
      <span>Not Found!</span>
    </div>
  );
}

function Result({
  page,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, sortOptions } = page;

  return (
    <>
      {
        /* {page.image && (
        <div class="container w-full h-[260px] relative py-10">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
          <Image
            alt="Imagem da Categoria"
            src={page.image}
            sizes="(max-width: 767px) 390px, 1440px"
            width={1440}
            height={260}
            class="h-full w-full object-cover absolute top-0 left-0 z-0"
          />
        </div>
      )} */
      }

      <div class="container px-4 sm:py-10">
        <div class="flex flex-row">
          <aside class="hidden sm:block w-min min-w-[250px]">
            <Filters filters={filters} />
          </aside>
          <div class="flex-grow">
            <ProductGallery products={products} />
          </div>
        </div>
      </div>

      <SendEventOnLoad
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: "",
            item_list_id: "",
            items: page.products?.map((product) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, ...props }: Props) {
  if (!page) {
    return <NotFound />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
