import { Route, Size } from "site/components/search/types.ts";

export function Sizes({
  title,
  routes,
  sizes,
  url,
}: {
  title: string;
  routes: Route[];
  sizes: Size[];
  url: URL;
}) {
  if (!routes.findLast((route) => url.pathname.includes(route.label)))
    return null;
  return (
    <div class="bg-black text-white text-large py-6 laptop:py-5">
      <div class="container flex flex-col items-center gap-8 laptop:flex-row laptop:justify-between">
        <h4 class="text-large tracking-wide text-center laptop:text-left">
          {title}
        </h4>
        <ul class="grid grid-cols-4 gap-8 tablet:flex tablet:flex-wrap tablet:justify-center laptop:gap-6 desktop:gap-8">
          {sizes?.map((size, index) => {
            const sizeUrl = new URL(url.href);
            const isActive = sizeUrl.search.includes(
              `filter.tamanho=${size.label}`
            );
            if (isActive) sizeUrl.searchParams.delete("filter.tamanho");
            else {
              if (sizeUrl.searchParams.get("filter.tamanho"))
                sizeUrl.searchParams.set("filter.tamanho", size.label);
              else sizeUrl.searchParams.append("filter.tamanho", size.label);
            }
            return (
              <li key={"size-" + index}>
                <a
                  href={sizeUrl.href}
                  aria-label={`Numeração ${size.label}`}
                  class={`border border-white h-10 w-10 flex items-center justify-center hover:bg-white hover:text-black ${
                    isActive ? "bg-white text-black" : ""
                  } transition-all duration-300 ease-out`}
                >
                  {size.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
