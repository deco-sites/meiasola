import { ProductListingPage } from "apps/commerce/types.ts";
import { IslandButtonFilters } from "site/islands/Drawers.tsx";
import IslandSort from "$store/islands/Sort.tsx";

export function Heading({
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
