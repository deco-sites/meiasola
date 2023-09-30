import { SendEventOnClick } from "$store/components/Analytics.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard(
  { product, preload, itemListName }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price } = useOffer(offers);

  return (
    <a
      id={id}
      href={url && relative(url)}
      class="group flex flex-col gap-4 w-full"
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />

      {/* Product Images */}
      <div class="relative overflow-hidden bg-element h-[376px] flex items-center justify-center">
        {/* Wishlist button */}
        <div class="absolute top-4 right-4 z-10">
          <WishlistButton
            variant="icon"
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>

        <img
          src={front.url!}
          alt={front.alternateName}
          class="w-[264px] h-[264px] object-contain mix-blend-multiply block group-hover:hidden"
          loading={preload ? "eager" : "lazy"}
          width={264}
          height={264}
        />
        <img
          src={back?.url ?? front.url!}
          alt={back?.alternateName ?? front.alternateName}
          class="w-[264px] h-[264px] object-contain mix-blend-multiply hidden group-hover:block"
          loading={preload ? "eager" : "lazy"}
          width={264}
          height={264}
        />
      </div>

      {/* Prices & Name */}
      <div class="flex flex-col gap-3 w-full">
        <p class="text-small text-element-dark leading-none">
          {product.brand}
        </p>
        <h4 class="truncate text-body leading-none">
          {name}
        </h4>
        <span class="line-through text-element-dark text-small leading-none">
          {formatPrice(listPrice, offers!.priceCurrency!)}
        </span>
        <span class="text-body font-bold leading-none">
          {formatPrice(price, offers!.priceCurrency!)}
        </span>
      </div>
    </a>
  );
}

export default ProductCard;
