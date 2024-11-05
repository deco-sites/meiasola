import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "site/components/ui/Image.tsx";
import ReadMoreText from "site/islands/ReadMoreText.tsx";
import { type SectionProps } from "@deco/deco";
export interface Media {
    source?: ImageWidget;
    alt?: string;
    width?: number;
    height?: number;
}
export interface TextReadMoreSection {
    /** @description RegExp para exibir essa seção na URL atual. Exemplo: use /bolsas para exibir na categoria bolsas */
    label: string;
    /** @description Título da seção */
    title?: string;
    /**
     * @description Texto da seção
     * @format rich-text
     */
    text?: string;
    /** @description Quantidade máxima de caracteres do texto até exibir "Leia Mais". */
    maxCharacters?: number;
    image?: Media;
}
function CategoryTextReadMore({ matcherSection, }: SectionProps<ReturnType<typeof loader>>) {
    if (!matcherSection) {
        return null;
    }
    const { title, text = "", maxCharacters = 0, image } = matcherSection;
    return (<div class="container flex flex-col laptop:flex-row justify-between w-full gap-4 laptop:gap-[130px] text-black laptop:mt-[58px] mb-10 laptop:mb-[100px]">
      <div class="flex flex-col">
        {title && (<h3 class="text-[20px] laptop:text-h3 font-bold tracking-large uppercase mb-6">
            {title}
          </h3>)}

        <ReadMoreText text={text} maxCharacters={maxCharacters}/>
      </div>

      {image && image.source && (<Image src={image.source} alt={image.alt} width={image.width ?? 100} height={image.height ?? 100} class="h-max"/>)}
    </div>);
}
export interface Props {
    matcherSections?: TextReadMoreSection[];
}
export const loader = ({ matcherSections = [] }: Props, req: Request) => {
    const matcherSection = matcherSections.find(({ label }) => new URLPattern({ pathname: label }).test(req.url));
    return { matcherSection };
};
export default CategoryTextReadMore;
