import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import Filters from "$store/components/search/Filters.tsx";

import {
  IslandButtonFilters,
  IslandFiltersDrawer,
} from "$store/islands/Drawers.tsx";
import IslandSort from "$store/islands/Sort.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

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
   * @description A RegExp for indentify routes that will use this imagem. Ex: /bolsas/*
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

  console.log(seo);

  let search = "";

  pageInfo?.nextPage?.split("&").forEach((term) => {
    const [key, value] = term.split("=");
    if (key === "q") {
      search = decodeURIComponent(value);
    }
  });

  const url = new URL(seo?.canonical ?? "");
  if (url.searchParams.get("q")) search = url.searchParams.get("q");

  return (
    <>
      {!search && <Image images={images} breadcrumb={breadcrumb} />}
      <Heading
        seo={seo}
        productsCount={pageInfo.records ?? 0}
        sortOptions={sortOptions}
        searchTerm={search}
      />
      <IslandFiltersDrawer filters={filters} />

      <div class="container py-6 laptop:py-10 grid grid-cols-4 gap-4 laptop:grid-cols-12 laptop:gap-5">
        <aside class="flex flex-col gap-6 col-span-3">
          <span
            class={`text-black uppercase text-small font-bold ${
              search && "laptop:hidden"
            }`}
          >
            {pageInfo.records} itens
          </span>
          <div class="hidden laptop:block">
            <Filters filters={filters} />
          </div>
        </aside>
        <div class="flex col-span-4 laptop:col-span-9">
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
                ...useOffer(product.offers),
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

function Heading({
  seo,
  sortOptions,
  productsCount,
  searchTerm,
}: {
  searchTerm?: string;
  productsCount: number;
  seo: ProductListingPage["seo"];
  sortOptions: ProductListingPage["sortOptions"];
}) {
  return (
    <div
      class={`laptop:border-b laptop:border-grey-1 laptop:pb-10 pt-6 tablet:pt-10 text-black`}
    >
      <div class="container flex flex-col gap-6 laptop:flex-row laptop:justify-between laptop:items-end">
        {searchTerm ? (
          <div class="flex flex-col gap-8">
            <h1 class="text-subtile font-normal leading-none">
              Você buscou por: <span class="font-bold">{searchTerm}</span>
            </h1>
            <span class="uppercase text-small font-bold hidden laptop:block">
              {productsCount} itens
            </span>
          </div>
        ) : (
          <div class="flex flex-col gap-6 laptop:flex-row laptop:w-3/4 laptop:gap-5 laptop:items-center">
            <h1 class="shrink-0 text-h3 leading-none uppercase font-medium tracking-wide">
              {seo?.title}
            </h1>
            <p class="laptop:leading-none laptop:line-clamp-2 text-small">
              {seo?.description}
            </p>
          </div>
        )}

        <div class="flex gap-4 laptop:w-1/4 laptop:justify-end">
          <IslandButtonFilters className="laptop:hidden" />
          <IslandSort sortOptions={sortOptions} />
        </div>
      </div>
    </div>
  );
}

function Image({
  images = [],
  breadcrumb,
}: {
  images: Props["images"];
  breadcrumb: ProductListingPage["breadcrumb"];
}) {
  let image = null;

  if (breadcrumb?.itemListElement.length > 0) {
    const last =
      breadcrumb.itemListElement[breadcrumb.itemListElement.length - 1];
    const url = new URL(last.item);
    const pathname = url.pathname;
    image = images.findLast((image) =>
      new RegExp(image.route).test(image.route)
    );
  }

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
