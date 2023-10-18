import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";

export interface Props {
  title: string;
  description?: string;
  seeMoreUrl?: string;
  products: Product[] | null;
  forceFullWidth?: boolean;
}

function ProductShelf({
  title,
  description,
  seeMoreUrl,
  products,
  forceFullWidth,
}: Props) {
  const id = useId();

  if (!products || products?.length === 0) return null;

  return (
    <div
      class={`w-full ${
        forceFullWidth ? "" : "container"
      } relative py-6 flex flex-col gap-6 text-black`}
    >
      <div class={`flex justify-between ${forceFullWidth ? "container" : ""}`}>
        <div class="flex items-end gap-4">
          <h3 class="font-bold text-subtitle tracking-widest leading-none">
            {title}
          </h3>
          {description && <p class="text-small">{description}</p>}
        </div>
        {seeMoreUrl && (
          <a
            alt="Ver mais produtos"
            class="text-small underline hidden laptop:block"
            href={seeMoreUrl}
          >
            ver mais
          </a>
        )}
      </div>

      <div id={id}>
        <Slider
          class={`carousel carousel-start flex ${
            forceFullWidth ? "gap-[2px]" : "gap-4 laptop:gap-5"
          } overflow-y-hidden`}
        >
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class={`carousel-item w-[288px] monitor:w-[288px] ${
                forceFullWidth
                  ? index === 0
                    ? "snap-start"
                    : index === products.length - 1
                    ? "snap-end"
                    : "snap-center"
                  : "snap-start"
              }`}
            >
              <ProductCard product={product} itemListName={title} />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton class="absolute left-[25px] top-1/2 z-10" />
        <Slider.NextButton class="absolute right-[25px] top-1/2 z-10" />

        <SliderJS rootId={id} />

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...useOffer(product.offers),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
