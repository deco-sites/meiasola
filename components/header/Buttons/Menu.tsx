import { useUI } from "$store/sdk/useUI.ts";

import Button, { Props as ButtonProps } from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  className?: ButtonProps["className"];
}

export default function MenuButton({ className }: Props) {
  const { displayMenu } = useUI();

  return (
    <Button
      className={className}
      class="hover:bg-transparent bg-transparent"
      aria-label="Abrir menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Menu" class="h-6 w-6 " />
    </Button>
  );
}
