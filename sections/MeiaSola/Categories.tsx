import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  categories: Category[];
}

interface Category {
  /**
   * @title Title
   */
  label: string;
  link: string;
  image: ImageWidget;
}

function Categories({ title, categories }: Props) {
  return (
    <div class="container text-black flex flex-col gap-6 py-6">
      <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>
      <ul class="w-full flex justify-between gap-8 overflow-x-scroll snap-x snap-mandatory scrollbar-none">
        {categories?.map((category, index) => {
          return (
            <li key={"category-" + index}>
              <a
                aria-label={`Clique para ver produtos da categoria: ${category.label}`}
                href={category.link}
                class="h-[128px] w-[110px] bg-element transition-all duration-200 ease hover:bg-element-hover p-2.5 flex flex-col justify-between items-center text-center text-large shrink-0 snap-start"
              >
                <Image
                  alt="Imagem da Categoria"
                  src={category.image}
                  width={88}
                  height={88}
                  class="h-[88px] w-[88px] object-cover"
                  loading="lazy"
                />
                {category.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
