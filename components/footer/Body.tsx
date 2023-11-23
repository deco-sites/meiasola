import { Head } from "$fresh/runtime.ts";

import Divider from "$store/components/ui/Divider.tsx";
import ImagesSection, {
  Props as ImagesSectionProps,
} from "$store/components/footer/ImagesSection.tsx";

export interface Props {
  categories: LinkMapProps[];
  sections: LinkMapProps[];
  extra: ImagesSectionProps[];
  routesToShowCategoryList: Route[];
}

interface Route {
  /**
   * @title Path
   */
  label: string;
}

function generatePathVerify(routes: Route[]) {
  return `
    window.addEventListener('load', () => {
      const $div = document.querySelector('#footer-body-categories-list')
      const $divider = document.querySelector('.footer-body-categories-list-divider')
      
      switch (location.pathname) {
        ${routes.map((route) => `case "${route.label}": break;`)}
        default: {
          $div?.classList.add('hidden')
          $divider?.classList.add('hidden')
        }
      }
    })
  `.replaceAll(";,", ";");
}

function Body({
  categories,
  sections,
  extra,
  routesToShowCategoryList = [],
}: Props) {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: generatePathVerify(routesToShowCategoryList),
          }}
        />
      </Head>

      {/* CATEGORIES */}
      {categories?.length > 0 && (
        <>
          <div class="group" id="footer-body-categories-list">
            <LinkMapAccordion
              label="Categorias"
              id="categories-accordion"
              hideTitle
            />
            <div class="hidden group-[&:has(input:checked)]:flex flex-col gap-3 pt-3 tablet:!grid tablet:grid-cols-10 tablet:gap-5 tablet:pt-0">
              {categories?.map((category) => (
                <div class="flex flex-col tablet:col-span-2">
                  <h4 class="tablet:hidden pb-3">{category.label}</h4>
                  <LinkList {...category} className="pl-3 tablet:pl-0" />
                </div>
              ))}
            </div>
          </div>
          <Divider className="footer-body-categories-list-divider" />
        </>
      )}

      {/* SECTIONS */}
      <div class="flex flex-col gap-6 tablet:grid tablet:grid-cols-10 tablet:gap-5">
        {sections?.map((section, index) => (
          <>
            <div class="col-span-2 flex flex-col gap-3 group">
              <LinkMapAccordion
                label={section.label}
                id={`accordion-section-${index}`}
              />
              <LinkList
                {...section}
                className="hidden group-[&:has(input:checked)]:flex tablet:flex"
              />
            </div>
            <Divider className="block tablet:hidden" />
          </>
        ))}
        <div class="col-span-2 flex flex-wrap gap-5">
          {extra.map((section) => (
            <ImagesSection {...section} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Body;

interface LinkMapProps {
  /** @title Title */
  label: string;
  items: {
    label: string;
    link: string;
  }[];
}

function LinkList({
  items,
  className,
}: {
  items: LinkMapProps["items"];
  className?: HTMLUListElement["className"];
}) {
  return (
    <ul class={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => (
        <li>
          <a alt={item.label} href={item.link}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function LinkMapAccordion({
  label,
  id,
  hideTitle,
}: {
  label: string;
  id: string;
  hideTitle?: boolean;
}) {
  return (
    <label
      for={id}
      class={`flex justify-between items-center text-large ${
        hideTitle && "tablet:hidden"
      } tablet:font-bold cursor-pointer tablet:cursor-default`}
    >
      <h4>{label}</h4>
      <input id={id} type="checkbox" class="hidden peer tablet:hidden" />
      <span class="block peer-checked:hidden tablet:hidden leading-none">
        +
      </span>
      <span class="hidden peer-checked:block tablet:hidden leading-none">
        -
      </span>
    </label>
  );
}
