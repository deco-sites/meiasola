import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  variant: "one" | "two";
  collections: Collection[];
}

interface Collection {
  /**
   * @title Title
   */
  label: string;
  link: string;
  image: ImageWidget;
}

function Collections({ variant, collections }: Props) {
  if (variant === "one") {
    return (
      <div class="container py-3 tablet:py-11 text-black">
        <div class="flex gap-5 overflow-x-scroll snap-x snap-mandatory scrollbar-none">
          {collections?.map((collection, index) => {
            return (
              <a
                key={"collection-" + index}
                href={collection.link}
                aria-label={collection.label}
                class="relative flex justify-center items-end p-6 w-[310px] h-[480px] text-body text-white shrink-0 snap-start desktop:shrink"
              >
                <p class="z-10 text-center">{collection.label}</p>
                <Image
                  alt="Imagem da coleção"
                  width={310}
                  height={480}
                  loading="lazy"
                  src={collection.image}
                  class="object-cover h-full w-full absolute top-0 left-0 z-0"
                />
                <div
                  class="absolute h-full w-full top-0 left-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.00) 100%)",
                  }}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "two") {
    return (
      <div class="container py-3 mt-3 tablet:mt-7 text-black">
        <div class="flex desktop:justify-center gap-5 overflow-x-scroll snap-x snap-mandatory scrollbar-none">
          {collections?.map((collection, index) => {
            return (
              <a
                key={"collection-" + index}
                href={collection.link}
                aria-label={collection.label}
                class="flex flex-col items-center gap-5 w-[350px] h-[481px] text-body text-black shrink-0 snap-start desktop:shrink"
              >
                <h4 class="text-center text-large tracking-wide font-medium">
                  {collection.label}
                </h4>
                <Image
                  alt="Imagem da coleção"
                  width={350}
                  height={410}
                  loading="lazy"
                  src={collection.image}
                  class="object-cover h-full w-full flex-1"
                />
                <p class="text-center text-small">SHOP NOW</p>
              </a>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export default Collections;