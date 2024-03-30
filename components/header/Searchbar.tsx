import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { useUI } from "$store/sdk/useUI.ts";
import { useAutocomplete } from "apps/vtex/hooks/useAutocomplete.ts";
import { AutocompleteModal } from "deco-sites/meiasola/components/header/AutocompleteModal.tsx";
import { useEffect, useRef, useState } from "preact/compat";

export interface Props {
  /**
   * @title Placeholder
   * @description Search bar default placeholder message
   * @default BUSCAR
   */
  placeholder?: string;
  /**
   * @title Page path
   * @description When user clicks on the search button, navigate it to
   * @default /s
   */
  action?: string;
  /**
   * @title Term name
   * @description Querystring param used when navigating the user
   * @default q
   */
  name?: string;
  /**
   * TODO: Receive querystring from parameter in the server-side
   */
  query?: string;
}

export function SearchbarInput({
  placeholder,
  action,
  name,
  className,
  query,
}: Props & {
  className?: HTMLFormElement["className"];
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mustShowModal, setMustShowModal] = useState<boolean>(false);
  const [isRecentSearch, setIsRecentSearch] = useState<boolean>(true);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);
  const notFound = !hasProducts && !hasTerms;

  useEffect(() => {
    setSearch("", 7);
  }, []);

  return (
    <div class={"relative"}>
      <form
        action={action}
        class={`group border border-current rounded py-1 px-1.5 h-7 w-full laptop:max-w-[250px] grow flex items-center gap-1.5 ${className}`}
      >
        <input
          // ref={searchInputRef}
          name={name}
          placeholder={placeholder}
          class="grow searchbar-input bg-transparent autofill:bg-transparent text-small group-[&.isLarge]:text-body text-current leading-none placeholder:text-small placeholder:group-[&.isLarge]:text-body placeholder:text-current focus:outline-none"
          onInput={(e) => {
            const value = e.currentTarget.value;

            if (!value) {
              setSearch(value, 7);
              setIsRecentSearch(true);
            } else {
              setSearch(value);
              setIsRecentSearch(false);
            }
          }}
          onFocus={() => setMustShowModal(true)}
          onBlur={() => setMustShowModal(false)}
          defaultValue={query}
          autocomplete="off"
        />
        <Button
          type="submit"
          aria-label="Pesquisar"
          class="hover:bg-transparent bg-transparent"
        >
          <Icon
            id="Search"
            class="h-4 w-4 group-[&.isLarge]:h-5 group-[&.isLarge]:w-5"
          />
        </Button>
      </form>

      {mustShowModal && (
        <AutocompleteModal
          {...{
            notFound,
            hasTerms,
            hasProducts,
            searches,
            products,
            isRecentSearch,
          }}
        ></AutocompleteModal>
      )}
    </div>
  );
}

export function SearchbarMobile(props: Props) {
  const { displaySearchBar } = useUI();

  if (!displaySearchBar.value) return null;

  return (
    <div class="absolute top-full left-0 z-50 w-full searchbar-mobile">
      <div class="container pb-2">
        <SearchbarInput {...props} className="!py-1.5 !px-2 !h-9 isLarge" />
      </div>
    </div>
  );
}
