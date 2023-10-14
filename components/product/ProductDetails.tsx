import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import ShippingSimulation from "$store/components/ui/ShippingSimulation.tsx";

import WishlistButton from "$store/islands/WishlistButton.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/meiasola/sdk/useVariantPossiblities.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <span class="font-medium text-2xl">Página não encontrada</span>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Details(page: ProductDetailsPage) {
  const { price = 0, listPrice, seller = "1" } = useOffer(page.product.offers);

  return (
    <div class="col-span-4 flex flex-col gap-8">
      <Name {...page} />
      <Prices product={page.product} />
      <Sizes product={page.product} />
      <Seller product={page.product} />
      <Actions product={page.product} />
      <Colors product={page.product} />
      <Description product={page.product} />
      {/* <ShippingSimulation
        items={[
          {
            id: Number(page.product.sku),
            quantity: 1,
            seller,
          },
        ]}
      /> */}

      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product: page.product,
                breadcrumbList: page.breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </div>
  );
}

function Name({ breadcrumbList, product }: ProductDetailsPage) {
  return (
    <div class="flex flex-col gap-4">
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, 2)}
      />

      {/* BRAND */}
      {product.brand?.name && (
        <h4 class="text-large font-bold">{product.brand.name}</h4>
      )}

      {/* NAME AND WISHLIST */}
      <span class="flex w-full items-center justify-between">
        <h1 class="text-subtitle font-normal">{product.name}</h1>
        <WishlistButton
          variant="icon"
          productGroupID={product.isVariantOf?.productGroupID}
          productID={product.productID}
        />
      </span>

      <div class="flex gap-3 text-small">
        <span class="flex gap-1">
          {[1, 2, 3, 4, 5].map((_) => (
            <Icon id="Star" strokeWidth={1} class="w-4 h-4" />
          ))}
        </span>
        Avaliação
      </div>
    </div>
  );
}

function Prices({ product }: { product: ProductDetailsPage["product"] }) {
  const { listPrice, price, installments } = useOffer(product.offers);

  const discountPercentage =
    listPrice && price ? Math.ceil(100 - (price / listPrice) * 100) : 0;

  return (
    <div class="flex flex-col gap-2">
      {discountPercentage > 0 && (
        <span class="line-through text-grey-2 text-body leading-none">
          {formatPrice(listPrice, product.offers!.priceCurrency!)}
        </span>
      )}

      <div class="flex items-center justify-between">
        <span class="flex items-center gap-2">
          <h2 class="text-subtitle font-bold leading-none">
            {formatPrice(price, product.offers!.priceCurrency!)}
          </h2>

          {discountPercentage > 0 && (
            <div class="bg-black text-white text-small font-bold p-1">
              {discountPercentage}% OFF
            </div>
          )}
        </span>
      </div>

      {installments && (
        <h4 class="text-small leading-none flex items-center gap-1">
          ou
          <span class="font-bold">
            {installments.billingDuration}X de{" "}
            {formatPrice(
              installments.billingIncrement,
              product.offers!.priceCurrency!
            )}
          </span>
          {installments.taxes}
        </h4>
      )}
    </div>
  );
}

function Images({
  images,
}: {
  images: ProductDetailsPage["product"]["image"];
}) {
  if (!images || images.length === 0) return null;

  // repeat array to repeat when have just 1, 2 or 3 images
  const imagesList = [...images, ...images, ...images, ...images].slice(0, 4);

  return (
    <>
      <div class="hidden laptop:grid grid-cols-2 grid-rows-2 gap-[2px] col-span-8 pr-5">
        {/* repeat array to repeat when have just 1, 2 or 3 images */}
        {imagesList.map((image) => {
          if (!image.url) return null;

          return (
            <div class="bg-grey-1 w-full p-6 h-[400px] flex-1">
              <Image
                src={image.url}
                width={400}
                height={400}
                fit="contain"
                loading="eager"
                fetchPriority="auto"
                class="mix-blend-multiply h-full w-full object-cover flex-1"
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

function Seller({ product }: { product: ProductDetailsPage["product"] }) {
  const { seller } = useOffer(product.offers);

  const translateSeller = (seller?: string) => {
    switch (seller) {
      case "1":
        return "Meia Sola";
      default:
        return seller;
    }
  };

  return (
    <p class="text-small">Vendido e entregue por: {translateSeller(seller)}</p>
  );
}

function Sizes({ product }: { product: ProductDetailsPage["product"] }) {
  const possibilities = useVariantPossibilities(product);

  let sizes = null;
  if (possibilities["Tamanho"]) {
    sizes = possibilities["Tamanho"];
  }

  if (!sizes || Object.entries(sizes).length <= 1) return null;

  return (
    <div class="flex flex-col gap-3.5">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-body">Tamanho:</h4>
      </div>

      <ul class="flex flex-wrap gap-3">
        {Object.entries(sizes).map(([size, [{ url: link, availability }]]) => {
          const url = new URL(link);
          const sizeSku = url.searchParams.get("skuId");

          const avaliable = availability === "https://schema.org/InStock";

          return (
            <li key={size}>
              <a
                href={link}
                alt={size}
                class={`border p-2.5 block hover:text-white text-large leading-none transition-all duration-300 ease-out ${
                  avaliable
                    ? "border-black hover:bg-black text-black"
                    : "border-grey-2 hover:bg-grey-2 text-grey-2"
                }
                ${
                  sizeSku === product.sku
                    ? avaliable
                      ? "bg-black text-white"
                      : "bg-grey-2 text-white"
                    : ""
                }
                `}
              >
                {size}
              </a>
            </li>
          );
        })}
      </ul>

      <Divider />
    </div>
  );
}

function Description({ product }: { product: ProductDetailsPage["product"] }) {
  if (!product.description) return null;

  const clamp = product.description.split(" ").length > 50;

  return (
    <span class="group">
      <p
        class={`text-small ${
          clamp && "group-[&:not(:has(input:checked))]:line-clamp-4"
        }`}
      >
        <span class="font-bold">Descrição: </span>
        {product.description}
      </p>
      {clamp && (
        <label
          class="underline cursor-pointer text-small [&:has(input:checked)]:hidden"
          for="description-checkbox"
        >
          ver mais
          <input id="description-checkbox" type="checkbox" class="hidden" />
        </label>
      )}
    </span>
  );
}

function Colors({ product }: { product: ProductDetailsPage["product"] }) {
  const possibilities = useVariantPossibilities(product);

  let colors = null;
  if (possibilities["Cor"]) {
    colors = possibilities["Cor"];
  }

  if (!colors || Object.entries(colors).length <= 1) return null;

  return (
    <div class="flex flex-col gap-4">
      <h4 class="font-bold text-body">Outras Cores:</h4>

      <ul class="flex flex-wrap gap-4">
        {Object.entries(colors).map(([color, [data]]) => {
          const { url: link, image: images } = data;

          const url = new URL(link);
          const colorSku = url.searchParams.get("skuId");

          const [image] = images ?? [];

          return (
            <li key={color}>
              <a
                href={link}
                alt={color}
                class={`block border hover:border-black transition-all duration-300 ease-out w-[64px] h-[72px] bg-gray-1 ${
                  colorSku === product.sku
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  alt={`Imagem da cor ${color}`}
                  src={image.url!}
                  width={64}
                  height={72}
                  loading="lazy"
                  fetchPriority="low"
                  className="object-cover w-full h-full mix-blend-multiply"
                  fit="contain"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Actions({ product }: { product: ProductDetailsPage["product"] }) {
  const {
    price = 0,
    listPrice,
    availability,
    seller = "1",
  } = useOffer(product.offers);
  const productGroupID = product.isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  if (availability === "https://schema.org/InStock")
    return (
      <div class="flex flex-col gap-2 justify-center">
        <a alt="Ir para o checkout com esse produto" href="/checkout">
          <AddToCartButtonVTEX
            name={product.name ?? ""}
            productID={product.productID}
            productGroupID={productGroupID}
            price={price}
            discount={discount}
            seller={seller}
            class="bg-black hover:bg-black text-white w-full !h-[45px] font-normal flex items-center justify-center text-body disabled:opacity-50"
          >
            COMPRAR
          </AddToCartButtonVTEX>
        </a>
        <AddToCartButtonVTEX
          name={product.name ?? ""}
          productID={product.productID}
          productGroupID={productGroupID}
          price={price}
          discount={discount}
          seller={seller}
        />
      </div>
    );

  return <OutOfStock productID={product.productID} />;
}

function ProductDetails({ page }: Props) {
  if (page) {
    return (
      <div class="container grid grid-cols-12 gap-4 desktop:gap-5 laptop:py-11 text-black">
        <Images images={page.product.image} />
        <Details {...page} />
      </div>
    );
  }

  return <NotFound />;
}

export default ProductDetails;
