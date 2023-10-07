import { useUI } from "$store/sdk/useUI.ts";
import { lazy } from "preact/compat";

import Drawer from "$store/components/ui/Drawer.tsx";

import Aside from "$store/components/ui/Aside.tsx";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import type { Props as WishListButtonProps } from "$store/components/header/Buttons/WishList.tsx";
import type { Props as MyAccountButtonProps } from "$store/components/header/Buttons/MyAccount.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  wishlist: WishListButtonProps;
  myaccount: MyAccountButtonProps;
}

function MenuDrawer({ menu, myaccount, wishlist }: Props) {
  const { displayMenu } = useUI();

  const onClose = () => {
    displayMenu.value = false;
  };

  return (
    <Drawer
      open={displayMenu.value}
      onClose={onClose}
      aside={
        <Aside
          onClose={onClose}
        >
          {displayMenu.value && (
            <Menu {...menu} wishlist={wishlist} myaccount={myaccount} />
          )}
        </Aside>
      }
    >
    </Drawer>
  );
}

export default MenuDrawer;
