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

  const filtersWithOutColors = page.filters.filter((filter) =>
    filter.key !== "cor"
  );

  const productColors: string[] = [];

  page.products.forEach((product) => {
    (product.isVariantOf?.hasVariant ?? []).forEach((variant) => {
      const color = variant.additionalProperty?.find((property) =>
        property.name === "Cor"
      )?.value;

      if (color) productColors.push(color);
    });
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

  if (comingColorFilters) {
    const filteredValues = comingColorFilters.values.filter((option) =>
      productColors.includes(option.label)
    );

    filteredColorsFilters.quantity = filteredValues.length;
    filteredColorsFilters.values = filteredValues;
  }

  const sellers = [
    { id: "1", name: "Meia Sola" },
    { id: "lancaperfume", name: "Lança Perfume" },
    // { id: "Lojamyft", name: "Lojamyft" },
    // { id: "MSL", name: "Lojamyft" },
  ];

  const sellerFilter: Filter = {
    "@type": "FilterToggle",
    key: "seller",
    label: "Vendedor",
    quantity: sellers.length,
    values: sellers.map((seller) => {
      const sellerSearchParam = `filter.seller=${seller.id}`;

      const searchIsEmpty = url.search === "";

      let search = searchIsEmpty ? "?" : url.search;
      const selected = search.includes(sellerSearchParam);
      if (selected) {
        search = search.replace(`${sellerSearchParam}`, "");
      } else {
        search += "&" + sellerSearchParam;
      }

      search = search.replace("&&", "&");
      search = search.replace("?&", "?");

      return {
        value: seller.id,
        selected,
        url: search === "?" ? "" : search,
        label: seller.name,
      };
    }),
  };

  return {
    ...page,
    filters: [
      ...filtersWithOutColors,
      filteredColorsFilters,
      sellerFilter,
    ],
    search: {
      term: url.searchParams.get("q"),
      pathname: url.pathname,
    },
  };
};

export default loader;
