import { useUI } from "$store/sdk/useUI.ts";

import Drawer from "$store/components/ui/Drawer.tsx";
import Cart from "$store/components/minicart/Cart.tsx";

import Aside from "$store/components/header/Drawers/Aside.tsx";

function CartDrawer() {
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
        <Aside
          title="Minha sacola"
          onClose={onClose}
        >
          <Cart />
        </Aside>
      }
    >
    </Drawer>
  );
}

export default CartDrawer;
