import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface AlertItem {
  /** @format rich-text */
  text: string;
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

export interface Props {
  items: AlertItem[];
  interval?: number;
}

function Alert({ items, interval }: Props) {
  const id = useId();

  if (!items || items.length === 0) return null;

  const visibleItems = items.filter((item) => !item.hide);

  if (visibleItems.length === 0) return null;

  return (
    <div id={id} class="flex w-full relative header-alert-top-bar">
      <Slider class="carousel carousel-center w-full col-span-full row-span-full">
        {visibleItems.map((item, index) => (
          <Slider.Item index={index} class="carousel-item w-full h-full">
            <div
              style={{ background: item.background }}
              class="text-white text-small flex justify-center items-center w-full min-h-[43px] p-0.5"
              dangerouslySetInnerHTML={{ __html: item.text }}
            />
          </Slider.Item>
        ))}
      </Slider>
      {visibleItems.length > 1 && (
        <>
          <div class="absolute left-0 top-[50%] translate-y-[-50%] w-[15%] flex items-center justify-center z-20">
            <Slider.PrevButton />
          </div>
          <div class="absolute right-0 top-[50%] translate-y-[-50%] w-[15%] flex items-center justify-center z-20">
            <Slider.NextButton />
          </div>
          <SliderJS
            rootId={id}
            interval={interval && interval * 1e3}
            infinite
          />
        </>
      )}
    </div>
  );
}

export default Alert;
