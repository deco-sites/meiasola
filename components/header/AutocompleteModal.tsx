import Icon from "$store/components/ui/Icon.tsx";

import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";

import type { Product, Search } from "apps/commerce/types.ts";

interface AutocompleteModalProps {
  notFound: boolean;
  hasTerms: boolean;
  hasProducts: boolean;
  searches: Search[];
  products: Product[];
}

export const AutocompleteModal = ({
  notFound,
  hasTerms,
  hasProducts,
  searches,
  products,
}: AutocompleteModalProps) => {
  return (
    <div
      class={
        "absolute right-0 top-full translate-y-22 bg-white w-screen max-w-[910px]"
      }
    >
      {notFound ? (
        <div class="flex flex-col gap-4 w-full">
          <span
            class="font-medium text-xl text-center"
            role="heading"
            aria-level={3}
          >
            Nenhum resultado encontrado
          </span>
          <span class="text-center text-base-300">
            Vamos tentar de outro jeito? Verifique a ortografia ou use um termo
            diferente
          </span>
        </div>
      ) : (
        <div class="overflow-y-scroll">
          <div class="gap-4 grid grid-cols-[200px_1fr] sm:grid-rows-1 sm:grid-cols-[150px_1fr]">
            <div class={hasTerms ? "flex flex-col gap-6" : "hidden"}>
              <span class="font-medium text-xl" role="heading" aria-level={3}>
                Sugestões
              </span>
              <ul id="search-suggestion" class="flex flex-col gap-6">
                {searches.map(({ term }) => (
                  <li>
                    <a href={`/s?q=${term}`} class="flex gap-4 items-center">
                      <span>
                        <Icon
                          id="MagnifyingGlass"
                          size={24}
                          strokeWidth={0.01}
                        />
                      </span>
                      <span>{term}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              class={
                hasProducts
                  ? "flex flex-col pt-6 md:pt-0 gap-6 overflow-x-hidden"
                  : "hidden"
              }
            >
              <span class="font-medium text-xl" role="heading" aria-level={3}>
                Produtos sugeridos
              </span>
              <Slider class="carousel">
                {products.map((product, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item first:ml-4 last:mr-4 min-w-[200px] max-w-[200px]"
                  >
                    <ProductCard product={product} platform={"vtex"} />
                  </Slider.Item>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
