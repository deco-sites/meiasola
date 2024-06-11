import { Head } from "$fresh/runtime.ts";

import Logo from "$store/components/ui/Logo.tsx";

import type { Props as MyAccountButtonProps } from "$store/components/header/Buttons/MyAccount.tsx";
import MyAccountButton from "$store/components/header/Buttons/MyAccount.tsx";
import type { Props as WishListButtonProps } from "$store/components/header/Buttons/WishList.tsx";
import WishListButton from "$store/components/header/Buttons/WishList.tsx";
import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import NavItem from "$store/components/header/NavItem.tsx";
import type { Props as SearchProps } from "$store/components/header/Searchbar.tsx";
import IslandSearchbarInput from "$store/islands/Header/SearchbarInput.tsx";
import type { Minicart as MinicartProps } from "$store/components/minicart/common/Cart.tsx";

import {
  IslandCartDrawer,
  IslandMenuDrawer,
} from "$store/islands/Header/Drawers.tsx";
import IslandSearchbar from "$store/islands/Header/Searchbar.tsx";

import {
  IslandCartButton,
  IslandMenuButton,
  IslandSearchButton,
} from "$store/islands/Header/Buttons.tsx";

export interface Props {
  menu: MenuProps;
  wishlist: WishListButtonProps;
  myaccount: MyAccountButtonProps;
  search: SearchProps;
  minicart: MinicartProps;
  colors: ColorProps;
}

interface ColorProps {
  /**
   * @format color
   * @title First Background
   * @description Background color when at the top of the page
   * @default #090B0A
   */
  background_top: string;
  /**
   * @title Start with a Transparent Background
   */
  startWithtransparent?: boolean;
  /**
   * @format color
   * @title First Text Color
   * @description Text color when at the top of the page
   * @default #FFFFFF
   */
  text_top: string;

  /**
   * @format color
   * @title Second Background
   * @description Background color when hover or at the rest of the page
   * @default #090B0A
   */
  background_body: string;
  /**
   * @format color
   * @title Second Text Color
   * @description Text color when hover or at the rest of the page
   * @default #FFFFFF
   */
  text_body: string;
}

function generateNavbarStyles({
  background_top,
  text_top,
  background_body,
  text_body,
  startWithtransparent,
}: ColorProps) {
  return `
  .my-custom-navbar {
    background-color: ${startWithtransparent ? "transparent" : background_top};
    color: ${text_top}; 
  }

  .my-custom-navbar:has(.navbar-content:hover,.searchbar-input:focus,.searchbar-mobile),.my-custom-navbar-active, .searchbar-mobile {
    background-color: ${background_body};
    color: ${text_body};
  }
`;
}

function madeNavbarWorksWithScroll(maxScrollInactiveHeight: number) {
  return `
    if(window) {
      const navbars = document.querySelectorAll(".my-custom-navbar");
      document.addEventListener("scroll", () => {
        if (window.scrollY > ${maxScrollInactiveHeight}) {
          navbars.forEach((navbar) => {
            navbar.classList.add("my-custom-navbar-active");
          });
        } else {
          navbars.forEach((navbar) => {
            navbar.classList.remove("my-custom-navbar-active");
          });
        }
      })
    }
  `;
}

function Navbar({
  menu,
  wishlist,
  myaccount,
  search,
  minicart,
  colors,
}: Props) {
  return (
    <>
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{ __html: generateNavbarStyles(colors) }}
        />
      </Head>

      {/* Mobile Version */}
      <div class="w-full h-[73px] flex tablet:hidden items-center my-custom-navbar transition-all duration-200 ease-out group">
        <div class="container grid grid-cols-4 gap-4 navbar-content">
          <div class="col-span-1 my-auto flex justify-between">
            <IslandMenuButton />
            <IslandSearchButton />
          </div>
          <div class="col-span-2 my-auto flex justify-center">
            <Logo />
          </div>
          <div class="col-span-1 my-auto flex justify-between">
            <WishListButton {...wishlist} />
            <IslandCartButton />
          </div>
        </div>
        <IslandSearchbar {...search} />
      </div>

      {/* Desktop Version */}
      <div class="w-full h-[73px] hidden tablet:flex items-center my-custom-navbar transition-all duration-200 ease-out group">
        <div class="container grid grid-cols-12 gap-5 navbar-content h-full">
          <div class="col-span-6 desktop:col-span-8 flex items-center justify-end desktop:justify-start flex-row-reverse desktop:flex-row gap-10 desktop:gap-5 monitor:gap-10">
            <Logo />

            <IslandMenuButton className="desktop:hidden" />
            <ul class="hidden desktop:flex items-center gap-3 monitor:gap-5 h-full">
              {menu?.items?.map((item) => (
                <NavItem {...item} />
              ))}
            </ul>
          </div>

          <div class="col-span-6 desktop:col-span-4 flex gap-8 items-center">
            <IslandSearchbarInput {...search} />
            <WishListButton {...wishlist} />
            <MyAccountButton {...myaccount} />
            <IslandCartButton />
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: madeNavbarWorksWithScroll(250),
        }}
      />
      <IslandMenuDrawer menu={menu} wishlist={wishlist} myaccount={myaccount} />
      <IslandCartDrawer minicart={minicart} />
    </>
  );
}

export default Navbar;
