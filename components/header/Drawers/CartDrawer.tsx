import { useUI } from "$store/sdk/useUI.ts";

import Drawer from "$store/components/ui/Drawer.tsx";
import Cart from "$store/components/minicart/Cart.tsx";

import Aside from "$store/components/ui/Aside.tsx";

import type { Minicart as MinicartProps } from "$store/components/minicart/common/Cart.tsx";

export interface Props {
  minicart: MinicartProps;
}

function CartDrawer({ minicart }: Props) {
  const { displayCart } = useUI();

  const onClose = () => {
    displayCart.value = false;
  };

  return (
    <Drawer
      class="drawer-end"
      open={displayCart.value !== false}
      onClose={onClose}
      aside={
        <Aside title="Carrinho" onClose={onClose}>
          <Cart minicart={minicart} />
        </Aside>
      }
    ></Drawer>
  );
}

export default CartDrawer;
