import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  text: HTMLWidget;
  /**
   * @title Hide Alert
   */
  hide?: boolean;

  /**
   * @format color
   * @title Background
   * @default #090B0A
   */
  background: string;
}

function Alert({ text, hide, background }: Props) {
  if (hide) return null;
  return (
    <div
      style={{ background }}
      class="text-white text-small flex justify-center items-center w-full h-[43px]"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default Alert;
