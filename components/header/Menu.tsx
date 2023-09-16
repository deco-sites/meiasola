import { useSignal } from "@preact/signals";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Divider from "$store/components/ui/Divider.tsx";

import Aside from "$store/components/header/Drawers/Aside.tsx";

import type {
  Props as NavItemProps,
  SubMenuProps,
} from "$store/components/header/NavItem.tsx";
import WishListButton from "$store/components/header/Buttons/WishList.tsx";
import type { Props as WishListButtonProps } from "$store/components/header/Buttons/WishList.tsx";
import MyAccountButton from "$store/components/header/Buttons/MyAccount.tsx";
import type { Props as MyAccountButtonProps } from "$store/components/header/Buttons/MyAccount.tsx";

export interface Props {
  items: NavItemProps[];
}

function Menu(
  { items, myaccount, wishlist }: Props & {
    wishlist: WishListButtonProps;
    myaccount: MyAccountButtonProps;
  },
) {
  const submenu = useSignal<SubMenuProps | undefined>(undefined);

  return (
    <Drawer
      open={!!submenu.value}
      onClose={() => submenu.value = undefined}
      aside={
        <Aside onClose={() => submenu.value = undefined} chevronLeft>
          {submenu.value && <SubMenu {...submenu.value} />}
        </Aside>
      }
    >
      <nav class="flex flex-col justify-between grow">
        <ul class="flex flex-col">
          {items?.map((item) => (
            <MenuItem
              {...item}
              openSubmenu={() => submenu.value = item.submenu}
            />
          ))}
        </ul>

        <ul class="flex flex-col gap-8">
          <li>
            <WishListButton {...wishlist} variantMenu />
          </li>
          <li>
            <MyAccountButton {...myaccount} variantMenu />
          </li>
        </ul>
      </nav>
    </Drawer>
  );
}

export default Menu;

function SubMenu({ sections }: SubMenuProps) {
  return (
    <nav class="flex flex-col justify-between grow">
      <ul class="flex flex-col">
        {sections?.map((section, index) => (
          <>
            {index != 0 && (
              <li>
                <Divider className="my-4" />
              </li>
            )}
            <li>
              {!section.hideSectionOnMobile && (
                <p class="uppercase text-large font-bold my-4">
                  {section.label}
                </p>
              )}
              <ul
                class={`${
                  section.showItemsAsSquare &&
                  "flex flex-wrap gap-x-7 gap-y-6 mt-4"
                }`}
              >
                {section.items?.map((item) => (
                  <li>
                    <a
                      href={item.href}
                      class={`inline-block my-4 text-body ${
                        item.underlined && "text-small underline"
                      }
                      ${
                        section.showItemsAsSquare &&
                        "px-2.5 h-[38px] flex items-center justify-center border border-black text-large leading-none !my-0"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </>
        ))}
      </ul>
    </nav>
  );
}

function MenuItem(
  { label, divider, href, icon, submenu, openSubmenu }: NavItemProps & {
    openSubmenu: () => void;
  },
) {
  const content = icon
    ? (
      <Icon
        id={icon.src}
        width={icon.width}
        height={icon.height}
      />
    )
    : (
      <span
        class="text-large uppercase font-medium"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    );

  return (
    <>
      {divider && (
        <li>
          <Divider className="my-4" />
        </li>
      )}
      <li>
        {!submenu
          ? <a href={href} class="my-4 w-fit inline-flex">{content}</a>
          : (
            <Button onClick={openSubmenu} class="py-4">
              {content}
            </Button>
          )}
      </li>
    </>
  );
}
