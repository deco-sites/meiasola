import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Divider from "$store/components/ui/Divider.tsx";

import IslandSort from "$store/islands/Sort.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  images?: Image[];
}

interface Image {
  /**
   * @title Image
   */
  src: ImageWidget;

  /**
   * @description the route that will use this imagem. Ex: /bolsas
   */
  route: string;

  /**
   * @description Descriptive text for people with visual impairments
   */
  alt?: string;
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
  images = [],
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, sortOptions, seo, pageInfo } = page;

  return (
    <>
      <Image images={images} breadcrumb={breadcrumb} />
      <Heading seo={seo} sortOptions={sortOptions} />

      <div class="container py-10 grid grid-cols-4 gap-4 tablet:grid-cols-12 tablet:gap-5">
        <aside class="flex flex-col gap-6 col-span-3">
          <span class="text-black uppercase text-small font-bold">
            {pageInfo.records} itens
          </span>
          <Filters filters={filters} />
        </aside>
        <div class="flex col-span-9">
          <ProductGallery products={products} />
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
  if (!page) return <NotFound />;
  return <Result {...props} page={page} />;
}

export default SearchResult;

function Heading(
  { seo, sortOptions }: {
    seo: ProductListingPage["seo"];
    sortOptions: ProductListingPage["sortOptions"];
  },
) {
  return (
    <div class="border-b border-grey-1 py-6 tablet:py-10 text-black">
      <div class="container flex flex-col gap-6 laptop:flex-row laptop:justify-between">
        <div class="flex flex-col gap-6 laptop:flex-row laptop:w-3/4 laptop:gap-5 laptop:items-center">
          <h1 class="shrink-0 text-h3 leadin-none uppercase font-medium tracking-wide">
            {seo?.title}
          </h1>
          <p class="leading-none line-clamp-2 text-small">{seo?.description}</p>
        </div>

        <div class="flex gap-4 laptop:w-1/4 laptop:justify-end">
          <IslandSort sortOptions={sortOptions} />
        </div>
      </div>
    </div>
  );
}

function Image(
  { images = [], breadcrumb }: {
    images: Props["images"];
    breadcrumb: ProductListingPage["breadcrumb"];
  },
) {
  const image = images.find((image) => image.route === "/bolsas");

  if (image) {
    return (
      <div class="w-full h-[260px] relative py-10">
        <div class="container relative z-10">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={image.src}
            width={390}
            height={260}
          />
          <Source
            media="(min-width: 768px)"
            src={image.src}
            width={1440}
            height={260}
          />
          <img
            class="h-full w-full object-cover absolute top-0 left-0 z-0"
            sizes="100vw"
            src={image.src}
            alt={image.alt ?? "Imagem da Categoria"}
            decoding="async"
            loading="lazy"
          />
        </Picture>
      </div>
    );
  }
  return null;
}
