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
  goToCheckout?: boolean;
}

const useAddToCart = ({
  price,
  name,
  discount,
  productGroupID,
  productID,
  onAddItem,
  goToCheckout,
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

      if (!goToCheckout) displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading };
};

export default function AddToCartButton(props: Props) {
  const { loading, onClick } = useAddToCart(props);

  return (
    <button
      onClick={onClick}
      data-deco="add-to-cart"
      class={
        props.class
          ? props.class
          : "flex items-center justify-center gap-2 text-body text-black h-[45px] p-0 font-normal w-full bg-transparent hover:bg-transparent normal-case border border-black disabled:bg-transparent"
      }
    >
      {loading ? (
        <span class="loading loading-spinner loading-current h-3 w-3" />
      ) : (
        <>{props.children ? props.children : <>ADICIONAR À SACOLA</>}</>
      )}
    </button>
  );
}
