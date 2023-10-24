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
      publicUrl: "secure.meiasola.com.br",
      platform: "vtex",
    });

    const model = page.product.isVariantOf?.model ?? "";

    const defaultColorsVariants = [];

    page.product.isVariantOf?.hasVariant.forEach((variant) => {
      const colorProperty = variant.additionalProperty.find(
        (property) => property.name?.toLowerCase() === "cor"
      );

      if (!!colorProperty) {
        if (!defaultColorsVariants.includes(colorProperty.value)) {
          defaultColorsVariants.push(colorProperty.value);
        }
      }
    });

    const finalColorVariants: ProductLeaf[] = [];

    if (defaultColorsVariants.length > 1) {
      page.product.isVariantOf?.hasVariant.forEach((p) => {
        finalColorVariants.push(p);
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
        if (
          p.productReference &&
          p.productReference.slice(0, 10) === model.slice(0, 10)
        ) {
          finalColorVariants.push(toProduct(p, p.items[0], 0, options));
        }
      });
    }

    return {
      ...page,
      colorVariants: finalColorVariants,
    };
  };

export default loader;
