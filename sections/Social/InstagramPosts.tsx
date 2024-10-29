import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import IslandSliderController from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { type SectionProps } from "@deco/deco";
export interface Data {
    id: string;
    permalink: string;
    media_url: string;
    media_type: string;
}
export interface Props {
    title?: string;
    /**
     * @description Get it in Facebook app. Expires every 90 days.
     * @format textarea
     */
    facebookToken: string;
}
export async function loader({ title, facebookToken }: Props, _req: Request) {
    const fields = ["media_url", "media_type", "permalink"];
    const joinFields = fields.join(",");
    const url = `https://graph.instagram.com/me/media?access_token=${facebookToken}&fields=${joinFields}`;
    try {
        const { data } = await fetch(url).then((res) => res.json());
        return {
            title,
            data: data ? data.slice(0, 8) : [],
        };
    }
    catch (err) {
        console.log("error fetching posts from instagram", err);
        return {
            title,
            data: [],
        };
    }
}
export default function InstagramPosts({ title, data = [
    {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url: "",
    },
], }: SectionProps<typeof loader>) {
    const id = useId();
    if (data.length === 0)
        return null;
    return (<section class="pb-6 tablet:pb-10 bg-white text-black">
      <div class="container py-[30px] flex items-center">
        <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>
      </div>
      <div id={id} class="relative container px-0">
        <Slider class="carousel gap-1">
          {data.map((item, index) => {
            const isLast = index === data.length - 1;
            return (<Slider.Item index={index} class={`carousel-item laptop:w-1/4 bg-grey-1 ${isLast ? "snap-end" : "snap-start"}`}>
                <a key={item.id} href={item.permalink} target="_blank" title="Visite nosso instagram" class="block">
                  {item.media_type === "IMAGE" ||
                    item.media_type === "CAROUSEL_ALBUM" ? (<Image src={item.media_url ?? ""} width={360} height={360} loading="lazy" fetchPriority="low" sizes="(max-width: 360px) 160px, 360px" class="object-cover h-[160px] w-[160px] tablet:h-[360px] tablet:w-[360px]"/>) : (<video autoPlay muted loop playsinlinecontrols class="object-cover h-[160px] w-[160px] tablet:h-[360px] tablet:w-[360px]">
                      <source src={item.media_url}></source>
                    </video>)}
                </a>
              </Slider.Item>);
        })}
        </Slider>
        <Slider.PrevButton class="absolute left-11 top-1/2 -translate-y-2.5"/>
        <Slider.NextButton class="absolute right-11 top-1/2 -translate-y-2.5"/>
      </div>
      <IslandSliderController rootId={id} scroll="smooth"/>
    </section>);
}
