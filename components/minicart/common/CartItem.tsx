import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem({
  item,
  index,
  locale,
  currency,
  onUpdateQuantity,
  itemToAnalyticsItem,
}: Props) {
  const {
    image,
    name,
    price: { sale, list },
    quantity,
  } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  console.log(item);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) =>
      async (e: A) => {
        try {
          setLoading(true);
          await cb(e);
        } finally {
          setLoading(false);
        }
      },
    []
  );

  return (
    <div
      class="grid grid-rows-1 gap-2"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <div class="bg-grey-1 p-1 w-[73px] h-[76px]">
        <Image
          {...image}
          style={{ aspectRatio: "73 / 76" }}
          width={73}
          height={76}
          class="h-full w-full object-cover mix-blend-multiply"
        />
      </div>

      <div class="flex flex-col justify-between pb-1">
        <div class="flex justify-between items-start">
          <span class="text-small text-grey-2 w-2/3 line-clamp-2">{name}</span>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="btn-ghost btn-square text-grey-2 hover:bg-transparent w-min"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem &&
                sendEvent({
                  name: "remove_from_cart",
                  params: { items: [analyticsItem] },
                });
            })}
          >
            <Icon id="Trash" size={16} class="text-grey-2" />
          </Button>
        </div>
        <div class="flex align-baseline items-end justify-between gap-2">
          <QuantitySelector
            disabled={loading || isGift}
            quantity={quantity}
            onChange={withLoading(async (quantity) => {
              const analyticsItem = itemToAnalyticsItem(index);
              const diff = quantity - item.quantity;

              await onUpdateQuantity(quantity, index);

              if (analyticsItem) {
                analyticsItem.quantity = diff;

                sendEvent({
                  name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                  params: { items: [analyticsItem] },
                });
              }
            })}
          />
          <span class="text-body text-black font-extrabold">
            {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
