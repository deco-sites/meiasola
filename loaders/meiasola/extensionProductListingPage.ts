import { Filter, ProductListingPage } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { AppContext } from "apps/vtex/mod.ts";

/**
 * @title Meia Sola - Extra Info
 * @description Add extra data to your loader. This may harm performance
 */
const loader =
  (
    props: undefined,
    req: Request,
    ctx: AppContext
  ): ExtensionOf<ProductListingPage | null> =>
  (page: ProductListingPage | null) => {
    if (page == null) {
      return page;
    }

    const { url: baseUrl } = req;
    const url = new URL(baseUrl);

    let filters = page.filters;
    if (url.pathname.includes("/bolsas")) {
      filters = page.filters.filter((filter) => filter.key !== "tamanho");
    }

    const filtersWithOutColors = filters.filter(
      (filter) => filter.key !== "cor"
    );

    const productColors: string[] = [];

    page.products.forEach((product) => {
      (product.isVariantOf?.hasVariant ?? []).forEach((variant) => {
        const color = variant.additionalProperty?.find(
          (property) => property.name === "Cor"
        )?.value;

        if (color) productColors.push(color);
      });
    });

    const comingColorFilters = page.filters.find(
      (filter) => filter.key === "cor"
    );

    const filteredColorsFilters: Filter = {
      "@type": "FilterToggle",
      key: "cor",
      label: "Cor",
      quantity: 0,
      values: [],
    };

    if (comingColorFilters) {
      const filteredValues = comingColorFilters.values.filter((option) =>
        productColors.includes(option.label)
      );

      filteredColorsFilters.quantity = filteredValues.length;
      filteredColorsFilters.values = filteredValues;
    }

    return {
      ...page,
      filters: [
        ...filtersWithOutColors,
        // filteredColorsFilters
      ],
      search: {
        term: url.searchParams.get("q"),
        url,
      },
    };
  };

export default loader;
