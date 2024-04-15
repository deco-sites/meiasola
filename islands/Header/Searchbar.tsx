import type { Props } from "$store/components/header/Searchbar.tsx";
import { SearchbarMobile } from "$store/components/header/Searchbar.tsx";

function Island(props: Props) {
  return <SearchbarMobile {...props} />;
}

export default Island;
