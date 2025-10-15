import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";

interface ItemProps {
  /** @format rich-text */
  content?: string;

  button?: {
    text?: string;
    link?: string;
  };

  /**
   * @title Descriptive text for people with visual impairments
   */
  alt?: string;

  /**
   * @title Put a gradient on background
   */
  gradient?: boolean;
}

interface Image {
  /**
   * @format image-uri
   * @title Image Desktop
   */
  imageDesktop?: string;
  /**
   * @format image-uri
   * @title Image Mobile
   */
  imageMobile?: string;
}

interface Video {
  /**
   * @format video-uri
   * @title Video Desktop
   */
  videoDesktop?: string;
  /**
   * @format video-uri
   * @title Video Mobile
   */
  videoMobile?: string;
}

interface BannerItem extends ItemProps {
  /**
   * @title Tipo de item
   * @description Escolha se é um item de imagem ou vídeo
   * @default image
   */
  type: "image" | "video";
  /**
   * @description Use este campo se o item for um vídeo
   */
  video: Video;
  /**
   * @description Use este campo se o item for uma imagem
   */
  image: Image;
}

export interface Props {
  items: BannerItem[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Item(props: BannerItem) {
  const instance = props.type === "image" ? props.image : props.video;

  if (!instance) return null;

  const { content, button, gradient, alt } = props;

  return (
    <a
      class="w-full h-full max-h-screen relative"
      aria-label={
        `Item do carrossel: ${alt}` ?? "Banner com conteúdo, clique e confira!"
      }
      href={button?.link ?? "#"}
    >
      <div class="container absolute left-1/2 -translate-x-1/2 flex flex-col h-full z-10">
        <div class="flex-1" />
        <div
          class="flex-1 flex flex-col gap-3 justify-center"
          dangerouslySetInnerHTML={{ __html: content ?? "" }}
        />
        <div class="flex-1 flex justify-center items-center">
          <span class="bg-black text-white text-small px-6 py-2.5 rounded-full tablet:bg-transparent tablet:border transition-all duration-300 ease-out tablet:border-white tablet:hover:bg-white tablet:hover:text-black">
            {button?.text}
          </span>
        </div>
      </div>

      {props.type === "image" ? (
        <div class="w-full h-full max-h-screen">
          <Image
            alt={"Banner carousel"}
            src={props.image.imageDesktop ?? ""}
            width={951}
            height={436}
            class="hidden tablet:block w-full h-full max-h-screen object-cover top-0 left-0 z-0"
            loading="eager"
            fetchPriority="high"
          />
          <Image
            alt={"Banner carousel"}
            src={props.image.imageMobile ?? ""}
            width={390}
            height={660}
            class="w-full h-full max-h-screen object-cover top-0 left-0 z-0 tablet:hidden"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      ) : props.type === "video" ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsinline
            width={1200}
            class="w-full h-full object-cover max-h-screen top-0 left-0 z-0 block tablet:hidden"
          >
            <source src={props.video.videoMobile} />
          </video>
          <video
            autoPlay
            muted
            loop
            playsinline
            width={1200}
            class="w-full h-full object-cover max-h-screen top-0 left-0 z-0 hidden tablet:block"
          >
            <source src={props.video.videoDesktop} />
          </video>
        </>
      ) : null}

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

function BannerCarousel({ items, interval }: Props) {
  const id = useId();

  return (
    <>
      <div id={id} class="relative w-full h-fit">
        <Slider class="carousel carousel-center w-full col-span-full row-span-full">
          {items?.map((item, index) => (
            <Slider.Item index={index} class="carousel-item w-full h-full">
              <Item {...item} />
            </Slider.Item>
          ))}
        </Slider>

        <div class="absolute left-0 top-0 h-full w-[15%] flex items-center justify-center z-20">
          <Slider.PrevButton />
        </div>
        <div class="absolute right-0 top-0 h-full w-[15%] flex items-center justify-center z-20">
          <Slider.NextButton />
        </div>

        {items.length > 1 && (
          <div class="flex gap-3 tablet:gap-7 absolute bottom-3 tablet:bottom-12 left-1/2 -translate-x-1/2 z-10">
            {items.map((image, index) => (
              <Slider.Dot index={index}>
                <span class="flex h-3 w-3 items-center justify-center">
                  <span class="block h-[6px] w-[6px] rounded-full bg-grey-2 group-disabled:bg-white" />
                </span>
              </Slider.Dot>
            ))}
          </div>
        )}

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (function() {
            var topbar = document.querySelector(".header-alert-top-bar");

            if (!topbar) return;

            const topbarHeight = topbar.offsetHeight;
            const banner = document.getElementById("${id}")?.firstElementChild;

            if (!banner) return;

            banner.style.marginTop = (topbarHeight - 1) + "px";
          })();
        `,
        }}
      />
    </>
  );
}

export default BannerCarousel;
