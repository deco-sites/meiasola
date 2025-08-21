import { ProductListingPageAndSearch } from "site/components/search/types.ts";

function PageLink({
  page,
  isActive = false,
  href,
}: {
  href: string;
  page: number;
  isActive?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={`Página ${page}`}
      class={`border border-black h-10 w-10 flex items-center justify-center hover:bg-black hover:text-white ${
        isActive ? "bg-black text-white" : ""
      } transition-all duration-300 ease-out`}
    >
      {page}
    </a>
  );
}

export default function PaginationComponent({
  page,
  isWishlistPage,
}: {
  page: ProductListingPageAndSearch;
  isWishlistPage: boolean;
}) {
  const { pageInfo, search } = page;
  const paginationUrl = !isWishlistPage
    ? new URL(search.url.href)
    : new URL("https://meiasola.com.br/wishlist");
  paginationUrl.searchParams.set("page", "pagination-number");

  return (
    <ul class="flex gap-8">
      {pageInfo.currentPage - 2 > 0 && (
        <PageLink
          page={pageInfo.currentPage - 2}
          href={paginationUrl.href.replace(
            "pagination-number",
            (pageInfo.currentPage - 2).toString()
          )}
        />
      )}

      {pageInfo.previousPage && (
        <PageLink
          page={pageInfo.currentPage - 1}
          href={paginationUrl.href.replace(
            "pagination-number",
            (pageInfo.currentPage - 1).toString()
          )}
        />
      )}

      <PageLink page={pageInfo.currentPage} isActive href={"#"} />

      {pageInfo.currentPage * pageInfo.recordPerPage! < pageInfo.records! && (
        <PageLink
          page={pageInfo.currentPage + 1}
          href={paginationUrl.href.replace(
            "pagination-number",
            (pageInfo.currentPage + 1).toString()
          )}
        />
      )}

      {(pageInfo.currentPage + 1) * pageInfo.recordPerPage! <
        pageInfo.records! && (
        <PageLink
          page={pageInfo.currentPage + 2}
          href={paginationUrl.href.replace(
            "pagination-number",
            (pageInfo.currentPage + 2).toString()
          )}
        />
      )}
    </ul>
  );
}
