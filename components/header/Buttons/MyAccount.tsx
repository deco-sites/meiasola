import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /**
   * @title Link to MyAccount Page
   * @default #
   */
  href: string;
  /**
   * @title Title on Mobile Menu
   * @default Acesse sua conta
   */
  label: string;
}

function MyAccountButton(
  { href, label, variantMenu }: Props & { variantMenu?: boolean },
) {
  return (
    <a href={href} aria-label={label} class="flex gap-2">
      <Icon id="User" class={`w-6 h-6 ${variantMenu && "w-[18px] h-[18px]"}`} />
      {variantMenu && <p class="text-small uppercase text-black">{label}</p>}
    </a>
  );
}

export default MyAccountButton;
