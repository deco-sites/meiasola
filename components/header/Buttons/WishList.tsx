import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  /**
   * @title Link to WishList Page
   * @default #
   */
  href: string;

  /**
   * @title Title on Mobile Menu
   * @default Lista de Desejos
   */
  label: string;
}

function WishListButton(
  { href, label, variantMenu }: Props & { variantMenu?: boolean },
) {
  return (
    <a href={href} aria-label={label} class="flex gap-2">
      <Icon
        id="Heart"
        class={`w-6 h-6 ${variantMenu && "w-[18px] h-[18px]"}`}
      />
      {variantMenu && <p class="text-small uppercase">{label}</p>}
    </a>
  );
}

export default WishListButton;
