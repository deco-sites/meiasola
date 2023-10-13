import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import Divider from "$store/components/ui/Divider.tsx";

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

function ProductInfo({ page }: { page: ProductDetailsPage }) {
  const { breadcrumbList, product, seo } = page;
  const {
    description,
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const discount = price && listPrice ? listPrice - price : 0;

  return (
    <>
      {/* Breadcrumb */}
      {/* <Breadcrumb
        itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
      /> */}
      {/* Code and name */}
      {/* <div class="mt-4 sm:mt-8">
        <div>
          {gtin && <span class="text-sm text-base-300">Cod. {gtin}</span>}
        </div>
        <h1>
          <span class="font-medium text-xl capitalize">
            {layout?.name === "concat"
              ? `${isVariantOf?.name} ${name}`
              : layout?.name === "productGroup"
              ? isVariantOf?.name
              : name}
          </span>
        </h1>
      </div> */}
      {/* Prices */}
      {/* <div class="mt-4">
        <div class="flex flex-row gap-2 items-center">
          {(listPrice ?? 0) > price && (
            <span class="line-through text-base-300 text-xs">
              {formatPrice(listPrice, offers!.priceCurrency!)}
            </span>
          )}
          <span class="font-medium text-xl text-secondary">
            {formatPrice(price, offers!.priceCurrency!)}
          </span>
        </div>
        <span class="text-sm text-base-300">{installments}</span>
      </div> */}
      {/* Sku Selector */}
      {/* <div class="mt-4 sm:mt-6">
        <ProductSelector product={product} />
      </div> */}
      {/* Add to Cart and Favorites button */}
      <div
      // class="mt-4 sm:mt-10 flex flex-col gap-2"
      >
        {availability === "https://schema.org/InStock" ? (
          <>
            <AddToCartButtonVTEX
              name={name}
              productID={productID}
              productGroupID={productGroupID}
              price={price}
              discount={discount}
              seller={seller}
            />
            {/* <WishlistButton
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            /> */}
          </>
        ) : (
          <OutOfStock productID={productID} />
        )}
      </div>
      {/* Shipping Simulation */}
      {/* <div class="mt-8">
        <ShippingSimulation
          items={[
            {
              id: Number(product.sku),
              quantity: 1,
              seller: seller,
            },
          ]}
        />
      </div> */}
      {/* Description card */}
      {/* <div class="mt-4 sm:mt-6">
        <span class="text-sm">
          {description && (
            <details>
              <summary class="cursor-pointer">Descrição</summary>
              <div class="ml-2 mt-2">{description}</div>
            </details>
          )}
        </span>
      </div> */}
      {/* Analytics Event */}
      <SendEventOnLoad
        event={{
          name: "view_item",
          params: {
            items: [
              mapProductToAnalyticsItem({
                product,
                breadcrumbList,
                price,
                listPrice,
              }),
            ],
          },
        }}
      />
    </>
  );
}

function Details(page: ProductDetailsPage) {
  // const id = useId();
  // const {
  //   page: {
  //     product: { image: images = [] },
  //   },
  //   layout,
  // } = props;
  // const variant = layout?.image ?? "slider";

  // /**
  //  * Product slider variant
  //  *
  //  * Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
  //  * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
  //  * we rearrange each cell with col-start- directives
  //  */
  // if (variant === "slider") {
  //   return (
  //     <>
  //       <div
  //         id={id}
  //         class="grid grid-cols-1 gap-4 sm:grid-cols-[max-content_40vw_40vw] sm:grid-rows-1 sm:justify-center"
  //       >
  //         {/* Image Slider */}
  //         <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
  //           <Slider class="carousel carousel-center gap-6 w-screen sm:w-[40vw]">
  //             {images.map((img, index) => (
  //               <Slider.Item index={index} class="carousel-item w-full">
  //                 <Image
  //                   class="w-full"
  //                   sizes="(max-width: 640px) 100vw, 40vw"
  //                   style={{ aspectRatio: ASPECT_RATIO }}
  //                   src={img.url!}
  //                   alt={img.alternateName}
  //                   width={WIDTH}
  //                   height={HEIGHT}
  //                   // Preload LCP image for better web vitals
  //                   preload={index === 0}
  //                   loading={index === 0 ? "eager" : "lazy"}
  //                 />
  //               </Slider.Item>
  //             ))}
  //           </Slider>

  //           <Slider.PrevButton
  //             class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
  //             disabled
  //           >
  //             <Icon size={24} id="ChevronLeft" strokeWidth={3} />
  //           </Slider.PrevButton>

  //           <Slider.NextButton
  //             class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
  //             disabled={images.length < 2}
  //           >
  //             <Icon size={24} id="ChevronRight" strokeWidth={3} />
  //           </Slider.NextButton>

  //           <div class="absolute top-2 right-2 bg-base-100 rounded-full">
  //             <ProductImageZoom
  //               images={images}
  //               width={700}
  //               height={Math.trunc((700 * HEIGHT) / WIDTH)}
  //             />
  //           </div>
  //         </div>

  //         {/* Dots */}
  //         <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
  //           {images.map((img, index) => (
  //             <li class="min-w-[63px] sm:min-w-[100px]">
  //               <Slider.Dot index={index}>
  //                 <Image
  //                   style={{ aspectRatio: ASPECT_RATIO }}
  //                   class="group-disabled:border-base-300 border rounded "
  //                   width={63}
  //                   height={87.5}
  //                   src={img.url!}
  //                   alt={img.alternateName}
  //                 />
  //               </Slider.Dot>
  //             </li>
  //           ))}
  //         </ul>

  //         {/* Product Info */}
  //         <div class="px-4 sm:pr-0 sm:pl-6 sm:col-start-3 sm:col-span-1 sm:row-start-1">
  //           <ProductInfo {...props} />
  //         </div>
  //       </div>
  //       <SliderJS rootId={id}></SliderJS>
  //     </>
  //   );
  // }

  // /**
  //  * Product front-back variant.
  //  *
  //  * Renders two images side by side both on mobile and on desktop. On mobile, the overflow is
  //  * reached causing a scrollbar to be rendered.
  //  */
  // return (
  //   <div class="grid grid-cols-1 gap-4 sm:grid-cols-[50vw_25vw] sm:grid-rows-1 sm:justify-center">
  //     {/* Image slider */}
  //     <ul class="carousel carousel-center gap-6">
  //       {[images[0], images[1] ?? images[0]].map((img, index) => (
  //         <li class="carousel-item min-w-[100vw] sm:min-w-[24vw]">
  //           <Image
  //             sizes="(max-width: 640px) 100vw, 24vw"
  //             style={{ aspectRatio: ASPECT_RATIO }}
  //             src={img.url!}
  //             alt={img.alternateName}
  //             width={WIDTH}
  //             height={HEIGHT}
  //             // Preload LCP image for better web vitals
  //             preload={index === 0}
  //             loading={index === 0 ? "eager" : "lazy"}
  //           />
  //         </li>
  //       ))}
  //     </ul>

  //     {/* Product Info */}
  //     <div class="px-4 sm:pr-0 sm:pl-6">
  //       <ProductInfo {...props} />
  //     </div>
  //   </div>
  // );

  console.log(page.product);

  return (
    <div class="col-span-4 flex flex-col gap-8">
      <Name {...page} />
      <Prices product={page.product} />
      <Sizes product={page.product} />
      <Seller product={page.product} />
      {/* ACTIONS */}
      {/* VARIANTS */}
      <Description product={page.product} />
      {/* CEP */}
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
        {Object.entries(sizes).map(([size, [link]]) => {
          const url = new URL(link);
          const sizeSku = url.searchParams.get("skuId");

          return (
            <li key={size}>
              <a
                href={link}
                alt={size}
                class={`border border-black p-2.5 block hover:bg-black hover:text-white text-large leading-none transition-all duration-300 ease-out ${
                  sizeSku === product.sku && "bg-black text-white"
                }`}
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
