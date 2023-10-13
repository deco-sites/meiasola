import type { ComponentChildren } from "preact";
import { Suspense } from "preact/compat";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Logo from "$store/components/ui/Logo.tsx";

export interface Props {
  title?: string;
  onClose?: () => void;
  children: ComponentChildren;
  chevronLeft?: boolean;
}

function Aside({ title, onClose, children, chevronLeft }: Props) {
  return (
    <div class="bg-white h-full w-[398px] flex flex-col">
      <div class="h-16 flex justify-between items-center px-6 shrink-0 border-b border-base-200 ">
        {chevronLeft && onClose && (
          <Button
            class="btn btn-ghost"
            aria-label="Clique para Voltar"
            onClick={onClose}
          >
            <Icon id="ChevronLeft" class="h-4 w-4" />
          </Button>
        )}
        {title ? (
          <h1 class="px-4 py-3">
            <span class="font-bold text-subtitle">{title}</span>
          </h1>
        ) : (
          <div class="flex justify-center w-full">
            <Logo class="w-[90px] h-[14px]" />
          </div>
        )}
        {onClose && (
          <Button
            class="btn btn-ghost"
            aria-label="Clique para Fechar"
            onClick={onClose}
          >
            <Icon id="XMark" class="h-4 w-4" />
          </Button>
        )}
      </div>

      <Suspense
        fallback={
          <div class="w-full h-full flex items-center justify-center">
            <span class="loading loading-spinner" />
          </div>
        }
      >
        <div class="px-6 mb-6 overflow-y-scroll overflow-x-hidden scrollbar-none flex grow">
          {children}
        </div>
      </Suspense>
    </div>
  );
}

export default Aside;
