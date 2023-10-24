import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];
  const filtered = items.filter(({ name, item }) => name && item);

  return (
    <ul class="flex items-center gap-2 text-black">
      {filtered.map(({ name, item }, index) => (
        <>
          {index !== 0 && <li class="text-small">|</li>}
          <li>
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
