import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Menu, { Props as MenuProps, } from "$store/components/institutional/Menu.tsx";
import { type Section } from "@deco/deco/blocks";
export interface Props {
    /**
     * @description put here a Section of Menu Institutional
     */
    menuSection: Section;
    content: HTMLWidget;
    image?: {
        src?: ImageWidget;
        /**
         * @title Descriptive text for people with visual impairments
         */
        alt?: string;
    };
}
function Content({ menuSection: { Component, props }, content, image }: Props) {
    return (<>
      <div class="container flex flex-col tablet:grid tablet:grid-cols-12 gap-5 py-6 laptop:py-11">
        <aside class="flex tablet:col-span-3 -mr-6 tablet:mr-0">
          <Component {...props}/>
        </aside>
        <main class="flex col-span-9 desktop:col-span-8 flex-col gap-6">
          <div dangerouslySetInnerHTML={{ __html: content }} class="flex flex-col gap-6 text-black"/>
          {image && image.src && (<Image src={image.src} alt={image.alt ?? ""} width={860} height={360} class="object-cover"/>)}
        </main>
      </div>
    </>);
}
export default Content;
