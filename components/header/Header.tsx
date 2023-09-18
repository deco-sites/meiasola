import Alert from "$store/components/header/Alert.tsx";
import type { Props as AlertProps } from "$store/components/header/Alert.tsx";
import Navbar from "$store/components/header/Navbar.tsx";
import type { Props as NavbarProps } from "$store/components/header/Navbar.tsx";

export interface Props {
  alert: AlertProps;
  navbar: NavbarProps;
}

function Header({
  alert,
  navbar,
}: Props) {
  return (
    <header class="h-[calc(43px+73px)]">
      <div class="fixed z-50 w-screen">
        <Alert {...alert} />
        <Navbar {...navbar} />
      </div>
    </header>
  );
}

export default Header;
