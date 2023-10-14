import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

import { useUI } from "$store/sdk/useUI.ts";
import Modal from "$store/components/ui/Modal.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  title: string;
  subtitle: string;
  howToMeasure?: HowToMesure[];

  sizeTable?: SizeRow[];

  note?: string;
}

interface SizeRow {
  /**
   * @title Size
   */
  label: string;
  width: string;
  length: string;
}

interface HowToMesure {
  /**
   * @title Text
   * @format textarea
   */
  label: string;
  image: {
    src: ImageWidget;
    height: number;
    width: number;
  };
}

export default function SizeGuide({
  title,
  subtitle,
  howToMeasure = [],
  sizeTable = [],
  note,
}: Props) {
  const { displaySizeGuide } = useUI();

  return (
    <Modal
      open={displaySizeGuide.value}
      onClose={() => {
        displaySizeGuide.value = false;
      }}
      class="p-4 tablet:p-8 text-black bg-white rounded-none max-w-[875px] relative scrollbar-none"
    >
      <div class="flex flex-col gap-5 justify-center">
        <Button
          class="btn btn-ghost absolute top-2 right-2 tablet:top-5 tablet:right-5"
          aria-label="Clique para Fechar"
          onClick={() => {
            displaySizeGuide.value = false;
          }}
        >
          <Icon id="XMark" class="h-4 w-4" />
        </Button>

        <h3 class="text-subtitle laptop:text-h3 font-bold text-center uppercase">
          {title}
        </h3>

        {subtitle && (
          <p class="text-small laptop:text-body text-center">{subtitle}</p>
        )}

        {howToMeasure.length > 0 && (
          <div class="flex flex-col mobile:flex-row gap-4 mobile:gap-6 justify-center mobile:justify-around">
            {howToMeasure.map(({ label, image }, index) => (
              <div class="flex gap-6 items-center max-w-[330px]">
                <Image
                  src={image.src}
                  alt="Imagem explicando como medir"
                  height={image.height * 0.7}
                  width={image.width * 0.7}
                  loading="lazy"
                  fetchPriority="auto"
                  class="hidden micro:block"
                />
                <p class="text-small">{label}</p>
              </div>
            ))}
          </div>
        )}

        <table>
          <thead>
            <tr class="border-b border-grey-2">
              <th class="text-small font-normal tablet:tracking-large py-4">
                TAMANHO
              </th>
              <th class="text-small font-normal tablet:tracking-large py-4 text-center w-full">
                LARGURA
              </th>
              <th class="text-small font-normal tablet:tracking-large py-4">
                COMPRIMENTO
              </th>
            </tr>
          </thead>
          <div class="h-6 block" />
          <tbody>
            {sizeTable?.map((row, index) => (
              <tr
                key={`sizeguide-row-${index}`}
                class={`${index % 2 === 0 && "bg-[#FBFBFB]"} h-6`}
              >
                <td class="text-small text-center tablet:tracking-large uppercase">
                  {row.label}
                </td>
                <td class="text-small text-center tablet:tracking-large uppercase">
                  {row.width}
                </td>
                <td class="text-small text-center tablet:tracking-large uppercase">
                  {row.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {note && <p class="text-small text-center">{note}</p>}
      </div>
    </Modal>
  );
}
