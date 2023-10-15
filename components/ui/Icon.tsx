import { asset } from "$fresh/runtime.ts";
import type { JSX } from "preact";

export type AvailableIcons =
  | "ChevronDown"
  | "ChevronUp"
  | "ChevronLeft"
  | "ChevronRight"
  | "Filter"
  | "Email"
  | "Star"
  | "MeiaSola"
  | "M|S"
  | "Bag"
  | "Facebook"
  | "Heart"
  | "Instagram"
  | "Search"
  | "Tiktok"
  | "User"
  | "WhatsApp"
  | "Menu"
  | "XMark"
  | "Info"
  | "Ruler"
  | "Location"
  | "Trash";

export interface Props extends JSX.SVGAttributes<SVGSVGElement> {
  /**
   * Symbol id from element to render. Take a look at `/static/icons.svg`.
   *
   * Example: <Icon id="Bell" />
   */
  id: AvailableIcons;
  size?: number;
}

function Icon({
  id,
  strokeWidth = 1.5,
  size,
  width,
  height,
  ...otherProps
}: Props) {
  return (
    <svg
      {...otherProps}
      width={width ?? size}
      height={height ?? size}
      strokeWidth={strokeWidth}
    >
      <use href={asset(`/sprites.svg#${id}`)} />
    </svg>
  );
}

export default Icon;
