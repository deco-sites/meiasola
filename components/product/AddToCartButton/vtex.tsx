import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem" | "platform"> {
  seller: string;
  goToCheckout?: boolean;
}

function AddToCartButton(props: Props) {
  const { addItems } = useCart();
  const onAddItem = () => {
    if (props.goToCheckout) {
      window.location.href = `/checkout/cart/add?sku=${props.productID}&qty=1&seller=${props.seller}&redirect=true&sc=1`;
    } else {
      addItems({
        orderItems: [
          {
            id: props.productID,
            seller: props.seller,
            quantity: 1,
          },
        ],
      });
    }
  };

  return <Button onAddItem={onAddItem} {...props} />;
}

export default AddToCartButton;
