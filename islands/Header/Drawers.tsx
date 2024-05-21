import {
  default as MenuDrawerComponent,
  Props as MenuDrawerProps,
} from "$store/components/header/Drawers/MenuDrawer.tsx";
import {
  default as CartDrawerComponent,
  Props as MinicartProps,
} from "$store/components/header/Drawers/CartDrawer.tsx";

export function IslandMenuDrawer(props: MenuDrawerProps) {
  return <MenuDrawerComponent {...props} />;
}

export function IslandCartDrawer(props: MinicartProps) {
  return <CartDrawerComponent {...props} />;
}
