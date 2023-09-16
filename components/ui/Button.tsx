import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  children,
  ...props
}, ref) => (
  <button
    {...props}
    class={`btn no-animation bg-transparent p-0 border-0 h-fit min-h-fit hover:bg-transparent text-current ${_class}`}
    disabled={disabled || loading}
    type={type}
    ref={ref}
  >
    {loading ? <span class="loading loading-spinner" /> : children}
  </button>
));

export default Button;
