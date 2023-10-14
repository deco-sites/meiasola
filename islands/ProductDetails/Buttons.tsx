import { useUI } from "$store/sdk/useUI.ts";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

import AddToCartButtonComponent from "$store/components/product/AddToCartButton/vtex.tsx";
import type { Props } from "$store/components/product/AddToCartButton/vtex.tsx";

export function AddToCartButton(props: Props) {
  return <AddToCartButtonComponent {...props} />;
}

export function SizeGuideButton() {
  const { displaySizeGuide } = useUI();

  return (
    <Button
      aria-label="Abrir Guia de Tamanhos"
      class="flex justify-center gap-2 text-small underline text-black h-fit p-0 font-normal bg-transparent hover:bg-transparent normal-case disabled:bg-transparent"
      onClick={() => {
        displaySizeGuide.value = true;
      }}
    >
      <Icon id="Ruler" class="h-3 w-3" />
      Guia de Tamanhos
    </Button>
  );
}

export function NotifyMeButton({ productID }: { productID: string }) {
  const { displayNotifyMe } = useUI();

  return (
    <Button
      aria-label="Avise-me quando chegar"
      class="bg-gray-2 hover:bg-grey-2 text-white w-full !h-[45px] font-normal flex items-center justify-center text-body"
      onClick={() => {
        displayNotifyMe.value = productID;
      }}
    >
      Avise-me quando chegar
    </Button>
  );
}
