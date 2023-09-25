import { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  text: HTMLWidget;
  sizes: {
    /**
     * @title size
     */
    label: string;

    link: string;
  }[];
}

function ChooseYourSize({ text, sizes }: Props) {
  return (
    <div class="bg-black text-white text-large py-6 laptop:py-5">
      <div class="container flex flex-col items-center gap-8 laptop:flex-row laptop:justify-between">
        <div
          class="text-large tracking-wide text-center laptop:text-left"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <ul class="flex flex-wrap justify-center gap-8 laptop:gap-6 desktop:gap-8">
          {sizes.map((size, index) => {
            return (
              <li key={"size-" + index}>
                <a
                  href={size.link}
                  aria-label={`Numeração ${size.label}`}
                  class="border border-white p-2.5 block"
                >
                  {size.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChooseYourSize;
