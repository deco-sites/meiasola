import { useSignal } from "@preact/signals";
import { ProductListingPageAndSearch } from "site/components/search/types.ts";
import { useInfiniteScroll } from "site/sdk/hooks/useInfiniteScroll.tsx";
import ProductGallery from "site/components/product/ProductGallery.tsx";
import PaginationComponent from "site/components/search/PaginationComponent.tsx";
import { invoke } from "site/runtime.ts";
import { Sort } from "apps/vtex/utils/types.ts";

export interface Props {
  page: ProductListingPageAndSearch;
  enableInfiniteScroll?: boolean;
  isWishlistPage?: boolean;
}

export default function InfiniteScrollContainer({
  page,
  enableInfiniteScroll = false,
  isWishlistPage = false,
}: Props) {
  const allProducts = useSignal(page.products || []);
  const currentPage = useSignal(page.pageInfo.currentPage);
  const loading = useSignal(false);
  const error = useSignal<string | null>(null);

  const hasMore =
    page.pageInfo.records! > currentPage.value * page.pageInfo.recordPerPage!;

  const loadMoreProducts = async () => {
    if (loading.value || !hasMore) return;

    loading.value = true;
    error.value = null;

    try {
      const nextPage = currentPage.value + 1;
      const url = new URL(page.search.url);
      url.searchParams.set("page", nextPage.toString());
      let selectedFacets = null;

      if (url.pathname.includes("/sale")) {
        selectedFacets = [
          {
            key: "productClusterIds",
            value: "151",
          },
        ];
      }

      if (url.pathname.includes("/flashsale")) {
        selectedFacets = [
          {
            key: "productClusterIds",
            value: "379",
          },
        ];
      }

      if (url.pathname.includes("/ms")) {
        selectedFacets = [
          {
            key: "brand",
            value: "m-s",
          },
        ];
      }

      const isNewIn = url.pathname.includes("/newin");

      const data =
        await invoke.vtex.loaders.intelligentSearch.productListingPage({
          count: page?.pageInfo.recordPerPage,
          ...(!isNewIn
            ? { pageHref: url.toString() }
            : {
                query: " ",
                page: nextPage - 1,
                hideUnavailableItems: true,
                fuzzy: "automatic",
              }),
          sort: (url.searchParams.get("sort") as Sort) ?? "release:desc",
          ...(selectedFacets != null ? { selectedFacets } : {}),
        });

      if (!data) {
        throw new Error("Falha ao buscar mais produtos");
      }

      if (data.products && data.products.length > 0) {
        allProducts.value = [...allProducts.value, ...data.products];
        currentPage.value = nextPage;
      }
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to load more products";
      console.error("Error loading more products:", err);
    } finally {
      loading.value = false;
    }
  };

  // Hook do infinite scroll
  useInfiniteScroll({
    hasMore,
    loading: loading.value,
    onLoadMore: loadMoreProducts,
    targetSelector: "#infinite_scroll_container",
    offset: 300,
  });

  return (
    <>
      <ProductGallery products={allProducts.value} />

      {enableInfiniteScroll && hasMore && (
        <div class="flex flex-col items-center gap-4 py-8">
          {loading.value ? (
            <div class="flex items-center justify-center gap-2">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
              <span class="text-sm text-gray-600">
                Carregando mais produtos...
              </span>
            </div>
          ) : error.value ? (
            <div class="flex flex-col items-center gap-2">
              <span class="text-sm text-red-600">{error.value}</span>
              <button
                onClick={loadMoreProducts}
                class="px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <button
              onClick={loadMoreProducts}
              class="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors font-medium"
            >
              Carregar mais produtos
            </button>
          )}
        </div>
      )}

      {!enableInfiniteScroll &&
        page.pageInfo.records! > page.pageInfo.recordPerPage! && (
          <PaginationComponent page={page} isWishlistPage={isWishlistPage} />
        )}
    </>
  );
}
