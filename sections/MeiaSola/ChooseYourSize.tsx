export interface Props {
  title: string;
  sizes: {
    /**
     * @title size
     */
    label: string;

    link: string;
  }[];
}

function ChooseYourSize({ title, sizes }: Props) {
  return (
    <div class="bg-black text-white text-large py-6 laptop:py-5">
      <div class="container flex flex-col items-center gap-8 laptop:flex-row laptop:justify-between">
        <h4 class="text-large tracking-wide text-center laptop:text-left">
          {title}
        </h4>
        <ul class="flex flex-wrap justify-center gap-8 laptop:gap-6 desktop:gap-8">
          {sizes?.map((size, index) => {
            return (
              <li key={"size-" + index}>
                <a
                  href={size.link}
                  aria-label={`Numeração ${size.label}`}
                  class="border border-white p-2.5 block hover:bg-white hover:text-black transition-all duration-300 ease-out"
                >
                  {size.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChooseYourSize;
