import type { ComponentChildren } from "preact";
import { Suspense } from "preact/compat";

import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  title?: string;
  onClose?: () => void;
  children: ComponentChildren;
  chevronLeft?: boolean;
}

function Aside(
  { title, onClose, children, chevronLeft }: Props,
) {
  return (
    <div class="bg-white h-full w-[95vw] max-w-[300px] flex flex-col">
      <div class="h-20 flex justify-between items-center px-6">
        {chevronLeft && onClose && (
          <Button class="btn btn-ghost" onClick={onClose}>
            <Icon id="ChevronLeft" class="h-4 w-4" />
          </Button>
        )}
        {title
          ? (
            <h1 class="px-4 py-3">
              <span class="font-bold text-subtitle">{title}</span>
            </h1>
          )
          : (
            <div class="flex justify-center w-full">
              <Icon id="MeiaSola" class="w-[90px] h-[14px]" />
            </div>
          )}
        {onClose && (
          <Button class="btn btn-ghost" onClick={onClose}>
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
