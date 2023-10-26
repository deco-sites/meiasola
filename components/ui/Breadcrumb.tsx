import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];
  const filtered = items.filter(({ name, item }) => name && item);

  return (
    <ul class="flex items-center gap-2 text-black w-full">
      {filtered.map(({ name, item }, index) => (
        <>
          {index !== 0 && <li class="text-small">|</li>}
          <li class={name.split(" ").length > 4 ? "line-clamp-1" : "shrink-0"}>
            <a aria-label={name} href={item} class="uppercase text-small">
              {name}
            </a>
          </li>
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
