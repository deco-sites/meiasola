import { Filter, ProductListingPage } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { AppContext } from "apps/vtex/mod.ts";

/**
 * @title Meia Sola - Get URL
 * @description Add extra data to your loader. This may harm performance
 */
const loader = (
  props: undefined,
  req: Request,
  ctx: AppContext,
): ExtensionOf<ProductListingPage | null> =>
(page: ProductListingPage | null) => {
  if (page == null) {
    return page;
  }

  const { url: baseUrl } = req;
  const url = new URL(baseUrl);

  const filters = page.filters.filter((filter) => filter.key !== "cor");

  const productColors: string[] = [];

  page.products.forEach((product) => {
    (product.isVariantOf?.hasVariant ?? []).forEach((variant) => {
      const color = variant.additionalProperty?.find((property) =>
        property.name === "Cor"
      )?.value;

      if (color) productColors.push(color);
    })
  });

  const comingColorFilters = page.filters.find((filter) =>
    filter.key === "cor"
  );

  const filteredColorsFilters: Filter = {
    "@type": "FilterToggle",
    key: "cor",
    label: "Cor",
    quantity: 0,
    values: [],
  };

  console.log(page.pageInfo)

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
      ...filters,
      filteredColorsFilters,
    ],
    search: {
      term: url.searchParams.get("q"),
      pathname: url.pathname,
    },
  };
};

export default loader;
