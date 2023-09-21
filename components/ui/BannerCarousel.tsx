import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type {
  HTMLWidget,
  ImageWidget,
  VideoWidget,
} from "apps/admin/widgets.ts";
import ImageComponent from "apps/website/components/Image.tsx";

export interface Props {
  items: Array<Image | Video>;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerCarousel({ items, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="relative w-full h-fit"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full">
        {items?.map((item, index) => (
          <Slider.Item index={index} class="carousel-item w-full">
            <Item {...item} />
          </Slider.Item>
        ))}
      </Slider>

      <div class="absolute left-0 top-0 h-full w-[15%] flex items-center justify-center">
        <Slider.PrevButton />
      </div>
      <div class="absolute right-0 top-0 h-full w-[15%] flex items-center justify-center">
        <Slider.NextButton />
      </div>

      <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
    </div>
  );
}

export default BannerCarousel;

interface ItemProps {
  content?: HTMLWidget;

  button: {
    text: string;
    link: string;
  };

  /**
   * @title Texto descritivo para pessoas com deficiência visual
   */
  alt?: string;

  /**
   * @title Put a gradient on background
   */
  gradient?: boolean;
}

function Item(props: Video | Image) {
  const { content, button, gradient, alt } = props;

  return (
    <a
      class="w-full h-[310px] tablet:h-screen max-h-[696px] relative"
      aria-label={alt ?? "Banner com conteúdo, clique e confira!"}
      href={button.link}
    >
      <div class="container flex flex-col h-full relative z-10">
        <div class="flex-1" />
        <div
          class="flex-1 flex flex-col gap-3 justify-center"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
        <div class="flex-1 flex justify-center items-center">
          <span class="bg-black text-white text-small px-6 py-2.5 rounded-full tablet:bg-transparent tablet:border transition-all duration-300 ease-out tablet:border-white tablet:hover:bg-black tablet:hover:border-black">
            {button.text}
          </span>
        </div>
      </div>

      {instanceOfImage(props)
        ? (
          <ImageComponent
            alt={alt}
            src={props.image}
            width={1440}
            height={696}
            loading="lazy"
            sizes="(max-width: 767px) 767px, 1440px"
            class="w-full h-full object-cover absolute top-0 left-0 z-0"
          />
        )
        : instanceOfVideo(props)
        ? (
          <video
            autoPlay
            muted
            loop
            class="w-full h-full object-cover absolute top-0 left-0 z-0"
          >
            <source src={props.video} />
          </video>
        )
        : null}

      {gradient && (
        <div
          class="w-full h-full absolute top-0 left-0 z-0 "
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%)",
          }}
        />
      )}
    </a>
  );
}

// IMAGE
interface Image extends ItemProps {
  image: ImageWidget;
}

export function instanceOfImage(object: ItemProps): object is Image {
  return "image" in object;
}

// VIDEO
interface Video extends ItemProps {
  video: VideoWidget;
}

export function instanceOfVideo(object: ItemProps): object is Video {
  return "video" in object;
}
