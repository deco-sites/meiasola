import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";

import Divider from "$store/components/ui/Divider.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { parseRange } from "apps/commerce/utils/filters.ts";
import { formatPrice } from "deco-sites/meiasola/sdk/format.ts";

export interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem({
  url,
  selected,
  label,
  quantity,
  showQuantity,
}: FilterToggleValue & { showQuantity?: boolean }) {
  return (
    <a
      href={url}
      class={`text-small ${
        selected
          ? "text-black border rounded-full px-3 py-1 inline-flex items-center gap-2 w-fit"
          : "text-filter block"
      }`}
    >
      {label} {showQuantity && <>({quantity})</>}{" "}
      {selected && <Icon id="XMark" className="h-2 w-2" />}
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  return (
    <ul class="flex flex-col gap-3">
      {values.map((item, index) => {
        if (key === "price") {
          const range = parseRange(item.value);

          return (
            range && (
              <ValueItem
                {...item}
                label={`${formatPrice(range.from)} a ${formatPrice(range.to)}`}
              />
            )
          );
        }

        return (
          <li key={`key-${key}-value-${index}`}>
            <ValueItem {...item} showQuantity={key !== "seller"} />
          </li>
        );
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex flex-col gap-6 text-black">
      {filters.filter(isToggle).map((filter, index) => {
        if (filter.quantity > 0 && filter.label !== "Departamento") {
          return (
            <>
              <Divider className={index === 0 ? "hidden laptop:flex" : ""} />
              <li class="flex flex-col gap-3">
                <span class="font-medium text-large">{filter.label}</span>
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
