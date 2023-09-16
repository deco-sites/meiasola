import { lazy } from "preact/compat";

const CartVTEX = lazy(() => import("./vtex/Cart.tsx"));

function Cart() {
  return <CartVTEX />;
}

export default Cart;
