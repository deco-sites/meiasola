import { useCallback } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

import { Runtime } from "../runtime.ts";
import { Product } from "apps/commerce/types.ts";

import Button from "$store/components/ui/Button.tsx";
import ProductGallery from "$store/components/product/ProductGallery.tsx";

export default function LoadMore() {
  const loading = useSignal(false);
  const products = useSignal<Product[]>([]);

  const loadMore = useCallback(async () => {
    try {
      loading.value = true;

      const url = new URL(window.location.href);
      const req = new Request(url);

      const page =
        await Runtime.vtex.loaders.intelligentSearch.productListingPage(
          {
            count: 24,
            query: url.searchParams.get("q"),
            sort: url.searchParams.get("sort") ?? "release:desc",
            page: products.value.length / 24 + 1, // mudar para  1
            // selectedFacets: url.search
            //   .slice(1)
            //   .split("&")
            //   .map((param) => ({
            //     key: param.split("=")[0],
            //     value: url.searchParams.get(param.split("=")[0]),
            //   })),
          },
          req
        );

      if (page?.products && page.products.length > 0) {
        products.value = [...products.value, ...page.products];
      }
    } finally {
      loading.value = false;
    }
  }, [products.value]);

  return (
    <>
      {products.value.length > 0 && (
        <ProductGallery products={products.value} />
      )}
      <Button
        onClick={loadMore}
        loading={loading.value}
        aria-label="Ver mais produtos"
        class="btn-ghost !border border-black uppercase tracking-large text-small text-black bg-white hover:bg-black hover:text-white disabled:bg-black disabled:text-white font-normal p-2.5 !w-full mobile:!w-fit mt-4 laptop:mt-5"
      >
        VER MAIS
      </Button>
    </>
  );
}
