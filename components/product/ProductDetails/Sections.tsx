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
import {
  AddToCartButton,
  SizeGuideButton,
  NotifyMeButton,
} from "$store/islands/ProductDetails/Buttons.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

import {
  IslandSizeGuide,
  IslandNotifyMe,
} from "$store/islands/ProductDetails/Modals.tsx";
import { Props as SizeGuideProps } from "$store/components/product/ProductDetails/Modals/SizeGuide.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";

export function Name({ breadcrumbList, product, seo }: ProductDetailsPage) {
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
        <h1 class="text-subtitle font-normal">{seo?.title ?? product.name}</h1>
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

export function Prices({
  product,
}: {
  product: ProductDetailsPage["product"];
}) {
  const { listPrice, price, installments } = useOffer(product.offers);

  const discountPercentage =
    listPrice && price ? Math.ceil(100 - (price / listPrice) * 100) : 0;

  const freeShippingValue = 100;
  const showFreeShipping = listPrice >= 100; // get this number from admin, is the same number of free shipping in cart

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
        {showFreeShipping && (
          <button
            type="button"
            class="bg-green-1 text-green-2 text-small p-1 flex items-center gap-1 leading-none font-bold relative group cursor-pointer"
          >
            FRETE GRÁTIS
            <Icon id="Info" class="h-3.5 w-3.5 shrink-0" />
            <span class="bg-black rounded-[4px] font-normal text-white hidden group-focus:block absolute top-8 left-1/2 -translate-x-1/2 p-3 text-small w-max">
              Frete grátis válido para
              <br />
              pedidos acima de{" "}
              <strong>
                {formatPrice(freeShippingValue, product.offers!.priceCurrency!)}
              </strong>
            </span>
          </button>
        )}
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

export function Images({
  images,
}: {
  images: ProductDetailsPage["product"]["image"];
}) {
  if (!images || images.length === 0) return null;

  const justOneImage = images.length === 1;

  let imagesList = [...images];

  if (!justOneImage && images.length < 4) {
    // repeat array to repeat when have just 2 or 3 images
    imagesList = [...images, ...images].slice(0, 4);
  }

  const id = useId();

  return (
    <>
      <div
        class={`hidden laptop:grid ${
          justOneImage ? "grid-cols-1 grid-rows-1" : "grid-cols-2 grid-rows-2"
        } gap-[2px] col-span-8 pr-5`}
      >
        {imagesList.map((image, index) => {
          if (!image.url) return null;

          return (
            <div
              class={`bg-grey-1 w-full p-6 ${
                justOneImage ? "h-[800px]" : "h-[400px]"
              } flex-1`}
              key={`image-${index}`}
            >
              <Image
                src={image.url}
                width={400}
                height={400}
                fit="contain"
                loading="low"
                fetchPriority="high"
                class="mix-blend-multiply h-full w-full object-contain flex-1"
              />
            </div>
          );
        })}
      </div>
      <div
        id={id}
        class="relative laptop:hidden col-span-4 -mx-6 mobile:-mx-[50px]"
      >
        <Slider class="carousel carousel-start flex gap-4 bg-grey-1">
          {imagesList.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <div class="bg-grey-1 w-full h-[400px] flex-1">
                <Image
                  src={image.url}
                  width={400}
                  height={400}
                  fit="contain"
                  loading="low"
                  fetchPriority="high"
                  class="mix-blend-multiply h-full w-full object-contain flex-1"
                />
              </div>
            </Slider.Item>
          ))}
        </Slider>

        {!justOneImage && (
          <div class="flex gap-8 absolute bottom-6 left-1/2 -translate-x-1/2">
            {imagesList.map((image, index) => (
              <Slider.Dot index={index}>
                <span class="block h-[6px] w-[6px] rounded-full bg-grey-2 group-disabled:bg-black" />
              </Slider.Dot>
            ))}
          </div>
        )}

        <SliderJS rootId={id} />
      </div>
    </>
  );
}

export function Seller({
  product,
}: {
  product: ProductDetailsPage["product"];
}) {
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

export function Sizes({
  product,
  sizeProps,
}: {
  product: ProductDetailsPage["product"];
  sizeProps: SizeGuideProps;
}) {
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
        <SizeGuideButton />
      </div>

      <ul class="flex flex-wrap justify-between tablet:justify-start gap-3">
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

      <IslandSizeGuide {...sizeProps} />

      <Divider />
    </div>
  );
}

export function Description({
  product,
}: {
  product: ProductDetailsPage["product"];
}) {
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

export function Colors({
  product,
}: {
  product: ProductDetailsPage["product"];
}) {
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
                class={`block border hover:border-black transition-all duration-300 ease-out w-[64px] h-[72px] bg-grey-1 ${
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

export function Actions({
  product,
}: {
  product: ProductDetailsPage["product"];
}) {
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
          <AddToCartButton
            name={product.name ?? ""}
            productID={product.productID}
            productGroupID={productGroupID}
            price={price}
            discount={discount}
            seller={seller}
            class="bg-black hover:bg-black text-white w-full !h-[45px] font-normal flex items-center justify-center text-body disabled:opacity-50"
          >
            COMPRAR
          </AddToCartButton>
        </a>
        <AddToCartButton
          name={product.name ?? ""}
          productID={product.productID}
          productGroupID={productGroupID}
          price={price}
          discount={discount}
          seller={seller}
        />
      </div>
    );

  return (
    <>
      <NotifyMeButton productID={product.productID} />
      <IslandNotifyMe />
    </>
  );
}

export function CEP({ sku, seller }: { sku: number; seller: string }) {
  return (
    <div class="flex flex-col gap-3 text-small">
      <div class="flex gap-2">
        <Icon id="Location" class="h-3.5 w-3.5 shrink-0" />
        Preencha com seu CEP para consultar a disponibilidade nas lojas perto de
        você.
      </div>
      <ShippingSimulation
        items={[
          {
            id: sku,
            quantity: 1,
            seller,
          },
        ]}
      />
      <a
        href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
        aria-label="Não sei meu CEP"
        class="underline text-black text-small"
        target="_blank"
      >
        Não sei meu CEP
      </a>
    </div>
  );
}
