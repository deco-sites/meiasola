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
  "release:desc": "Mais Recentes",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais Vendidos",
  "discount:desc": "Maior Desconto",
};

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  const sortedOptions = sortOptions.sort((a, b) => {
    if (a.label === "release:desc") {
      return -1;
    }
    if (b.label === "release:desc") {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div class="dropdown w-full hidden tablet:flex border justify-center p-2 laptop:inline-block laptop:w-fit laptop:justify-end laptop:p-0 laptop:border-none laptop:dropdown-end">
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
          {sortedOptions
            .filter((option) => portugueseMappings[option.label])
            .map((option, index) => (
              <li
                key={`sort-option-${index}`}
                onClick={() => {
                  if (sort !== option.label) applySort(option.label);
                }}
                class={`block w-[200px] py-4 text-center text-small transition-all duration-300 ease-in-out border-t border-grey-1 ${
                  sort === option.label
                    ? "cursor-default text-grey-1"
                    : "cursor-pointer hover:bg-grey-1"
                }`}
                style={{
                  borderTop: index === 0 ? "none" : "",
                }}
              >
                {portugueseMappings[option.label]}
              </li>
            ))}
        </ul>
      </div>
      <div class="tablet:hidden w-full">
        <label
          for="my_modal_6"
          class="flex gap-2 items-center text-small cursor-pointer w-full border justify-center p-2"
        >
          <p class="truncate">{portugueseMappings[sort] ?? "Ordenar por"}</p>
          <Icon id="ChevronDown" class="w-6 h-6" />
        </label>

        <input type="checkbox" id="my_modal_6" class="modal-toggle" />
        <div class="modal modal-bottom rounded-none p-0">
          <div class="modal-box rounded-none p-0">
            <ul
              tabIndex={0}
              class="dropdown-content z-[11] border border-grey-1 bg-white"
            >
              {sortedOptions
                .filter((option) => portugueseMappings[option.label])
                .map((option, index) => (
                  <li
                    key={`sort-option-${index}`}
                    onClick={() => {
                      if (sort !== option.label) applySort(option.label);
                    }}
                    class={`block py-4 text-center text-small transition-all duration-300 ease-in-out border-t border-grey-1 ${
                      sort === option.label
                        ? "cursor-default text-grey-1"
                        : "cursor-pointer hover:bg-grey-1"
                    }`}
                    style={{
                      borderTop: index === 0 ? "none" : "",
                    }}
                  >
                    {portugueseMappings[option.label]}
                  </li>
                ))}
            </ul>
          </div>
          <label class="modal-backdrop" for="my_modal_6">
            Close
          </label>
        </div>
      </div>
    </>
  );
}

export default Sort;
