import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  images: {
    label: string;
    src: ImageWidget;
    width: number;
    height: number;
  }[];
}

function ImagesSection(
  { title = "", images, className }: Props & {
    className?: HTMLDivElement["className"];
  },
) {
  return (
    <div class={`${className} flex flex-col gap-3 w-full`}>
      <h4 class="font-bold text-large truncate">{title}</h4>
      <ul class="flex flex-wrap gap-3">
        {images?.map((image) => (
          <li>
            <Image
              loading="lazy"
              fetchPriority="low"
              alt={image.label}
              src={image.src}
              width={image.width}
              height={image.height}
              class="object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImagesSection;
