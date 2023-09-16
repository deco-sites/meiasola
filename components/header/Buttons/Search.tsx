import { useUI } from "$store/sdk/useUI.ts";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export default function SearchButton() {
  const { displaySearchBar } = useUI();

  return (
    <Button
      class="relative"
      aria-label="Abrir barra de pesquisa"
      onClick={() => {
        displaySearchBar.value = !displaySearchBar.value;
      }}
    >
      {displaySearchBar.value === true && (
        <Icon id="XMark" class="h-2.5 w-2.5 absolute -top-1.5 -right-1.5" />
      )}
      <Icon id="Search" class="h-6 w-6" />
    </Button>
  );
}
