import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import Slider from "$store/components/ui/Slider.tsx";
import IslandSliderController from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";

export interface Props {
  title: string;
  instagramLink: string;

  images: {
    /**
     * @title alt
     * @description SEO: Give descriptive text to your image
     */
    label?: string;
    src: ImageWidget;
  }[];
}

export default function InstagramCarousel({
  title,
  instagramLink,
  images,
}: Props) {
  const id = useId();
  return (
    <section class="pb-6 tablet:pb-10 bg-white text-black">
      <div class="container py-[30px] flex items-center">
        <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>
      </div>
      <div id={id} class="relative container px-0">
        <Slider class="carousel gap-1 scroll-smooth">
          {images?.map((image, index) => (
            <Slider.Item
              index={index}
              class="carousel-item laptop:w-1/4 bg-grey-1"
            >
              <a href={instagramLink} alt="Acesse o instagram" class="block">
                <Image
                  alt={image.label ?? "Imagem do Instagram"}
                  src={image.src}
                  width={360}
                  height={360}
                  loading="lazy"
                  fetchPriority="low"
                  sizes="(max-width: 360px) 160px, 360px"
                  class="object-cover h-[160px] w-[160px] tablet:h-[360px] tablet:w-[360px]"
                />
              </a>
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
