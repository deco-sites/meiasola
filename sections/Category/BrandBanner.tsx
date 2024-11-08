import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { type SectionProps } from "@deco/deco";

export interface Media {
  /** @description Image for big screens */
  desktop: ImageWidget;
  /** @description Image for small screens */
  mobile: ImageWidget;
  /** @description image alt text */
  alt?: string;
}

export interface BrandBannerSection {
  /** @description RegExp para exibir essa seção na URL atual. Exemplo: use /arezzo?map=brand para exibir na marca arezzo */
  label: string;
  image?: Media;
}

function BrandBanner({
  matcherSection,
}: SectionProps<ReturnType<typeof loader>>) {
  if (!matcherSection) {
    return null;
  }

  const { image } = matcherSection;

  return (
    <div class="w-full">
      {image && (
        <Picture preload class="col-start-1 col-span-1 row-start-1 row-span-1">
          <Source
            src={image.mobile}
            width={360}
            height={120}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={200}
            media="(min-width: 767px)"
          />
          <img class="w-full" src={image.desktop} alt={image.alt} />
        </Picture>
      )}
    </div>
  );
}

export interface Props {
  matcherSections?: BrandBannerSection[];
}

export const loader = ({ matcherSections = [] }: Props, req: Request) => {
  const matcherSection = matcherSections.find(({ label }) =>
    new URLPattern(label, new URL(req.url).origin).test(req.url)
  );

  return { matcherSection };
};

export default BrandBanner;
