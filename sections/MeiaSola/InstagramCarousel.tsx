import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import IslandSliderController from "$store/islands/SliderJS.tsx";

export interface Props {
  /**
   * @title Title
   * @default "Instagram Meia Sola"
   */
  label: string;
  /**
   * @title Link do Instagram
   */
  link: string;

  images: {
    /**
     * @title alt
     * @description SEO: Dê um texto descritivo para sua imagem
     */
    label?: string;
    src: ImageWidget;
  }[];
}

export default function InstagramCarousel({ label, link, images }: Props) {
  const id = "instagram-images-carousel";
  return (
    <section class="pb-6 tablet:pb-10 bg-white text-black">
      <div class="container py-[30px] flex items-center">
        <a alt="Instagram da Meia Sola" href={link}>
          <h3 class="uppercase font-bold text-subtitle">{label}</h3>
        </a>
      </div>
      <div id={id} class="relative container px-0">
        <Slider class="carousel gap-1 scroll-smooth">
          {images?.map((image, index) => (
            <Slider.Item
              index={index}
              class="carousel-item laptop:w-1/4"
            >
              <Image
                alt={image.label ?? "Imagem do Instagram"}
                src={image.src}
                width={360}
                height={360}
                loading="lazy"
                sizes="(max-width: 360px) 160px, 360px"
                class="object-cover h-[160px] w-[160px] tablet:h-[360px] tablet:w-[360px]"
              />
            </Slider.Item>
          ))}
        </Slider>
        <Slider.PrevButton class="absolute left-11 top-1/2" />
        <Slider.NextButton class="absolute right-11 top-1/2" />
      </div>
      <IslandSliderController rootId={id} scroll="smooth" />
    </section>
  );
}
