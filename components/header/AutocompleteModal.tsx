import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import type { Product, Search } from "apps/commerce/types.ts";

interface AutocompleteModalProps {
  notFound: boolean;
  hasTerms: boolean;
  hasProducts: boolean;
  searches: Search[];
  products: Product[];
  isRecentSearch: boolean;
  recentSearches: string[];
}

export const AutocompleteModal = ({
  notFound,
  hasTerms,
  hasProducts,
  searches,
  products,
  isRecentSearch,
  recentSearches,
}: AutocompleteModalProps) => {
  const id = useId();
  return (
    <>
      <style type="text/css">
        {`        

            .autocomplete-carousel-item > a {
              width:fit-content;
            }

            .autocomplete-carousel-item > a > div{
              padding:0;
              width:140px;
              height:auto;
              gap:0.5rem;
            }
            
            .autocomplete-carousel-item > a > div > div{
              top:8px;
            }

            .autocomplete-carousel-item > a > div > img{
              width: 140px;
              height: 140px;
              object-fit: cover;
          
            }

            .autocomplete-slider-button{
              display:block;
            }
        `}
      </style>
      <div
        class={
          "fixed left-0 right-0 overflow-y-auto max-h-[75vh] mx-5 mt-2 w-auto max-w-[991px] text-black bg-white p-5 before:bg-transparent before:h-[22px] before:w-full before:block before:absolute before:top-[-22px] before:left-0 tablet:overflow-y-visible tablet:mt-[22px] tablet:mx-auto tablet:max-w-[85vw] laptop:mx-auto  laptop:w-screen  laptop:max-w-[910px] desktop:absolute desktop:right-0 desktop:left-[unset] desktop:top-full  "
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
              Vamos tentar de outro jeito? Verifique a ortografia ou use um
              termo diferente
            </span>
          </div>
        ) : (
          <div class="h-fit overflow-hidden">
            <div
              class={`gap-4 grid ${
                hasTerms
                  ? "grid-rows-[auto_1fr]  grid-cols-1 mobile:grid-rows-[auto] mobile:grid-cols-[150px_1fr] xl:grid-cols-[200px_1fr]"
                  : "grid-cols-1"
              } `}
            >
              <div class={hasTerms ? "flex flex-col gap-4" : "hidden"}>
                <span
                  class="font-bold text-xs uppercase"
                  role="heading"
                  aria-level={3}
                >
                  {isRecentSearch ? "Buscas Recentes" : "Sugestões"}
                </span>
                <ul id="search-suggestion" class="flex flex-col gap-4">
                  {!isRecentSearch
                    ? searches.map(({ term }) => (
                        <li>
                          <a
                            href={`/s?q=${term}`}
                            class="flex gap-4 items-center text-black"
                          >
                            <span class={"capitalize"}>{term}</span>
                          </a>
                        </li>
                      ))
                    : recentSearches.map((term) => (
                        <li>
                          <a
                            href={`/s?q=${term}`}
                            class="flex gap-4 items-center text-black"
                          >
                            <span class={"capitalize"}>{term}</span>
                          </a>
                        </li>
                      ))}
                </ul>
              </div>
              {!isRecentSearch && (
                <div
                  class={
                    hasProducts
                      ? "flex flex-col pt-0 md:pt-0 overflow-x-hidden relative"
                      : "hidden"
                  }
                >
                  <Slider class="overflow-y-hidden carousel autocomplete-carousel laptop:mx-auto">
                    {products.slice(0, 4).map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item autocomplete-carousel-item h-full mx-1 xl:first:ml-4 xl:last:mr-4 min-w-[140px] max-w-[200px]"
                      >
                        <ProductCard product={product} platform={"vtex"} />
                      </Slider.Item>
                    ))}
                  </Slider>

                  <SliderJS rootId={id} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
