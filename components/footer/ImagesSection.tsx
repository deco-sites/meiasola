import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  images: {
    label: string;
    src: ImageWidget;
    width: number;
    height: number;
    link?: string;
  }[];
}

function ImagesSection({
  title = "",
  images,
  className,
}: Props & {
  className?: HTMLDivElement["className"];
}) {
  return (
    <div class={`${className} flex flex-col gap-3 w-full`}>
      <h4 class="font-bold text-large">{title}</h4>
      <ul class="flex flex-wrap gap-3">
        {images?.map((image) => {
          const ImageComponent = () => (
            <Image
              loading="lazy"
              fetchPriority="low"
              alt={image.label}
              src={image.src}
              width={image.width}
              height={image.height}
              class="object-contain"
            />
          );

          return (
            <li>
              {image.link ? (
                <a
                  alt={`Clique e acesse ${image.label}`}
                  target="_blank"
                  href={image.link}
                >
                  <ImageComponent />
                </a>
              ) : (
                <ImageComponent />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ImagesSection;
