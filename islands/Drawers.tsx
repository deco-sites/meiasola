import { Props as FilterProps } from "$store/components/search/Filters.tsx";
import FiltersDrawer from "$store/components/search/Drawers/Filters.tsx";

import ButtonFilters, { Props as ButtonProps } from "$store/components/search/Drawers/ButtonFilters.tsx";

export function IslandFiltersDrawer(props: FilterProps) {
  return <FiltersDrawer {...props} />;
}

export function IslandButtonFilters(props: ButtonProps) {
  return <ButtonFilters {...props}/>
}