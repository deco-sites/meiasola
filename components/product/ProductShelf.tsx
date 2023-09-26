import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import ProductCard from "$store/components/product/ProductCard.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";

export interface Props {
  title?: string;
  description?: string;
  products: Product[] | null;
}

function ProductShelf({
  title,
  description,
  products,
}: Props) {
  const id = useId();

  if (!products || products?.length === 0) return null;

  return (
    <div class="w-full container py-6 flex flex-col gap-6 text-black">
      {(title || description) && (
        <div class="flex items-end gap-4">
          {title && (
            <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>
          )}
          {description && <p class="text-small">{description}</p>}
        </div>
      )}

      <div
        class="relative"
        id={id}
      >
        <Slider class="carousel carousel-start flex gap-4">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[310px] desktop:flex-1"
            >
              <ProductCard
                product={product}
                itemListName={title}
              />
            </Slider.Item>
          ))}
        </Slider>

        <Slider.PrevButton class="absolute left-[25px] top-1/2" />
        <Slider.NextButton class="absolute right-[25px] top-1/2" />

        <SliderJS rootId={id} />

        <SendEventOnLoad
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product) =>
                mapProductToAnalyticsItem({
                  product,
                  ...(useOffer(product.offers)),
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
