import {
  default as MenuButtonComponent,
  Props as MenuButtonProps,
} from "$store/components/header/Buttons/Menu.tsx";
import { default as SearchButtonComponent } from "$store/components/header/Buttons/Search.tsx";
import { default as CartButtonComponent } from "$store/components/header/Buttons/Cart/vtex.tsx";

export function IslandMenuButton(props: MenuButtonProps) {
  return <MenuButtonComponent {...props} />;
}

export function IslandSearchButton() {
  return <SearchButtonComponent />;
}

export function IslandCartButton() {
  return <CartButtonComponent />;
}
