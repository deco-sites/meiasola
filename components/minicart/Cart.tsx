import { lazy } from "preact/compat";

import type { Minicart as MinicartProps } from "$store/components/minicart/common/Cart.tsx";

export interface Props {
  minicart: MinicartProps;
}

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));

function Cart({ minicart }: Props) {
  return <CartVTEX minicart={minicart} />;
}

export default Cart;
