import { useUI } from "$store/sdk/useUI.ts";

import Button, { Props as ButtonProps } from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  className?: ButtonProps["className"];
}

export default function ButtonFilters({ className = "" }: Props) {
  const { displayFilters } = useUI();

  return (
    <Button
      className={`border flex items-center justify-center gap-2 p-2 w-full text-small text-black ${className}`}
      aria-label="Abrir Filtros"
      onClick={() => {
        displayFilters.value = true;
      }}
    >
      Filtro
      <Icon id="Filter" class="h-6 w-6" />
    </Button>
  );
}
