import { ProductListingPage } from "apps/commerce/types.ts";
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
async (page: ProductListingPage | null) => {
  if (page == null) {
    return page;
  }

  const { url: baseUrl } = req;
  const url = new URL(baseUrl);

  return {
    ...page,
    search: {
        term: url.searchParams.get("q"),
        pathname: url.pathname 
    }
  };
};

export default loader;
