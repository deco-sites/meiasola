import { VideoWidget } from "apps/admin/widgets.ts";

import Button from "$store/components/ui/Button.tsx";

export interface Props {
  video: VideoWidget;
  title: string;
  subtitle: string;
  button: {
    text: string;
    link: string;
  };
}

export default function BigVideo({ video, title, subtitle, button }: Props) {
  return (
    <div class="relative overflow-hidden">
      <div class="container h-[310px] tablet:h-[696px] flex flex-col text-white relative z-10">
        <div class="flex-1 flex items-center" />
        <div class="flex-1 flex flex-col gap-3 justify-center items-center">
          <h3 class="text-body font-normal leading-none">{subtitle}</h3>
          <h1 class="text-h1 font-bold leading-none">{title}</h1>
        </div>
        <div class="flex-1 flex justify-center items-center">
          <a
            alt={button.text}
            href={button.link}
            class="text-small px-6 py-2.5 rounded-full bg-black text-white leading-none transition-all duration-300 ease-out tablet:bg-transparent tablet:border tablet:border-white tablet:hover:bg-white tablet:hover:text-black"
          >
            {button.text}
          </a>
        </div>
      </div>
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        class="w-full h-full object-cover absolute top-0 left-0 z-0"
      >
        <source src={video} />
      </video>
      {/* GRADIENT */}
      <div
        class="w-full h-full absolute top-0 left-0 z-0 "
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%)",
        }}
      />
    </div>
  );
}
