import { ProductDetailsPage, ProductLeaf } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import VTEX, { AppContext } from "apps/vtex/mod.ts";
import { toProduct } from "apps/vtex/utils/transform.ts";

/**
 * @title Meia Sola - Get Model Variants
 * @description Add extra data to your loader. This may harm performance
 */
const loader =
  (
    props: undefined,
    req: Request,
    ctx: AppContext
  ): ExtensionOf<ProductDetailsPage | null> =>
  async (page: ProductDetailsPage | null) => {
    if (page == null) {
      return page;
    }

    const { url } = req;

    const { state } = VTEX({
      account: "meiasola",
      publicUrl: "www.meiasola.com.br",
      platform: "vtex",
    });

    const model = page.product.isVariantOf?.model ?? "";
    const colorVariants: ProductLeaf[] = [];

    if (!model) {
      page.product.isVariantOf?.hasVariant.forEach((p) => {
        colorVariants.push(p);
      });
    } else {
      const { products: vtexProducts } = await state.vcsDeprecated[
        "GET /api/io/_v/api/intelligent-search/product_search/*facets"
      ]({
        query: model.slice(0, 10),
        facets: "/",
      }).then((res) => res.json());

      const options = {
        baseUrl: url,
        priceCurrency: "BRL", // config!.defaultPriceCurrency, // TOO
      };

      vtexProducts.forEach((p) => {
        if (p.productReference.slice(0, 10) === model.slice(0, 10)) {
          colorVariants.push(toProduct(p, p.items[0], 0, options));
        }
      });
    }

    return {
      ...page,
      colorVariants,
    };
  };

export default loader;
