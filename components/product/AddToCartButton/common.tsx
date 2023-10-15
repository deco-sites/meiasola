import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  name: string;
  productID: string;
  productGroupID: string;
  price: number;
  discount: number;
  onAddItem: () => Promise<void>;

  class?: string;
  children?: ComponentChildren;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  onAddItem,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: {
          items: [
            {
              quantity: 1,
              price,
              item_name: name,
              discount: discount,
              item_id: productGroupID,
              item_variant: productID,
            },
          ],
        },
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const { loading, onClick } = useAddToCart(props);

  return (
    <Button
      disabled={loading}
      onClick={onClick}
      data-deco="add-to-cart"
      class={
        props.class
          ? props.class
          : "flex justify-center gap-2 text-small underline text-black h-fit p-0 font-normal w-full bg-transparent hover:bg-transparent normal-case disabled:bg-transparent"
      }
    >
      {loading.value ? (
        <span class="loading loading-spinner h-3 w-3 loading-current"></span>
      ) : props.children ? (
        props.children
      ) : (
        <>
          <Icon id={"Bag"} class="h-3 w-3" />
          Adicionar à sacola
        </>
      )}
    </Button>
  );
}
