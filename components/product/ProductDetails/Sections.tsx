import type { ProductDetailsPage, ProductLeaf } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useSignal } from "@preact/signals";
import Modal from "$store/components/ui/Modal.tsx";

import Image from "$store/components/ui/Image.tsx";
import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import { FREE_SHIPPING_VALUE } from "$store/components/constants.ts";
import type { VideoWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";

import WishlistButton from "$store/islands/WishlistButton.tsx";
import {
  AddToCartButton,
  SizeGuideButton,
  NotifyMeButton,
  BuyWithWhatsappButton,
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
import ProductImageZoom from "site/components/product/ProductImageZoom.tsx";

export function Name({ breadcrumbList, product, seo }: ProductDetailsPage) {
  const model = product.isVariantOf?.model ?? "";

  return (
    <div class="flex flex-col gap-4">
      <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, 2)}
      />

      <div data-trustvox-product-code={product.productID}></div>

      {/* BRAND */}
      {product.brand?.name && (
        <h4 class="text-large font-bold">{product.brand.name}</h4>
      )}

      {/* NAME AND WISHLIST */}
      <span class="flex w-full items-center justify-between gap-3 capitalize">
        <h1 class="text-subtitle font-normal">
          {seo?.title?.toLowerCase() ?? product.name.toLowerCase()}
        </h1>
        <WishlistButton
          variant="icon"
          productGroupID={product.isVariantOf?.productGroupID}
          productID={product.productID}
        />
      </span>
      {model && (
        <span class="text-small text-grey-2 uppercase">REF: {model}</span>
      )}
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

  const showFreeShipping = price >= FREE_SHIPPING_VALUE;

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
              Frete grátis Capitais para
              <br />
              pedidos acima de{" "}
              <strong>
                {formatPrice(
                  FREE_SHIPPING_VALUE,
                  product.offers!.priceCurrency!
                )}
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
  productVideo,
}: {
  images: ProductDetailsPage["product"]["image"];
  productVideo: string;
}) {
  if (!images || images.length === 0) return null;

  const justOneImage = images.length === 1;

  let imagesList = [...images];

  if (!justOneImage && images.length < 4) {
    // repeat array to repeat when have just 2 or 3 images
    imagesList = [...images, ...images];
  }

  const id = useId();

  const EmbedVideoUrl = (url: string) => {
    if (url.includes("vimeo")) {
      const videoId = url.split("vimeo.com/").pop();

      return `https://player.vimeo.com/video/${videoId}`;
    }

    if (url.includes("youtube")) {
      const videoId = new URL(url).searchParams.get("v");

      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();

      return `https://www.youtube.com/embed/${videoId}`;
    }
  };

  return (
    <>
      <Head>
        <style type="text/css">
          {`
          @media screen and (min-width: 1280px) and (max-width: 1315px) {
            .videoPdp {
             height: 366px !important;
            }
          }        
        `}
        </style>
      </Head>
      <div
        class={`hidden h-fit laptop:max-w-[590px] desktop:max-w-[801px] laptop:grid ${
          justOneImage ? "grid-cols-1 grid-rows-1" : "grid-cols-2 grid-rows-2"
        } gap-[2px] col-span-8 pr-5`}
      >
        {imagesList.map((image, index) => {
          if (!image.url) return null;

          return (
            <>
              <label for="my_modal_6" class="max-w-[387px]">
                <div
                  class={`bg-grey-1 w-full ${!productVideo ? "p-6" : "p-0"} ${
                    justOneImage
                      ? "h-[800px]"
                      : "h-[284px] desktop:h-[387px] videoPdp"
                  } flex-1 cursor-zoom-in`}
                  key={`image-${index}`}
                >
                  {index === 1 && productVideo ? (
                    <iframe
                      src={`${EmbedVideoUrl(
                        productVideo
                      )}?controls=0&autoplay=1&loop=1&muted=1`}
                      frameborder="0"
                      allow="autoplay; fullscreen"
                      style={{ width: "100%", height: "100%" }}
                      allowfullscreen
                      muted
                    ></iframe>
                  ) : (
                    <Image
                      src={image.url}
                      width={400}
                      height={400}
                      fit="contain"
                      loading="eager"
                      fetchPriority="high"
                      class="mix-blend-multiply h-full w-full object-contain flex-1"
                    />
                  )}
                </div>
              </label>
              <input
                type="checkbox"
                id="my_modal_6"
                class="modal-toggle p-0 "
              />
              <div class=" modal max-w-full rounded-none p-0">
                <div
                  id={id}
                  class=" p-0 m-0 modal-box w-full h-full max-w-full max-h-full rounded-none"
                >
                  <div class=" modal-action max-w-[90%] max-h-[90%]">
                    <label
                      for="my_modal_6"
                      class="btn btn-sm btn-circle btn-outline absolute right-10 top-10"
                    >
                      X
                    </label>
                    <Slider class="carousel carousel-center  w-[90%] items-center ">
                      {imagesList.map((image, index) => (
                        <Slider.Item
                          index={index}
                          class="carousel-item w-full h-full justify-center items-center"
                        >
                          <Image
                            // style={{ aspectRatio: `${1800} / ${1800}` }}
                            fit="contain"
                            src={image.url!}
                            alt={image.alternateName}
                            width={900}
                            height={900}
                            class="h-full w-auto object-contain flex-1"
                            sizes="(max-width: 640px) 100vw, 40vw"
                          />
                        </Slider.Item>
                      ))}
                    </Slider>

                    <Slider.PrevButton class="absolute bottom-10 right-32 btn btn-sm btn-circle btn-outline col-start-1 col-end-2 row-start-1 row-span-full">
                      <Icon size={32} id="ChevronLeft" strokeWidth={3} />
                    </Slider.PrevButton>

                    <Slider.NextButton class="absolute bottom-10 right-10 btn btn-sm btn-circle btn-outline col-start-3 col-end-4 row-start-1 row-span-full">
                      <Icon size={32} id="ChevronRight" strokeWidth={3} />
                    </Slider.NextButton>

                    <ul class="flex-1 rounded-none flex-col absolute left-0 top-10 flex gap-2 px-4">
                      {imagesList.map((img, index) => (
                        <>
                          <li class="h-32 border flex justify-center">
                            <Slider.Dot index={index}>
                              <Image
                                // style={{ aspectRatio: ASPECT_RATIO }}
                                class="group-disabled:border-base-300  rounded-none flex-1"
                                width={85}
                                height={125}
                                src={img.url!}
                                alt={img.alternateName}
                                fit="contain"
                              />
                              <span class="fixed bottom-10 end-20 text-h3 z-50 break-keep	">
                                <p class=" hidden group-disabled:flex">
                                  {index + 1}/{imagesList.length}
                                </p>
                              </span>
                            </Slider.Dot>
                          </li>
                        </>
                      ))}
                    </ul>

                    <SliderJS rootId={id} />
                  </div>
                </div>
              </div>
            </>
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
              <div class="bg-grey-1 w-full h-auto flex-1">
                {index === 1 && productVideo ? (
                  <iframe
                    src={`${EmbedVideoUrl(
                      productVideo
                    )}?controls=0&autoplay=1&loop=1&muted=1`}
                    frameborder="0"
                    allow="autoplay; fullscreen"
                    style={{ width: "100%", height: "100%", aspectRatio: "1" }}
                    allowfullscreen
                    muted
                  ></iframe>
                ) : (
                  <Image
                    src={image.url}
                    width={400}
                    height={400}
                    fit="contain"
                    loading="eager"
                    fetchPriority="high"
                    class="mix-blend-multiply h-full w-full object-contain flex-1"
                  />
                )}
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
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
        style={{ whiteSpace: "pre-wrap" }}
      >
        <span class="font-bold">Descrição: </span>
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
  colorVariants = [],
  productSku,
}: {
  colorVariants: ProductLeaf[];
  productSku: string;
}) {
  if (!colorVariants || colorVariants.length < 2) return null;

  return (
    <div class="flex flex-col gap-4">
      <h4 class="font-bold text-body">Outras Cores:</h4>

      <ul class="flex flex-wrap gap-4">
        {colorVariants?.map((variant) => {
          const [image] = variant.image;

          return (
            <li key={variant.name}>
              <a
                href={variant.url}
                alt={variant.name}
                class={`block border hover:border-black transition-all duration-300 ease-out w-[64px] h-[72px] bg-grey-1 ${
                  variant.sku === productSku
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <Image
                  alt={`Imagem da variante: ${variant.name}`}
                  src={image.url!}
                  width={64}
                  height={72}
                  loading="lazy"
                  fetchPriority="low"
                  className="object-contain w-full h-full mix-blend-multiply"
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
        <AddToCartButton
          name={product.name ?? ""}
          productID={product.productID}
          productGroupID={productGroupID}
          price={price}
          discount={discount}
          seller={seller}
          class="bg-black hover:bg-black text-white w-full !h-[45px] font-normal flex items-center justify-center text-body disabled:opacity-50"
          goToCheckout
        >
          COMPRAR
        </AddToCartButton>
        <AddToCartButton
          name={product.name ?? ""}
          productID={product.productID}
          productGroupID={productGroupID}
          price={price}
          discount={discount}
          seller={seller}
        />
        <BuyWithWhatsappButton productURL={product.url} />
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
    <div class="flex flex-col gap-3 text-small group relative">
      <Divider className="absolute group-[&:has(#shipping-result)]:-top-4 group-[&:not(:has(#shipping-result))]:hidden" />
      <div class="flex gap-2 group-[&:has(#shipping-result)]:hidden">
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
        class="underline text-black text-small group-[&:has(#shipping-result)]:hidden"
        target="_blank"
      >
        Não sei meu CEP
      </a>
    </div>
  );
}
