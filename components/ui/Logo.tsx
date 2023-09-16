import Icon from "$store/components/ui/Icon.tsx";
import type { Props as IconProps } from "$store/components/ui/Icon.tsx";

function Logo(props: Omit<IconProps, "id">) {
  return (
    <a alt="Logo da Meia Sola" href="/">
      <Icon id="MeiaSola" class="w-[110px] h-[18px]" {...props} />
    </a>
  );
}

export default Logo;
