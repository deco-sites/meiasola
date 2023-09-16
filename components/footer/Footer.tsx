// import BackToTop from "$store/components/footer/BackToTop.tsx";
// import ColorClasses from "$store/components/footer/ColorClasses.tsx";
// import Divider from "$store/components/footer/Divider.tsx";
// import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
// import FooterItems from "$store/components/footer/FooterItems.tsx";
// import Logo from "$store/components/footer/Logo.tsx";
// import MobileApps from "$store/components/footer/MobileApps.tsx";
// import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
// import RegionSelector from "$store/components/footer/RegionSelector.tsx";
// import Social from "$store/components/footer/Social.tsx";
// import Newsletter from "$store/islands/Newsletter.tsx";
// import type { ImageWidget } from "apps/admin/widgets.ts";
// import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

import Icon from "deco-sites/meiasola/components/ui/Icon.tsx";

import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

// export type Item = {
//   label: string;
//   href: string;
// };

// export type Section = {
//   label: string;
//   items: Item[];
// };

// export interface SocialItem {
//   label:
//     | "Discord"
//     | "Facebook"
//     | "Instagram"
//     | "Linkedin"
//     | "Tiktok"
//     | "Twitter";
//   link: string;
// }

// export interface PaymentItem {
//   label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
// }

// export interface MobileApps {
//   /** @description Link to the app */
//   apple?: string;
//   /** @description Link to the app */
//   android?: string;
// }

// export interface RegionOptions {
//   currency?: Item[];
//   language?: Item[];
// }

// export interface NewsletterForm {
//   placeholder?: string;
//   buttonText?: string;
//   /** @format html */
//   helpText?: string;
// }

// export interface Layout {
//   backgroundColor?:
//     | "Primary"
//     | "Secondary"
//     | "Accent"
//     | "Base 100"
//     | "Base 100 inverted";
//   variation?:
//     | "Variation 1"
//     | "Variation 2"
//     | "Variation 3"
//     | "Variation 4"
//     | "Variation 5";
//   hide?: {
//     logo?: boolean;
//     newsletter?: boolean;
//     sectionLinks?: boolean;
//     socialLinks?: boolean;
//     paymentMethods?: boolean;
//     mobileApps?: boolean;
//     regionOptions?: boolean;
//     extraLinks?: boolean;
//     backToTheTop?: boolean;
//   };
// }

// export interface Props {
//   logo?: {
//     image: ImageWidget;
//     description?: string;
//   };
//   sections?: Section[];
//   social?: {
//     title?: string;
//     items: SocialItem[];
//   };
//   payments?: {
//     title?: string;
//     items: PaymentItem[];
//   };
//   mobileApps?: MobileApps;
//   regionOptions?: RegionOptions;
//   extraLinks?: Item[];
//   backToTheTop?: {
//     text?: string;
//   };
//   layout?: Layout;
// }

// function Footer({
//   logo,
//   sections = [{
//     "label": "Sobre",
//     "items": [
//       {
//         "href": "/quem-somos",
//         "label": "Quem somos",
//       },
//       {
//         "href": "/termos-de-uso",
//         "label": "Termos de uso",
//       },
//       {
//         "href": "/trabalhe-conosco",
//         "label": "Trabalhe conosco",
//       },
//     ],
//   }, {
//     "label": "Atendimento",
//     "items": [
//       {
//         "href": "/centraldeatendimento",
//         "label": "Central de atendimento",
//       },
//       {
//         "href": "/whatsapp",
//         "label": "Fale conosco pelo WhatsApp",
//       },
//       {
//         "href": "/trocaedevolucao",
//         "label": "Troca e devolução",
//       },
//     ],
//   }],
//   social = {
//     title: "Redes sociais",
//     items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
//   },
//   payments = {
//     title: "Formas de pagamento",
//     items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
//   },
//   mobileApps = { apple: "/", android: "/" },
//   regionOptions = { currency: [], language: [] },
//   extraLinks = [],
//   backToTheTop,
//   layout = {
//     backgroundColor: "Primary",
//     variation: "Variation 1",
//     hide: {
//       logo: false,
//       newsletter: false,
//       sectionLinks: false,
//       socialLinks: false,
//       paymentMethods: false,
//       mobileApps: false,
//       regionOptions: false,
//       extraLinks: false,
//       backToTheTop: false,
//     },
//   },
// }: Props) {
//   const _logo = layout?.hide?.logo ? <></> : <Logo logo={logo} />;
//   const _sectionLinks = layout?.hide?.sectionLinks ? <></> : (
//     <FooterItems
//       sections={sections}
//       justify={layout?.variation == "Variation 2" ||
//         layout?.variation == "Variation 3"}
//     />
//   );
//   const _social = layout?.hide?.socialLinks
//     ? <></>
//     : <Social content={social} vertical={layout?.variation == "Variation 3"} />;
//   const _payments = layout?.hide?.paymentMethods
//     ? <></>
//     : <PaymentMethods content={payments} />;
//   const _apps = layout?.hide?.mobileApps
//     ? <></>
//     : <MobileApps content={mobileApps} />;
//   const _region = layout?.hide?.regionOptions
//     ? <></>
//     : <RegionSelector content={regionOptions} />;
//   const _links = layout?.hide?.extraLinks
//     ? <></>
//     : <ExtraLinks content={extraLinks} />;

//   return (
//     <footer
//       class={`w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10 ${
//         ColorClasses(layout)
//       }`}
//     >
//       <div class="lg:container mx-6 lg:mx-auto">
//         {(!layout?.variation || layout?.variation == "Variation 1") && (
//           <div class="flex flex-col gap-10">
//             <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
//               {_logo}
//               {_sectionLinks}
//             </div>
//             <Divider />
//             <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
//               {_payments}
//               {_social}
//               <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
//                 {_apps}
//                 {_region}
//               </div>
//             </div>
//             <Divider />
//             <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
//               <PoweredByDeco />
//               {_links}
//             </div>
//           </div>
//         )}
//         {layout?.variation == "Variation 2" && (
//           <div class="flex flex-col gap-10">
//             <div class="flex flex-col md:flex-row gap-10">
//               <div class="flex flex-col gap-10 lg:w-1/2">
//                 {_logo}
//                 {_social}
//                 {_payments}
//                 {_apps}
//                 {_region}
//               </div>
//               <div class="flex flex-col gap-10 lg:gap-20 lg:w-1/2 lg:pr-10">
//                 {_sectionLinks}
//               </div>
//             </div>
//             <Divider />
//             <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
//               <PoweredByDeco />
//               {_links}
//             </div>
//           </div>
//         )}
//         {layout?.variation == "Variation 3" && (
//           <div class="flex flex-col gap-10">
//             {_logo}
//             <div class="flex flex-col lg:flex-row gap-14">
//               <div class="flex flex-col md:flex-row lg:flex-col md:justify-between lg:justify-normal gap-10 lg:w-2/5">
//                 <div class="flex flex-col gap-10">
//                   {_payments}
//                   {_apps}
//                 </div>
//               </div>
//               <div class="flex flex-col gap-10 lg:gap-20 lg:w-3/5 lg:items-end">
//                 <div class="flex flex-col md:flex-row gap-10">
//                   {_sectionLinks}
//                   {_social}
//                 </div>
//                 {_region}
//               </div>
//             </div>
//             <Divider />
//             <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
//               <PoweredByDeco />
//               {_links}
//             </div>
//           </div>
//         )}
//         {layout?.variation == "Variation 4" && (
//           <div class="flex flex-col gap-10">
//             {layout?.hide?.newsletter ? <></> : <Divider />}
//             <div class="flex flex-col lg:flex-row gap-10 lg:gap-20 lg:justify-between">
//               {_sectionLinks}
//               <div class="flex flex-col md:flex-row lg:flex-col gap-10 lg:gap-10 lg:w-2/5 lg:pl-10">
//                 <div class="flex flex-col md:flex-row gap-10 lg:gap-20">
//                   <div class="lg:flex-auto">
//                     {_payments}
//                   </div>
//                   <div class="lg:flex-auto">
//                     {_social}
//                   </div>
//                 </div>
//                 <div class="flex flex-col gap-10 lg:gap-10">
//                   {_region}
//                   {_apps}
//                 </div>
//               </div>
//             </div>
//             <Divider />
//             <div class="flex flex-col md:flex-row md:justify-between gap-10 md:items-center">
//               {_logo}
//               <PoweredByDeco />
//             </div>
//           </div>
//         )}
//         {layout?.variation == "Variation 5" && (
//           <div class="flex flex-col gap-10">
//             {layout?.hide?.newsletter ? <></> : <Divider />}
//             {_logo}
//             <div class="flex flex-col md:flex-row gap-10 lg:gap-20 md:justify-between">
//               {_sectionLinks}
//               <div class="flex flex-col gap-10 md:w-2/5 lg:pl-10">
//                 {_payments}
//                 {_social}
//                 {_apps}
//               </div>
//             </div>
//             <Divider />
//             <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10 md:items-center">
//               <PoweredByDeco />
//               <div class="flex flex-col md:flex-row gap-10 md:items-center">
//                 {_links}
//                 {_region}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       {layout?.hide?.backToTheTop
//         ? <></>
//         : <BackToTop content={backToTheTop?.text} />}
//     </footer>
//   );
// }

// export default Footer;

export interface Props {
  head: FooterHeadProps;
}

function Footer({ head }: Props) {
  return (
    <footer class="bg-black text-white text-body py-9">
      <div class="container grid grid-cols-4 gap-4 tablet:grid-cols-12 tablet:gap-5">
        <div class="hidden tablet:flex col-span-1"></div>
        <div class="col-span-4 tablet:col-span-10 flex flex-col gap-6">
          <FooterHead {...head} />
          <span class="bg-gray-1 w-full h-px" />
        </div>
        <div class="hidden tablet:flex col-span-1"></div>
      </div>
    </footer>
  );
}

export default Footer;

interface FooterHeadProps {
  social: {
    label: string;
    items: {
      label:
        | "Facebook"
        | "Instagram"
        | "Tiktok";
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

function FooterHead({ social, app }: FooterHeadProps) {
  const Logo = () => (
    <div class="flex-1 flex laptop:justify-center items-center">
      <a href="/">
        <Icon id="MeiaSola" class="w-[110px] h-[18px]" />
      </a>
    </div>
  );

  return (
    <div class="flex flex-col gap-10 laptop:flex-row laptop:gap-0">
      <div class="flex-1 flex laptop:hidden">
        <Logo />
      </div>

      <div class="flex-1 flex items-center justify-between laptop:justify-start gap-4">
        <h4>{social.label}</h4>
        <div class="flex gap-4">
          {social.items.map((item) => (
            <a aria-label={item.label} href={item.link}>
              <Icon id={item.label} class="h-6 w-6 desktop:h-8 desktop:w-8" />
            </a>
          ))}
        </div>
      </div>

      <div class="flex-1 hidden laptop:flex">
        <Logo />
      </div>

      <div class="flex-1 flex items-center justify-between laptop:justify-end gap-5">
        <h4>{app.label}</h4>
        <div class="flex gap-4">
          {app.images.map((image) => (
            <a href={image.link}>
              <Image
                alt={image.label}
                src={image.src}
                width={image.width}
                height={image.height}
                class={`object-contain ${image.hideOnMobile && "hidden"}`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
