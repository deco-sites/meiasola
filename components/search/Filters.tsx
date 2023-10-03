import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";

import { formatPrice } from "$store/sdk/format.ts";
import Avatar from "$store/components/ui/Avatar.tsx";
import Divider from "$store/components/ui/Divider.tsx";

interface Props {
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
      class={`block gap-2 border border-current rounded-full px-3 py-1 text-small ${
        selected ? "text-black" : "text-grey-2"
      }`}
    >
      {label}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class="flex flex-wrap gap-x-2 gap-y-3">
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
