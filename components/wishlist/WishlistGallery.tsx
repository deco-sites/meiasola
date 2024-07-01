import { AppContext } from "apps/vtex/mod.ts";
import SearchResult, {
  Props as SearchResultProps,
} from "$store/components/search/SearchResult.tsx";

export type Props = SearchResultProps;

function WishlistGallery(props: Props) {
  const isEmpty = !props.page || props.page?.products?.length === 0;

  if (isEmpty) {
    return (
      <div class="container mx-4 tablet:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">Your wishlist is empty</span>
          <span>
            Log in and add items to your wishlist for later. They will show up
            here
          </span>
        </div>
      </div>
    );
  }

  return <SearchResult notFoundPage={null} isWishlistPage {...props} />;
}

async function loader(props: Props, req: Request, ctx: AppContext) {
  if (!props.page || !props.page.products || props.page.products.length === 0) {
    return {
      ...props,
    };
  }

  const products = await ctx.invoke.vtex.loaders.intelligentSearch.productList({
    ids: props.page?.products.map((product) => product.productID),
  });

  return {
    ...props,
    page: {
      ...props.page,
      products,
    },
    isWishlist: true,
  };
}

export { loader };

export default WishlistGallery;
