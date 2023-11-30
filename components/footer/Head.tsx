import Image from "apps/website/components/Image.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Logo from "$store/components/ui/Logo.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  social: {
    label: string;
    items: {
      label: "Facebook" | "Instagram" | "Tiktok";
      link: string;
    }[];
  };
  app: {
    label: string;
    images: {
      label: string;
      src: ImageWidget;
      width: number;
      height: number;
      hideOnMobile?: boolean;
      link?: string;
    }[];
  };
}

function Head({ social, app }: Props) {
  const LogoWrapper = () => (
    <div class="flex-1 flex tablet:justify-center items-center">
      <Logo />
    </div>
  );

  return (
    <div class="flex flex-col gap-10 tablet:flex-row tablet:gap-0">
      <div class="flex-1 flex tablet:hidden">
        <LogoWrapper />
      </div>

      <div class="flex-1 flex items-center justify-between tablet:justify-start gap-4">
        <h5>{social?.label}</h5>
        <div class="flex gap-4">
          {social?.items?.map((item) => (
            <a aria-label={item.label} href={item.link} target="_blank">
              <Icon id={item.label} class="h-6 w-6 desktop:h-8 desktop:w-8" />
            </a>
          ))}
        </div>
      </div>

      <div class="flex-1 hidden tablet:flex">
        <LogoWrapper />
      </div>

      <div class="flex-1 flex items-center justify-between tablet:justify-end gap-5">
        <h5 class="shrink-0">{app?.label}</h5>
        <div class="flex gap-4 items-center">
          {app?.images?.map((image) => (
            <a
              alt={image.label}
              href={image.link}
              class={image.hideOnMobile ? "hidden laptop:block" : ""}
            >
              <Image
                alt={image.label}
                src={image.src}
                width={image.width}
                height={image.height}
                class="object-contain"
                loading="lazy"
                fetchPriority="low"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Head;
