import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";

import Divider from "$store/components/ui/Divider.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <a
      href={url}
      class={`text-small ${
        selected
          ? "text-black border rounded-full px-3 py-1 inline-flex items-center gap-2"
          : "text-filter block"
      }`}
    >
      {label} ({quantity}) {selected && <Icon id="XMark" className="h-2 w-2" />}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class="flex flex-col gap-3">
      {values.map((item, index) => {
        const { url, selected, value, quantity } = item;

        // if (key === "cor" || key === "tamanho") {
        //   return (
        //     <a href={url}>
        //       <Avatar
        //         content={value}
        //         variant={selected ? "active" : "default"}
        //       />
        //     </a>
        //   );
        // }

        // if (key === "price") {
        //   const range = parseRange(item.value);

        //   return range && (
        //     <ValueItem
        //       {...item}
        //       label={`${formatPrice(range.from)} - ${formatPrice(range.to)}`}
        //     />
        //   );
        // }

        return (
          <li key={`key-${key}-value-${index}`}>
            <ValueItem {...item} />
          </li>
        );
      })}
    </ul>
  );
}

const portugueseMappings: { [key: string]: string } = {
  "Categories": "Categoria",
  "Tamanho": "Tamanho",
  "Brands": "Marca",
  "Cor": "Cores",
};

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 text-black">
      {filters
        .filter(isToggle)
        .map((filter, index) => {
          if (portugueseMappings[filter.label]) {
            return (
              <>
                {index !== 0 && <Divider />}
                <li class="flex flex-col gap-3">
                  <span class="font-medium text-large">
                    {portugueseMappings[filter.label]}
                  </span>
                  <FilterValues {...filter} />
                </li>
              </>
            );
          }
        })}
    </ul>
  );
}

export default Filters;
