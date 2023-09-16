function Divider(
  { className, vertical }: {
    className?: HTMLSpanElement["className"];
    vertical?: boolean;
  },
) {
  return (
    <span
      class={`flex bg-grey-1 ${
        vertical ? "h-full w-px" : "w-full h-px"
      } ${className}`}
    />
  );
}

export default Divider;
