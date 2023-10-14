import {
  default as SizeGuideComponent,
  Props as SizeGuideProps,
} from "$store/components/product/ProductDetails/Modals/SizeGuide.tsx";

import { default as NotifyMeComponent } from "$store/components/product/ProductDetails/Modals/NotifyMe.tsx";

export function IslandSizeGuide(props: SizeGuideProps) {
  return <SizeGuideComponent {...props} />;
}

export function IslandNotifyMe() {
  return <NotifyMeComponent />;
}
