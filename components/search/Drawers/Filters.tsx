import { useUI } from "$store/sdk/useUI.ts";
import { lazy } from "preact/compat";
import { useEffect } from "preact/hooks";

import Drawer from "$store/components/ui/Drawer.tsx";
import Aside from "$store/components/ui/Aside.tsx";
import { Props } from "$store/components/search/Filters.tsx";

const Filters = lazy(() => import("$store/components/search/Filters.tsx"));

export default function FiltersDrawer(props: Props) {
  const { displayFilters } = useUI();

  const onClose = () => {
    displayFilters.value = false;
  };

  useEffect(() => {
    displayFilters.value = false;
  }, [props]);

  return (
    <Drawer
      open={displayFilters.value}
      onClose={onClose}
      aside={
        <Aside onClose={onClose} title="Filtro">
          {displayFilters.value && <Filters {...props} />}
        </Aside>
      }
    ></Drawer>
  );
}
