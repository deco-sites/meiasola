import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { ProductListingPage } from "apps/commerce/types.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import Filters from "$store/components/search/Filters.tsx";
import { AppContext } from "apps/vtex/mod.ts";
import { IslandFiltersDrawer } from "$store/islands/Drawers.tsx";
import notFoundProductListingPage from "site/loaders/meiasola/notFoundProductListingPage.ts";
import { type SectionProps } from "@deco/deco";
import { Head } from "$fresh/runtime.ts";
import {
  ProductListingPageAndSearch,
  Route,
  Size,
} from "site/components/search/types.ts";
import { updateRecentSearches } from "site/sdk/updateRecentSearches.ts";
import { Heading } from "site/components/search/Heading.tsx";
import { Sizes } from "site/components/search/Sizes.tsx";
import { NotFound } from "site/components/search/NotFound.tsx";
import InfiniteScrollContainer from "site/islands/InfiniteScrollContainer.tsx";

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  images?: Image[];
  pageOptionalTitle?: string;
  pageOptionalDescription?: string;
  sizes?: {
    title: string;
    sizes: Size[];
    routesToShow: Route[];
  };
  isWishlistPage?: boolean;
  /** @title Enable Infinite Scroll */
  enableInfiniteScroll?: boolean;
}

function Result({
  page,
  images = [],
  pageOptionalTitle,
  pageOptionalDescription,
  sizes,
  isWishlistPage = false,
  searchQueryParam = "",
  enableInfiniteScroll = false,
}: Omit<SectionProps<typeof loader>, "page" | "notFoundPage"> & {
  page: ProductListingPageAndSearch;
  enableInfiniteScroll?: boolean;
}) {
  const { products, filters, breadcrumb, sortOptions, seo, pageInfo, search } =
    page;
  const isSearchPage = search && search.term && search.term != "";

  const edroneCategories = breadcrumb.itemListElement
    .map(({ name }) => encodeURIComponent(name ?? ""))
    .join("~");
  const edroneCategoriesId = breadcrumb.itemListElement
    .map(({ item }) => item)
    .join("~");

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              var _trustvox_shelf_rate = _trustvox_shelf_rate || [];
              _trustvox_shelf_rate.push(['_storeId', '123680']);
          `,
          }}
        />
        <script
          type="text/javascript"
          async
          src="//rate.trustvox.com.br/widget.js"
        ></script>
      </Head>

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
        pageOptionalTitle={pageOptionalTitle}
        pageOptionalDescription={pageOptionalDescription}
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

        <div
          id="infinite_scroll_container"
          class="col-span-4 laptop:col-span-9 flex flex-col items-center gap-6 laptop:gap-10"
        >
          <InfiniteScrollContainer
            page={page}
            enableInfiniteScroll={enableInfiniteScroll}
            isWishlistPage={isWishlistPage}
          />
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

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
            window._edrone = window._edrone || {};
            _edrone.product_category_ids = "${edroneCategoriesId}" // use "~" sign to separate values from each other 
            _edrone.product_category_names = "${edroneCategories}" // use "~" sign to separate values from each other and url_encode on single value
            _edrone.action_type = 'category_view';
          `,
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

  let notFoundPage = null;

  if(!props.page || props.page.products.length === 0) {
    notFoundPage = (await notFoundProductListingPage(
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
  }

  return { ...props, notFoundPage, searchQueryParam };
};

function SearchResult({
  page,
  notFoundPage,
  enableInfiniteScroll = false,
  ...props
}: SectionProps<typeof loader> & { enableInfiniteScroll?: boolean }) {
  if (!page || page.pageInfo.records === 0) {
    return (
      <>
        <NotFound />
        {notFoundPage && (
          <Result
            {...props}
            page={notFoundPage}
            enableInfiniteScroll={enableInfiniteScroll}
          />
        )}
      </>
    );
  }

  return (
    <Result
      {...props}
      page={page as ProductListingPageAndSearch}
      enableInfiniteScroll={enableInfiniteScroll}
    />
  );
}

export default SearchResult;
