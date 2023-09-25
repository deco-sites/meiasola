import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  image: {
    /**
     * @description Descriptive text for people with visual impairments
     */
    alt: string;
    src: ImageWidget;
  };

  content: HTMLWidget;
  button: {
    text: string;
    link: string;
  };
}

function NewCollection({ image, content, button }: Props) {
  return (
    <div class="container flex flex-col gap-6 text-black py-3 tablet:py-11 tablet:grid tablet:grid-cols-12 tablet:gap-4 desktop:gap-5">
      <div class="flex h-full tablet:col-span-6">
        <Image
          alt={image.alt}
          src={image.src}
          width={640}
          height={584}
          loading="lazy"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="hidden tablet:flex col-span-1" />
      <div class="flex justify-center items-center flex-col gap-6 h-full col-span-4">
        <div
          class="flex flex-col gap-6"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <a
          aria-label={button.link}
          class="block p-2.5 border hover:bg-black hover:text-white text-small transition-all duration-300 ease-out"
        >
          {button.text}
        </a>
      </div>
      <div class="hidden tablet:flex col-span-1" />
    </div>
  );
}

export default NewCollection;
