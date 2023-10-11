import Image from "apps/website/components/Image.tsx";
import { ImageWidget, HTMLWidget } from "apps/admin/widgets.ts";

import Icon from "$store/components/ui/Icon.tsx";
import type { AvailableIcons } from "$store/components/ui/Icon.tsx";

import IslandContactUsForm from "deco-sites/meiasola/islands/ContactUsForm.tsx";

export interface Props {
  title: string;

  /**
   * @title First Subtitle
   * @description The one above the links
   */
  subtitle1: HTMLWidget;

  links: Link[];

  /**
   * @title Second Subtitle
   * @description The one below the links
   */
  subtitle2?: HTMLWidget;

  image: {
    src: ImageWidget;
    alt: string;
  };
}

interface Link {
  icon?: AvailableIcons;
  label: string;
  /**
   * @title Link
   */
  href?: string;
}

export default function ContactUs({ image, ...rest }: Props) {
  return (
    <div class="grid grid-cols-4 gap-4 tablet:grid-cols-12 tablet:gap-5 text-black container">
      {/* FORMS */}
      <div class="col-span-4 flex flex-col gap-6 pt-6 tablet:py-12">
        <TextsAndLinks {...rest} />
        <IslandContactUsForm />
      </div>

      <span class="col-span-1 hidden tablet:grid" />

      {/* IMAGE */}
      <aside class="col-span-4 tablet:col-span-7 flex -mx-[25px] mobile:-mx-[50px] tablet:ml-auto tablet:-mr-[70px] bg-grey-1">
        <Image
          src={image.src}
          width={357}
          height={400}
          alt={image.alt}
          loading="eager"
          fetchPriority="auto"
          class="w-full h-full object-cover"
        />
      </aside>
    </div>
  );
}

function TextsAndLinks(props: {
  title: string;
  subtitle1: HTMLWidget;
  links: Link[];
  subtitle2?: HTMLWidget;
}) {
  const gapClasses = "flex flex-col gap-4";

  return (
    <div class={gapClasses}>
      <h1 class="text-h3">{props.title}</h1>

      <div
        class={gapClasses}
        dangerouslySetInnerHTML={{ __html: props.subtitle1 }}
      />

      {props.links?.map((link) => {
        const style =
          "bg-black text-white flex gap-2 items-center justify-center w-full max-w-[310px] shrink h-[45px] tablet:h-[32px] truncate text-small mobile:text-body";
        if (link.href)
          return (
            <a href={link.href} class={style}>
              {link.icon && <Icon id={link.icon} class="h-3.5 w-3.5" />}
              {link.label}
            </a>
          );

        return (
          <p class={style}>
            {link.icon && <Icon id={link.icon} class="h-3.5 w-3.5" />}
            {link.label}
          </p>
        );
      })}

      {props.subtitle2 && (
        <div
          class={gapClasses}
          dangerouslySetInnerHTML={{ __html: props.subtitle2 }}
        />
      )}
    </div>
  );
}

export function Input({
  label,
  name,
  placeholder = "",
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
}) {
  const styles =
    "w-full border border-grey-2 text-small text-black placeholder:text-grey-2 placeholder:text-small p-2.5";

  return (
    <div class="flex flex-col gap-3">
      <label class="font-bold text-body">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          class={`${styles} h-[130px] resize-none`}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          class={` ${styles} h-[35px]`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
