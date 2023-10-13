import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import { useUI } from "$store/sdk/useUI.ts";

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

export function SearchbarInput(
  { placeholder, action, name, className }: Props & {
    className?: HTMLFormElement["className"];
  },
) {
  return (
    <form
      action={action}
      class={`group border border-current rounded py-1 px-1.5 h-7 w-full laptop:max-w-[250px] grow flex items-center gap-1.5 ${className}`}
    >
      <input
        name={name}
        placeholder={placeholder}
        class="grow searchbar-input bg-transparent text-small group-[&.isLarge]:text-body text-current leading-none placeholder:text-small placeholder:group-[&.isLarge]:text-body placeholder:text-current focus:outline-none"
      />
      <Button type="submit" aria-label="Pesquisar" class="hover:bg-transparent bg-transparent">
        <Icon
          id="Search"
          class="h-4 w-4 group-[&.isLarge]:h-5 group-[&.isLarge]:w-5"
        />
      </Button>
    </form>
  );
}

export function SearchbarMobile(props: Props) {
  const { displaySearchBar } = useUI();

  if (!displaySearchBar.value) return null;

  return (
    <div class="absolute top-full left-0 z-50 bg-white w-full searchbar-mobile">
      <div class="container pb-2">
        <SearchbarInput {...props} className="!py-1.5 !px-2 !h-9 isLarge" />
      </div>
    </div>
  );
}
