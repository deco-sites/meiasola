import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";

import type { Product, Search } from "apps/commerce/types.ts";

interface AutocompleteModalProps {
  notFound: boolean;
  hasTerms: boolean;
  hasProducts: boolean;
  searches: Search[];
  products: Product[];
  isRecentSearch: boolean;
}

export const AutocompleteModal = ({
  notFound,
  hasTerms,
  hasProducts,
  searches,
  products,
  isRecentSearch,
}: AutocompleteModalProps) => {
  return (
    <>
      <style type="text/css">
        {`        
            .autocomplete-carousel {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              overflow:hidden;
            }

            .autocomplete-carousel-item {
              margin:0;
            }

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
        `}
      </style>
      <div
        class={
          "absolute right-0 top-full mt-[22px] bg-white w-screen max-w-[910px] p-5"
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
                hasTerms ? "grid-cols-[200px_1fr]" : "grid-cols-1"
              } sm:grid-rows-1 sm:grid-cols-[150px_1fr]`}
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
                  {searches.map(({ term }) => (
                    <li>
                      <a href={`/s?q=${term}`} class="flex gap-4 items-center">
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
                      ? "flex flex-col pt-0 md:pt-0 gap-6 overflow-x-hidden"
                      : "hidden"
                  }
                >
                  {/* <span class="font-medium text-xl" role="heading" aria-level={3}>
                        Produtos sugeridos
                      </span> */}
                  <Slider class="carousel autocomplete-carousel">
                    {products.slice(0, 4).map((product, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item autocomplete-carousel-item h-full first:ml-4 last:mr-4 min-w-[140px] max-w-[200px]"
                      >
                        <ProductCard product={product} platform={"vtex"} />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
