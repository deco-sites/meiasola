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
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function ProductShelf({
  title,
  description,
  seeMoreUrl,
  products,
  forceFullWidth,
  interval
}: Props) {
  const id = useId();

  if (!products || products?.length === 0) return null;

  return (
    <div
      class={`${
        forceFullWidth ? "" : "container"
      } relative py-6 flex flex-col gap-6 text-black`}
    >
      <div class={`flex justify-between ${forceFullWidth ? "container" : ""}`}>
        <div class="flex flex-col tablet:flex-row tablet:items-end gap-4">
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
            forceFullWidth
              ? "gap-[2px]"
              : "gap-4 laptop:gap-5 -mx-[24px] mobile:-mx-[50px] laptop:-mx-0"
          } overflow-y-hidden`}
        >
          {products?.map((product, index) => {
            const isFirst = index === 0;
            const isLast = index === products.length - 1;
            return (
              <Slider.Item
                index={index}
                class={`carousel-item ${
                  forceFullWidth ? (isLast ? "snap-end" : "snap-center") : ""
                } ${
                  !forceFullWidth && isFirst
                    ? "pl-[24px] mobile:pl-[50px] laptop:pl-0"
                    : ""
                } ${
                  !forceFullWidth && isLast
                    ? "pr-[24px] mobile:pr-[50px] laptop:pr-0"
                    : ""
                }`}
              >
                <div class="w-[310px] desktop:w-[calc((100vw-70px-70px)/4-20px)] monitor:w-[310px]">
                  <ProductCard product={product} itemListName={title} />
                </div>
              </Slider.Item>
            );
          })}
        </Slider>

        <Slider.PrevButton class="absolute left-[25px] top-1/2 -translate-y-1/2 z-10" />
        <Slider.NextButton class="absolute right-[25px] top-1/2 -translate-y-1/2 z-10" />

        <SliderJS rootId={id} interval={interval && interval * 1e3} />

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
