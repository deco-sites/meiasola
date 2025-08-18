import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Image from "$store/components/ui/Image.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  small?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function ProductCard({ product, preload, itemListName, small }: Props) {
  const { url, productID, name, image: images, offers, isVariantOf } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, availability } = useOffer(offers);

  // Fallback para imagens quebradas
  const handleImageError = (e: Event) => {
    const img = e.target as HTMLImageElement;
    img.style.display = 'none';
  };

  const discountPercentage =
    listPrice && price ? Math.ceil(100 - (price / listPrice) * 100) : 0;

  let availableUrl = url;

  // make this to open product with an available size
  if (availability !== "https://schema.org/InStock") {
    const possibilities = useVariantPossibilities(product);
    const sizes = possibilities["Tamanho"];
    if (sizes && Object.values(sizes).length > 1) {
      for (const variant of Object.values(sizes)) {
        if (variant[0].availability === "https://schema.org/InStock") {
          availableUrl = variant[0].url;
          break;
        }
      }
    }
  }

  return (
    <a
      id={id}
      href={availableUrl && relative(availableUrl)}
      class="group/product-card flex flex-col gap-4 w-full text-black"
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
      <div
        class={`relative overflow-hidden bg-element px-4 py-11 ${
          small ? "h-[264px]" : "h-[345px]"
        } shrink-0 items-center flex justify-center object-center`}
      >
        {/* Wishlist button */}
        <div class="absolute top-4 right-4 z-10">
          <WishlistButton
            variant="icon"
            productGroupID={productGroupID}
            productID={productID}
          />
        </div>

        {/* Percentage Tag */}
        {discountPercentage > 0 ? (
          <div class="bg-black text-white text-small font-bold p-1 absolute top-4 left-4 z-10">
            {discountPercentage}% OFF
          </div>
        ) : null}

        <Image
          width={264}
          height={264}
          fit="contain"
          loading={preload ? "eager" : "lazy"}
          fetchPriority={preload ? "high" : "auto"}
          src={front.url!}
          alt={front.alternateName ?? "Primeira imagem do produto"}
          className="mix-blend-multiply block group-hover/product-card:hidden"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 264px"
          decoding="async"
        />
        <Image
          width={264}
          height={264}
          fit="contain"
          loading="lazy"
          fetchPriority="low"
          src={back?.url ?? front.url!}
          alt={
            back?.alternateName ??
            front.alternateName ??
            "Segunda imagem do produto"
          }
          className="mix-blend-multiply hidden group-hover/product-card:block"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 264px"
          decoding="async"
        />
      </div>

      {/* Prices & Name */}
      <div class="flex flex-col gap-3 w-full h-full justify-between pr-3">
        <div class="flex flex-col gap-3">
          <p class="text-small text-element-dark leading-none">
            {product.brand?.name}
          </p>
          <h4 class="text-body line-clamp-2 capitalize">
            {isVariantOf?.name.toLowerCase() ?? name.toLowerCase()}
          </h4>

          <div
            class="flex"
            style={{
              justifyContent: small ? "flex-start" : "center",
              alignItems: small ? "flex-start" : "center",
            }}
          >
            <div
              data-trustvox-product-code={product.inProductGroupWithID}
            ></div>
          </div>
        </div>

        {discountPercentage > 0 && (
          <span class="line-through text-element-dark text-small leading-none">
            {formatPrice(listPrice, offers!.priceCurrency!)}
          </span>
        )}

        <span class="text-body font-bold leading-none">
          {formatPrice(price, offers!.priceCurrency!)}
        </span>
      </div>
    </a>
  );
}

export default ProductCard;
