import Image from "apps/website/components/Image.tsx";

import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Divider from "$store/components/ui/Divider.tsx";

import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @default ""
   */
  label: HTMLWidget;

  /**
   * @title Link
   * @default /
   */
  href?: string;

  icon?: {
    src: AvailableIcons;
    width: number;
    height: number;
  };

  /**
   * @title put a left divider
   */
  divider?: boolean;

  submenu?: SubMenuProps;
}

function NavItem({ label, href, icon, divider, submenu }: Props) {
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
        class="uppercase font-bold text-small"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    );

  return (
    <>
      {divider && (
        <li>
          <Divider className="!bg-current !h-[15px]" vertical />
        </li>
      )}
      <li class="cursor-default group/menu h-full flex items-center">
        <a href={href}>
          {content}
        </a>

        {submenu && <SubMenu {...submenu} />}
      </li>
    </>
  );
}

export interface SubMenuProps {
  sections: Section[];
  image?: ImageWidget;
}

function SubMenu({ sections, image }: SubMenuProps) {
  return (
    <div class="hidden group-hover/menu:block bg-white text-black border-t border-grey-1 absolute top-full left-0 w-screen h-[245px] max-h-[245px] overflow-hidden">
      <div class="container py-6 h-full flex gap-2">
        {sections?.map((section, index) => {
          return (
            <>
              {index !== 0 && <Divider className="mr-18" vertical />}
              <Section {...section} />
            </>
          );
        })}

        {image && (
          <Image
            loading="lazy"
            src={image}
            width={400}
            height={400}
            class="h-full object-cover flex-1"
          />
        )}
      </div>
    </div>
  );
}

interface Section {
  /**
   * @title Section Title
   */
  label: string;
  /**
   * @title Hide Section Title On Mobile Menu
   */
  hideSectionOnMobile?: boolean;

  /**
   * @title Section Items
   */
  items: {
    label: string;
    /** @title Link */
    href: string;
    image?: {
      /** @title Imagem */
      src: ImageWidget;
      width: number;
      height: number;
    };
    underlined?: boolean;
  }[];

  /**
   * @title Show Section Items as Square
   */
  showItemsAsSquare?: boolean;
}

function Section({ label, items }: Section) {
  return (
    <div>
      {!items?.[0].image && <p class="font-bold text-subtitle">{label}</p>}
      <ul class="text-body flex flex-col flex-wrap max-h-full">
        {items?.map((item) => {
          const content = item.image
            ? (
              <Image
                loading="lazy"
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                class="opacity-50 hover:opacity-100"
              />
            )
            : item.label;
          return (
            <li class={item.image ? "mt-7 mr-12" : "mt-8 mr-18"}>
              <a
                href={item.href}
                class={`${item.underlined && "underline text-small"}`}
              >
                {content}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NavItem;
