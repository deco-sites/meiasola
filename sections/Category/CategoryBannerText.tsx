import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "site/components/ui/Image.tsx";
import { type SectionProps } from "@deco/deco";

export interface Media {
  source?: ImageWidget;
  alt?: string;
  width?: number;
  height?: number;
}

export interface BannerTextSection {
  /** @description RegExp para exibir essa seção na URL atual. Exemplo: use /bolsas para exibir na categoria bolsas */
  label: string;
  /** @description Título da seção */
  title?: string;
  /**
   * @description Texto da seção
   * @format rich-text
   */
  text?: string;
  image?: Media;
}

function CategoryBannerText({
  matcherSection,
}: SectionProps<ReturnType<typeof loader>>) {
  if (!matcherSection) {
    return null;
  }

  const { title, text = "", image } = matcherSection;

  return (
    <div class="container flex flex-col laptop:flex-row justify-between w-full gap-4 text-black p-0 laptop:px-6 laptop:py-8">
      {image?.source && (
        <Image
          src={image.source}
          alt={image.alt}
          width={image.width ?? 375}
          height={image.height ?? 375}
          class={`max-laptop:w-full h-max`}
        />
      )}

      <div class="hidden laptop:flex flex-col justify-center">
        {title && (
          <h3 class="text-[20px] laptop:text-h3 font-bold tracking-large uppercase mb-6">
            {title}
          </h3>
        )}

        <div dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    </div>
  );
}

export interface Props {
  matcherSections?: BannerTextSection[];
}

export const loader = ({ matcherSections = [] }: Props, req: Request) => {
  const matcherSection = matcherSections.find(({ label }) =>
    new URLPattern(label, new URL(req.url).origin).test(req.url)
  );

  return { matcherSection };
};

export default CategoryBannerText;
