import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({ loading, currency, total, items }: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = true;
  };

  return (
    <Button
      class="relative hover:bg-transparent bg-transparent"
      aria-label="Abrir o carrinho"
      data-deco={displayCart.value && "open-cart"}
      onClick={onClick}
    >
      <div class="h-[15px] w-[15px] absolute top-[-2px] right-[-6px]">
        {loading ? (
          <div class="loading loading-spinner w-full h-full" />
        ) : (
          <div class="bg-red text-white rounded-full text-[10px] a">
            {totalItems > 9 ? "9+" : totalItems}
          </div>
        )}
      </div>
      <Icon id="Bag" size={22} />
    </Button>
  );
}

export default CartButton;
