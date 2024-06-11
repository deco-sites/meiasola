import { AppContext } from "../apps/site.ts";
import { AppContext as AppContextVTEX } from "apps/vtex/mod.ts";

interface Wishlist {
  productIDs: string[];
}

async function loader(
  _: unknown,
  _req: Request,
  ctx: AppContext
): Promise<Wishlist> {
  const response = await (ctx as unknown as AppContextVTEX).invoke(
    "vtex/loaders/wishlist.ts",
    { count: Infinity }
  );

  return {
    productIDs: response.map((item) => item.sku),
  };
}

export default loader;
