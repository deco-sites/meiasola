import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";
import ShippingSimulation from "$store/components/ui/ShippingSimulation.tsx";
import Image from "$store/components/ui/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
  installments: number;
  minicart?: Minicart;
}

export interface Minicart {
  backgroundImage?: ImageWidget;
  emptyTitle?: string;
  emptyText?: string;
  buttonText?: string;
  buttonUrl?: string;
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
  installments,
  minicart,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  const newTotal = subtotal - discounts * -1;

  return (
    <div class="relative flex flex-col justify-center items-center overflow-y-scroll scrollbar-none text-black">
      {isEmtpy ? (
        <>
          <div class="py-[66px] absolute h-full w-full">
            {minicart?.backgroundImage && (
              <Image
                src={minicart?.backgroundImage}
                width={350}
                height={586}
                loading="lazy"
                fetchPriority="auto"
                fit="contain"
                class="h-full w-full object-cover"
              />
            )}
          </div>
          <div class="relative opacity-[90%] flex flex-col items-center justify-center bg-[#FFFFFF] p-3 m-[18px]">
            <>
              {minicart?.emptyTitle ? (
                <span
                  class="font-bold text-subtitle uppercase"
                  dangerouslySetInnerHTML={{ __html: minicart.emptyTitle }}
                ></span>
              ) : (
                <span class="font-bold text-subtitle uppercase">
                  Sua sacola está vazia
                </span>
              )}

              {minicart?.emptyText && (
                <span
                  class="font-medium text-body text-center my-3"
                  dangerouslySetInnerHTML={{ __html: minicart.emptyText }}
                ></span>
              )}
              {minicart?.buttonText && minicart.buttonUrl && (
                <a href={minicart?.buttonUrl}>
                  {" "}
                  <button
                    class="bg-black text-white text-body uppercase p-[10px]"
                    onClick={() => {
                      displayCart.value = false;
                    }}
                  >
                    {minicart?.buttonText}
                  </button>
                </a>
              )}
            </>
          </div>
        </>
      ) : (
        <>
          {/* Cart Items */}
          <ul
            role="list"
            class="py-6 px-2 flex-grow overflow-y-auto flex flex-col gap-4 w-full scrollbar-none"
          >
            {items.map((item, index) => (
              <li key={index}>
                <CartItem
                  item={item}
                  index={index}
                  locale={locale}
                  currency={currency}
                  onUpdateQuantity={onUpdateQuantity}
                  itemToAnalyticsItem={itemToAnalyticsItem}
                />
              </li>
            ))}
          </ul>
          {/* Free Shipping Bar */}
          <div class="py-4 w-full border-t border-base-200 ">
            <FreeShippingProgressBar
              total={total}
              locale={locale}
              currency={currency}
              target={freeShippingTarget}
            />
          </div>
          {/* Cart Footer */}
          <footer class="w-full">
            {/* Subtotal */}
            <div class=" py-2 flex flex-col">
              <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
            </div>

            {/* Total */}
            <div class="pt-4 flex flex-col justify-end items-end">
              <div class="flex justify-between items-center w-full">
                <span class="text-small">total:</span>
                <span class="font-bold text-body">
                  {formatPrice(newTotal, currency, locale)}
                </span>
              </div>
              <span class="text-small">
                ou {installments}x de{" "}
                {formatPrice(newTotal / installments, currency, locale)} sem
                juros
              </span>
            </div>

            <div class="flex justify-between mt-9">
              <button
                class="w-20 text-small text-left"
                aria-label="Clique para Fechar"
                onClick={() => (displayCart.value = false)}
              >
                continuar comprando
              </button>
              <a class="" href={checkoutHref}>
                <Button
                  data-deco="buy-button"
                  class="btn-primary  p-[18px] w-[167px] h-[46px] text-small text-white normal-case"
                  disabled={loading || isEmtpy}
                  onClick={() => {
                    sendEvent({
                      name: "begin_checkout",
                      params: {
                        coupon,
                        currency,
                        value: newTotal,
                        items: items
                          .map((_, index) => itemToAnalyticsItem(index))
                          .filter((x): x is AnalyticsItem => Boolean(x)),
                      },
                    });
                  }}
                >
                  Finalizar compra
                </Button>
              </a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default Cart;
