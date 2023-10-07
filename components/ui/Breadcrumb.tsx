import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];
  const filtered = items.filter(({ name, item }) => name && item);

  return (
    <ul class="flex items-center gap-2">
      {filtered.map(({ name, item }, index) => (
        <>
          {index !== 0 && <li class="text-small text-grey-2">|</li>}
          <li>
            <a
              href={item}
              class={`uppercase text-small ${
                index === filtered.length - 1 ? "text-black" : "text-grey-2"
              }`}
            >
              {name}
            </a>
          </li>
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
