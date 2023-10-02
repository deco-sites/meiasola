import Divider from "$store/components/ui/Divider.tsx";

export interface Props {
  sections: Section[];
}

interface Section {
  links: Link[];
}

interface Link {
  /**
   * @title Title
   */
  label: string;
  link: string;
}

export default function Menu({ sections }: Props) {
  return (
    <>
      <div class="flex flex-row gap-4 tablet:flex-col tablet:gap-6 w-full overflow-scroll scrollbar-none whitespace-nowrap snap-mandatory snap-x pr-6 tablet:pr-0">
        {sections?.map((section, sIndex) => (
          <>
            {sIndex !== 0 && <Divider className="hidden tablet:block" />}
            <ul
              key={`section-${sIndex}`}
              class="flex flex-row gap-4 tablet:flex-col tablet:gap-6"
            >
              {section.links?.map((link, lIndex) => (
                <li key={`section-${sIndex}-link-${lIndex}`}>
                  <a
                    alt={`Ir para ${link.label}`}
                    href={link.link}
                    class="block border p-2.5 tablet:border-none tablet:p-0 text-body text-black hover:font-bold snap-start"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        ))}
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          let link = document.querySelector('a[href="' + location.pathname + '"]');
          if(link) link.style.fontWeight = 'bold'
        `,
        }}
      />
    </>
  );
}
