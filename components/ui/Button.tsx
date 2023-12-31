import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props = Omit<JSX.IntrinsicElements["button"], "loading"> & {
  loading?: boolean;
};

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = "button",
      class: _class = "",
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      {...props}
      class={`no-animation p-0 border-0 h-fit min-h-fit text-current duration-300 transition-all ease-in-out ${_class}`}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {loading ? (
        <span class="loading loading-spinner loading-current h-3 w-3" />
      ) : (
        children
      )}
    </button>
  )
);

export default Button;
