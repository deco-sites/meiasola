import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useId } from "$store/sdk/useId.ts";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

export interface Props {
  title: string;
  brands: BrandProps[];
}

function FavoriteBrands({ title, brands }: Props) {
  const id = useId();
  return (
    <div class="py-9 flex flex-col gap-6 text-black relative container">
      <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>

      <div id={id}>
        <Slider class="carousel carousel-start flex gap-4 laptop:gap-7 overflow-y-hidden -mx-[24px] mobile:-mx-[50px] laptop:-mx-[70px]">
          {brands?.map((brand, index) => {
            const isFirst = index === 0;
            const isLast = index === brands.length - 1;

            return (
              <Slider.Item
                index={index}
                class={`carousel-item box-border ${
                  isFirst ? "pl-[24px] mobile:pl-[50px] laptop:pl-[70px]" : ""
                } ${
                  isLast ? "pr-[24px] mobile:pr-[50px] laptop:pr-[70px]" : ""
                }`}
              >
                <Brand {...brand} />
              </Slider.Item>
            );
          })}
        </Slider>

        <Slider.PrevButton class="absolute left-[25px] top-1/2 z-10" />
        <Slider.NextButton class="absolute right-[25px] top-1/2 z-10" />

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}

export default FavoriteBrands;

interface BrandProps {
  /**
   * @title Brand Name
   */
  label: string;

  link: string;

  /**
   * @description Brand Logo
   */
  logo: {
    src: ImageWidget;
    width: number;
    height: number;
  };

  /**
   * @description Image for square background
   */
  background: ImageWidget;
}

function Brand({ label, link, logo, background }: BrandProps) {
  return (
    <a
      href={link}
      aria-label={`Clique e acesse produtos da marca: ${label}`}
      class="rounded-xl overflow-hidden relative flex items-center justify-center w-[137px] h-[137px] bg-grey-1"
    >
      <Image
        alt={`Logo da marca: ${label}`}
        src={logo.src}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        fetchPriority="auto"
        class="flex z-10"
      />
      <Image
        alt={`Image de background da marca: ${label}`}
        src={background}
        width={130}
        height={130}
        loading="lazy"
        fetchPriority="auto"
        class="object-cover w-full h-full absolute top-0 left-0 z-0"
      />
    </a>
  );
}
