import type { ComponentChildren, JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";

function Dot({ index, children }: {
  index: number;
  children: ComponentChildren;
}) {
  return (
    <button
      data-dot={index}
      aria-label={`go to slider item ${index}`}
      class="focus:outline-none group"
    >
      {children}
    </button>
  );
}

function Slider(props: JSX.IntrinsicElements["ul"]) {
  return <ul data-slider {...props} />;
}

function Item({
  index,
  ...props
}: JSX.IntrinsicElements["li"] & { index: number }) {
  return <li data-slider-item={index} {...props} />;
}

function NextButton(
  { class: _class, ...props }: JSX.IntrinsicElements["button"],
) {
  return (
    <button
      data-slide="next"
      aria-label="Next item"
      class={`bg-white rounded-full hidden laptop:block p-1 disabled:opacity-25 ${_class}`}
      {...props}
    >
      <Icon id="ChevronRight" class="w-4 h-4 rounded-full" />
    </button>
  );
}

function PrevButton(
  { class: _class, ...props }: JSX.IntrinsicElements["button"],
) {
  return (
    <button
      data-slide="prev"
      aria-label="Previous item"
      class={`bg-white rounded-full hidden laptop:block p-1 disabled:opacity-25 ${_class}`}
      {...props}
    >
      <Icon id="ChevronLeft" class="w-4 h-4 rounded-full" />
    </button>
  );
}

Slider.Dot = Dot;
Slider.Item = Item;
Slider.NextButton = NextButton;
Slider.PrevButton = PrevButton;

export default Slider;
