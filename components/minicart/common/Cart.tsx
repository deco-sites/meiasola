import Button from '$store/components/ui/Button.tsx';
import { sendEvent } from '$store/sdk/analytics.tsx';
import { formatPrice } from '$store/sdk/format.ts';
import { useUI } from '$store/sdk/useUI.ts';
import { AnalyticsItem } from 'apps/commerce/types.ts';
import CartItem, { Item, Props as ItemProps } from './CartItem.tsx';
import Coupon, { Props as CouponProps } from './Coupon.tsx';
import FreeShippingProgressBar from './FreeShippingProgressBar.tsx';
import ShippingSimulation from 'deco-sites/meiasola/components/ui/ShippingSimulation.tsx';

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
  onAddCoupon: CouponProps['onAddCoupon'];
  onUpdateQuantity: ItemProps['onUpdateQuantity'];
  itemToAnalyticsItem: ItemProps['itemToAnalyticsItem'];
  installments: number;
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
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class='flex flex-col justify-center items-center overflow-hidden'
      // style={{ minWidth: "calc(min(100vw, 398px))", maxWidth: "398px" }}
    >
      {isEmtpy ? (
        <div class='flex flex-col gap-6'>
          <span class='font-medium text-2xl'>Sua sacola está vazia</span>
          <Button
            class='btn-outline'
            onClick={() => {
              displayCart.value = false;
            }}
          >
            Escolher produtos
          </Button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <ul
            role='list'
            class='mt-6 px-2 flex-grow overflow-y-auto flex flex-col gap-6 w-full'
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
          <div class='py-4 w-full border-t border-base-200 '>
            <FreeShippingProgressBar
              total={total}
              locale={locale}
              currency={currency}
              target={freeShippingTarget}
            />
          </div>
          {/* Cart Footer */}
          <footer class='w-full'>
            {/* Subtotal */}
            <div class=' py-2 flex flex-col'>
              {/* {discounts > 0 && (
                  <div class="flex justify-between items-center px-4">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between px-4 text-sm">
                  <span>Subtotal</span>
                  <span class="px-4">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div> */}
              <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
              {/* Shipping Simulation */}
              <div class='mt-5'>
                <ShippingSimulation
                  items={[
                    {
                      id: Number(1),
                      quantity: 1,
                      seller: '1',
                    },
                  ]}
                />
              </div>
            </div>

            {/* Total */}
            <div class='pt-4 flex flex-col justify-end items-end'>
              <div class='flex justify-between items-center w-full'>
                <span class='text-small'>total:</span>
                <span class='font-bold text-body'>
                  {formatPrice(total, currency, locale)}
                </span>
              </div>
              <span class='text-small'>
                ou {installments}x de{' '}
                {formatPrice(total / installments, currency, locale)} sem juros
              </span>
              {/* <span class="text-sm text-base-300">
                  Taxas e fretes serão calculados no checkout
                </span> */}
            </div>

            <div class='flex justify-between mt-9'>
              <button
                class='w-20 text-small text-left'
                aria-label='Clique para Fechar'
                onClick={() => displayCart.value = false}
                >
                continuar comprando
              </button>
              <a class='' href={checkoutHref}>
                <Button
                  data-deco='buy-button'
                  class='btn-primary  p-[18px] w-[167px] h-[46px] text-small text-white normal-case'
                  disabled={loading || isEmtpy}
                  onClick={() => {
                    sendEvent({
                      name: 'begin_checkout',
                      params: {
                        coupon,
                        currency,
                        value: total - discounts,
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
