import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Slider from "site/components/ui/Slider.tsx";
import SliderJS from "site/islands/SliderJS.tsx";
import { useId } from "site/sdk/useId.ts";

interface BenefitData {
  id: string;
  image?: {
    src?: ImageWidget;
    width?: number;
    height?: number;
    desktopHeight?: number;
    desktopWidth?: number;
    alt?: string;
  };
  title?: string;
  /**
   * @description mobile text content
   */
  text?: string;
  /**
   * @description desktop text content
   */
  desktopText?: string;
}

interface Props {
  benefits: BenefitData[];
}

function CustomBenefitsBar({ benefits }: Props) {
  const id = useId();

  return (
    <>
      <div
        id={id}
        className="flex px-6 mt-[18px] desktop:hidden"
      >
        <Slider class="carousel gap-4 mx-auto">
          {benefits.map((benefit, index) => (
            <Slider.Item class="carousel-item" index={index}>
              <div
                key={benefit.id}
                className="border-solid border-[1px] border-[#F2F2F2] px-[25px] py-[10px] flex flex-col items-center max-w-[163px] text-center desktop:hidden"
              >
                {benefit.image && (
                  <Image
                    src={benefit.image.src}
                    alt={benefit.image.alt}
                    height={benefit.image.height || 20}
                    width={benefit.image.width || 20}
                    loading="lazy"
                    className=""
                  />
                )}
                {benefit.title && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: benefit.title,
                    }}
                    className="text-small font-bold leading-[14.63px] text-[#3E3E3E]"
                  ></span>
                )}
                {benefit.text && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: benefit.text,
                    }}
                    className="text-small font-normal leading-[14.63px] text-[#3E3E3E]"
                  ></span>
                )}
              </div>
            </Slider.Item>
          ))}
        </Slider>

        <SliderJS rootId={id} />
      </div>
      {/* Desktop views */}
      <div className="hidden desktop:flex justify-center flex-wrap mt-[52px] desktop:max-w-[1300px] mx-auto">
        {benefits.map((benefit) => (
          <>
            <div
              key={benefit.id}
              className="hidden border-solid border-r-[1px] border-[#F2F2F2] last:border-none desktop:flex items-start px-[76px] first:pl-0 last:pr-0"
            >
              {benefit.image && (
                <Image
                  src={benefit.image.src}
                  alt={benefit.image.alt}
                  height={benefit.image.desktopHeight || 36}
                  width={benefit.image.desktopWidth || 36}
                  loading="lazy"
                  className="mr-[19px]"
                />
              )}
              <div class="flex flex-col">
                {benefit.title && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: benefit.title,
                    }}
                    className="text-body font-bold leading-[14.63px] text-[#3E3E3E]"
                  ></span>
                )}
                {benefit.desktopText && (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: benefit.desktopText,
                    }}
                    className="text-body font-normal leading-[14.63px] text-[#3E3E3E] mt-1"
                  ></span>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default CustomBenefitsBar;
