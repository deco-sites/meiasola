import { Head, Partial } from "$fresh/runtime.ts";

import type { ProductDetailsPage, ProductLeaf } from "apps/commerce/types.ts";

import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import { SendEventOnLoad } from "$store/components/Analytics.tsx";
import Button from "$store/components/ui/Button.tsx";
import Divider from "$store/components/ui/Divider.tsx";

import { useOffer } from "$store/sdk/useOffer.ts";

import {
  Name,
  Prices,
  Sizes,
  Seller,
  Actions,
  Colors,
  Description,
  Images,
  CEP,
} from "$store/components/product/ProductDetails/Sections.tsx";

import type { Props as SizeGuideProps } from "$store/components/product/ProductDetails/Modals/SizeGuide.tsx";

import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";

type DetailsPageWithColorVariants = ProductListingPage & {
  colorVariants: ProductLeaf[];
};

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  size: SizeGuideProps;
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

function Details({
  page,
  sizeProps,
}: {
  page: DetailsPageWithColorVariants;
  sizeProps: SizeGuideProps;
}) {
  const { price = 0, listPrice, seller = "1" } = useOffer(page.product.offers);

  return (
    <div class="col-span-4 flex flex-col gap-8">
      {/* <Partial name="sections"> */}
      <Name {...page} />
      <Prices product={page.product} />
      <Sizes product={page.product} sizeProps={sizeProps} />
      <Divider className="-mt-4" />
      <Seller product={page.product} />
      <Colors
        colorVariants={page.colorVariants}
        productSku={page.product.sku}
      />
      <Actions product={page.product} />
      <Description product={page.product} />
      {/* </Partial> */}
      <CEP sku={parseInt(page.product.sku)} seller={seller} />

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

function ProductDetails({ page, size }: Props) {
  if (page) {
    const productVideo = page.product.isVariantOf.additionalProperty.find(
      ({ name }: { name: string }) => name === "Vídeo"
    )?.value;
    return (
      <>
        <Head>
          <script
            type="text/javascript"
            src="//colt.trustvox.com.br/colt.min.js"
          ></script>

          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                window._trustvox = []; _trustvox.push(['_storeId', '123680']);
                _trustvox.push(['_productId', ${page.product.inProductGroupWithID}]);
                _trustvox.push(['_productName', "${page.product.name}"]);
                _trustvox.push(['_productPhotos', ${
                  page.product?.image
                    ? `["${page.product.image[0].url}"]`
                    : "[]"
                }]);

                var _trustvox_shelf_rate = _trustvox_shelf_rate || [];
                _trustvox_shelf_rate.push(['_storeId', '123680']);
              `,
            }}
          />
          <script
            async
            type="text/javascript"
            src="//static.trustvox.com.br/sincero/sincero.js"
          ></script>
          <script
            type="text/javascript"
            async
            src="//rate.trustvox.com.br/widget.js"
          ></script>
        </Head>
        <div
          class="container grid grid-cols-4 laptop:grid-cols-12 gap-4 desktop:gap-5 pb-6 laptop:py-11 text-black"
          f-client-nav
        >
          {/* <Partial name="images"> */}
          <Images images={page.product.image} productVideo={productVideo} />
          {/* </Partial> */}
          <Details
            page={page as DetailsPageWithColorVariants}
            sizeProps={size}
          />

          <div id="trustvox-reviews" class="col-span-full my-9">
            <div id="_trustvox_widget"></div>
          </div>
        </div>
      </>
    );
  }

  return <NotFound />;
}

export default ProductDetails;
