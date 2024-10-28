import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { SectionProps } from "deco/types.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import ProductGallery from "$store/components/product/ProductGallery.tsx";
import Filters from "$store/components/search/Filters.tsx";
import { AppContext } from "apps/vtex/mod.ts";

import {
  IslandButtonFilters,
  IslandFiltersDrawer,
} from "$store/islands/Drawers.tsx";
import IslandSort from "$store/islands/Sort.tsx";
import notFoundProductListingPage from "site/loaders/meiasola/notFoundProductListingPage.ts";

type ProductListingPageAndSearch = ProductListingPage & {
  search: { term: string | null; url: URL };
  isNotFoundPage?: boolean;
  searchQueryParam?: string;
};

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  images?: Image[];
  sizes?: {
    title: string;
    sizes: Size[];
    routesToShow: Route[];
  };
  isWishlistPage?: boolean;
}

const updateRecentSearches = (search: string) => {
  if (!search) {
    return;
  }

  const recentSearches = JSON.parse(
    localStorage.getItem("recentSearches") || "[]"
  );

  if (!recentSearches.includes(search)) {
    // maintain only the last 7 searches
    if (recentSearches.length >= 7) {
      recentSearches.shift();
    }
    recentSearches.push(search);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  }
};

function Result({
  page,
  images = [],
  sizes,
  isWishlistPage = false,
  searchQueryParam = "",
}: Omit<SectionProps<typeof loader>, "page" | "notFoundPage"> & {
  page: ProductListingPageAndSearch;
}) {
  const { products, filters, breadcrumb, sortOptions, seo, pageInfo, search } =
    page;

  const isSearchPage = search && search.term && search.term != "";

  const willPaginate = search && pageInfo.records! > pageInfo?.recordPerPage!;

  const paginationUrl = !isWishlistPage
    ? new URL(search.url.href)
    : new URL("https://meiasola.com.br/wishlist");

  paginationUrl.searchParams.set("page", "pagination-number");

  return (
    <>
      {page.isNotFoundPage && (
        <div class="container relative z-10">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
      )}

      {!isWishlistPage && !isSearchPage && images && images.length > 0 && (
        <Image
          images={images}
          breadcrumb={breadcrumb}
          pathname={search.url.pathname}
        />
      )}

      {!isWishlistPage && !isSearchPage && sizes && sizes.sizes.length > 0 && (
        <Sizes
          title={sizes.title}
          routes={sizes.routesToShow}
          sizes={sizes.sizes}
          url={search.url}
        />
      )}

      <Heading
        seo={seo}
        productsCount={pageInfo.records ?? 0}
        sortOptions={sortOptions}
        searchTerm={search?.term ?? undefined}
        isNotFoundPage={page.isNotFoundPage}
      />

      <IslandFiltersDrawer filters={filters} />

      <div class="container py-6 laptop:py-10 grid grid-cols-4 gap-4 laptop:grid-cols-12 laptop:gap-5">
        <aside class="flex flex-col gap-6 col-span-3">
          <span
            class={`text-black uppercase text-small font-bold ${
              search?.term && "laptop:hidden"
            }`}
          >
            {pageInfo.records} itens
          </span>
          <div class="hidden laptop:block">
            <Filters filters={filters} />
          </div>
        </aside>
        <div class="col-span-4 laptop:col-span-9 flex flex-col items-center gap-6 laptop:gap-10">
          <ProductGallery products={products} />

          {willPaginate && (
            <ul class="flex gap-8">
              {pageInfo.currentPage - 2 > 0 && (
                <PageLink
                  page={pageInfo.currentPage - 2}
                  href={paginationUrl.href.replace(
                    "pagination-number",
                    (pageInfo.currentPage - 2).toString()
                  )}
                />
              )}

              {pageInfo.previousPage && (
                <PageLink
                  page={pageInfo.currentPage - 1}
                  href={paginationUrl.href.replace(
                    "pagination-number",
                    (pageInfo.currentPage - 1).toString()
                  )}
                />
              )}

              <PageLink page={pageInfo.currentPage} isActive href={"#"} />

              {pageInfo.currentPage * pageInfo.recordPerPage! <
                pageInfo.records! && (
                <PageLink
                  page={pageInfo.currentPage + 1}
                  href={paginationUrl.href.replace(
                    "pagination-number",
                    (pageInfo.currentPage + 1).toString()
                  )}
                />
              )}

              {(pageInfo.currentPage + 1) * pageInfo.recordPerPage! <
                pageInfo.records! && (
                <PageLink
                  page={pageInfo.currentPage + 2}
                  href={paginationUrl.href.replace(
                    "pagination-number",
                    (pageInfo.currentPage + 2).toString()
                  )}
                />
              )}
            </ul>
          )}
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

      {isSearchPage && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(${updateRecentSearches})("${searchQueryParam}");`,
          }}
        />
      )}
    </>
  );
}

function Heading({
  seo,
  sortOptions,
  productsCount,
  searchTerm,
  title,
  isNotFoundPage,
}: {
  searchTerm?: string;
  productsCount: number;
  seo: ProductListingPage["seo"];
  sortOptions: ProductListingPage["sortOptions"];
  title?: string;
  isNotFoundPage?: boolean;
}) {
  return (
    <div
      class={`${
        !isNotFoundPage
          ? "laptop:border-b laptop:border-grey-1 laptop:pb-10"
          : ""
      } pt-6 tablet:pt-10 text-black`}
    >
      <div class="container flex flex-col gap-6 laptop:flex-row laptop:justify-between laptop:items-end">
        {isNotFoundPage && (
          <div class="flex flex-col gap-8">
            <h1 class="text-subtile font-normal leading-none">
              <span class="font-bold text-h2">{searchTerm}</span>
            </h1>
          </div>
        )}

        {searchTerm && !isNotFoundPage ? (
          <div class="flex flex-col gap-8">
            <h1 class="text-subtile font-normal leading-none">
              Você buscou por: <span class="font-bold">{searchTerm}</span>
            </h1>
            <span class="uppercase text-small font-bold hidden laptop:block">
              {productsCount} itens
            </span>
          </div>
        ) : (
          !isNotFoundPage && (
            <div class="flex flex-col gap-6 laptop:flex-row laptop:w-3/4 laptop:gap-5 laptop:items-center">
              <h1 class="shrink-0 text-h3 leading-none uppercase font-medium tracking-wide">
                {(seo?.title ?? "")?.split(" ")[0]}
              </h1>
              <p class="laptop:leading-none text-small text-neutral-500">
                {seo?.description}
              </p>
            </div>
          )
        )}

        <div class="grid grid-cols-2 gap-4 laptop:flex laptop:w-1/4 laptop:justify-end">
          <IslandButtonFilters className="laptop:hidden" />
          <IslandSort sortOptions={sortOptions} />
        </div>
      </div>
    </div>
  );
}

interface Route {
  /**
   * @title Route
   */
  label: string;
}

interface Size {
  /**
   * @title Size
   */
  label: string;
}

function Sizes({
  title,
  routes,
  sizes,
  url,
}: {
  title: string;
  routes: Route[];
  sizes: Size[];
  url: URL;
}) {
  if (!routes.findLast((route) => url.pathname.includes(route.label)))
    return null;

  return (
    <div class="bg-black text-white text-large py-6 laptop:py-5">
      <div class="container flex flex-col items-center gap-8 laptop:flex-row laptop:justify-between">
        <h4 class="text-large tracking-wide text-center laptop:text-left">
          {title}
        </h4>
        <ul class="grid grid-cols-4 gap-8 tablet:flex tablet:flex-wrap tablet:justify-center laptop:gap-6 desktop:gap-8">
          {sizes?.map((size, index) => {
            const sizeUrl = new URL(url.href);

            const isActive = sizeUrl.search.includes(
              `filter.tamanho=${size.label}`
            );

            if (isActive) sizeUrl.searchParams.delete("filter.tamanho");
            else {
              if (sizeUrl.searchParams.get("filter.tamanho"))
                sizeUrl.searchParams.set("filter.tamanho", size.label);
              else sizeUrl.searchParams.append("filter.tamanho", size.label);
            }

            return (
              <li key={"size-" + index}>
                <a
                  href={sizeUrl.href}
                  aria-label={`Numeração ${size.label}`}
                  class={`border border-white h-10 w-10 flex items-center justify-center hover:bg-white hover:text-black ${
                    isActive ? "bg-white text-black" : ""
                  } transition-all duration-300 ease-out`}
                >
                  {size.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

interface Image {
  /**
   * @title Image Desktop
   */
  src: ImageWidget;

  /**
   * @title Image Mobile
   */
  srcMobile: ImageWidget;

  /**
   * @description A RegExp for indentify routes that will use this imagem. Ex: /bolsas
   */
  route: string;

  /**
   * @description Descriptive text for people with visual impairments
   */
  alt?: string;
}

function Image({
  images = [],
  breadcrumb,
  pathname,
}: {
  images: Image[];
  breadcrumb: ProductListingPage["breadcrumb"];
  pathname: string;
}) {
  let image = null;

  image = images.findLast((image) => pathname.includes(image.route));

  if (image) {
    return (
      <div class="w-full h-[260px] relative py-10">
        <div class="container relative z-10">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>
        <Picture>
          <Source
            media="(max-width: 767px)"
            src={image.srcMobile}
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

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const { url: baseUrl } = req;
  const url = new URL(baseUrl);

  const urlSearchParams = new URLSearchParams(url.search);
  const searchQueryParam = urlSearchParams.get("q") ?? "";

  const notFoundPage = (await notFoundProductListingPage(
    {
      pageHref: `${url.origin}/newin`,
      query: "",
      count: props.page?.pageInfo.recordPerPage ?? 24,
      sort: "release:desc",
      hideUnavailableItems: true,
      fuzzy: "automatic",
    },
    req,
    ctx
  )) as ProductListingPageAndSearch;

  if (notFoundPage) {
    notFoundPage.isNotFoundPage = true;

    notFoundPage.search = {
      term: "NEW IN",
      url: new URL("/newin", url.origin),
    };

    notFoundPage.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          name: "New In",
          item: `${url.origin}/newin`,
          position: 1,
        },
      ],
      numberOfItems: 1,
    };
  }

  return { ...props, notFoundPage, searchQueryParam };
};

function SearchResult({
  page,
  notFoundPage,
  ...props
}: SectionProps<typeof loader>) {
  if (!page || page.pageInfo.records === 0) {
    return (
      <>
        <NotFound />
        {notFoundPage && <Result {...props} page={notFoundPage} />}
      </>
    );
  }

  return <Result {...props} page={page as ProductListingPageAndSearch} />;
}

export default SearchResult;

function NotFound() {
  return (
    <div class="w-full py-10 laptop:border-b laptop:border-grey-1">
      <div class="container flex flex-col gap-[21px] justify-center items-center ">
        <span class="uppercase font-bold text-h3">
          Não encontramos o que você buscou
        </span>
        <p class="text-body text-black">
          Desculpe, não encontramos resultados para a sua busca, mas não perca a
          oportunidade de conferir nossas novidades abaixo.
        </p>
      </div>
    </div>
  );
}

function PageLink({
  page,
  isActive = false,
  href,
}: {
  href: string;
  page: number;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={`Página ${page}`}
      class={`border border-black h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white ${
        isActive ? "bg-black text-white" : ""
      } transition-all duration-300 ease-out`}
    >
      {page}
    </a>
  );
}
