import { useMemo } from "preact/hooks";

import { ProductListingPage } from "apps/commerce/types.ts";

import Icon from "$store/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (value: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

// TODO: move this to the loader
const portugueseMappings: { [key: string]: string } = {
  "relevance:desc": "Maior Relevância",
  "release:desc": "Mais Recentes",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "name:desc": "Nome - de A a Z",
  "name:asc": "Nome - de Z a A",
  "discount:desc": "Maior Desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <div class="dropdown laptop:dropdown-end">
      <label
        tabIndex={0}
        class="flex gap-2 items-center text-small cursor-pointer"
      >
        {portugueseMappings[sort] ?? "Ordenar por"}
        <Icon id="ChevronDown" class="w-6 h-6" />
      </label>

      <ul
        tabIndex={0}
        class="dropdown-content z-[11] border border-grey-1 bg-white"
      >
        {sortOptions.filter((option) => portugueseMappings[option.label]).map((
          option,
          index,
        ) => (
          <li
            key={`sort-option-${index}`}
            onClick={() => applySort(option.label)}
            class="block w-[200px] py-4 text-center text-small cursor-pointer transition-all duration-300 ease-in-out hover:bg-grey-1 border-t border-grey-1"
            style={{
              borderTop: index === 0 ? "none" : "",
            }}
          >
            {portugueseMappings[option.label]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sort;
