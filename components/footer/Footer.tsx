import Divider from "$store/components/ui/Divider.tsx";

import Head, { Props as HeadProps } from "$store/components/footer/Head.tsx";
import Body, { Props as BodyProps } from "$store/components/footer/Body.tsx";
import ImagesSection, {
  Props as ImagesSectionProps,
} from "$store/components/footer/ImagesSection.tsx";

export interface Props {
  head: HeadProps;
  body: BodyProps;
  /** @format rich-text */
  copyright: string;
}

function Footer({ head, body, copyright }: Props) {
  return (
    <footer class="bg-black text-white text-body py-9">
      <div class="container grid grid-cols-4 gap-4 tablet:grid-cols-12 tablet:gap-5">
        <div class="hidden desktop:flex col-span-1"></div>
        <div class="col-span-4 tablet:col-span-12 desktop:col-span-10 flex flex-col gap-6">
          <Head {...head} />
          <Divider />
          <Body {...body} />
          <Copyright copyright={copyright} />
        </div>
        <div class="hidden desktop:flex col-span-1"></div>
      </div>
    </footer>
  );
}

export default Footer;

function Copyright({ copyright }: { copyright: string }) {
  return (
    <div
      class="tablet:-mt-20 text-small text-center tablet:text-left max-w-[688px] leading-snug"
      dangerouslySetInnerHTML={{ __html: copyright }}
    />
  );
}
