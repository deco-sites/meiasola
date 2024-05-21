import { itemToAnalyticsItem, useCart } from "apps/vtex/hooks/useCart.ts";
import BaseCart from "../common/Cart.tsx";
import { FREE_SHIPPING_VALUE } from "$store/components/constants.ts";
import type { Minicart as MinicartProps } from "$store/components/minicart/common/Cart.tsx";

export interface Props {
  minicart: MinicartProps;
}

function Cart({ minicart }: Props) {
  const { cart, loading, updateItems, addCouponsToCart } = useCart();
  const { items, totalizers } = cart.value ?? { items: [] };
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    totalizers?.find((item) => item.id === "Discounts")?.value || 0;
  const locale = cart.value?.clientPreferencesData.locale ?? "pt-BR";
  const currency = cart.value?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = cart.value?.marketingData?.coupon ?? undefined;
  const installments =
    cart.value?.paymentData?.installmentOptions[0]?.installments.length ?? 0;

  return (
    <BaseCart
      installments={installments}
      items={items.map((item) => ({
        detailUrl: item.detailUrl,
        image: { src: item.imageUrl, alt: item.skuName },
        quantity: item.quantity,
        name: item.name,
        price: {
          sale: item.sellingPrice / 100,
          list: item.listPrice / 100,
        },
      }))}
      total={(total - discounts) / 100}
      subtotal={total / 100}
      discounts={discounts / 100}
      locale={locale}
      currency={currency}
      loading={loading.value}
      freeShippingTarget={FREE_SHIPPING_VALUE}
      coupon={coupon}
      onAddCoupon={(text) => addCouponsToCart({ text })}
      onUpdateQuantity={(quantity, index) =>
        updateItems({ orderItems: [{ index, quantity }] })
      }
      itemToAnalyticsItem={(index) => {
        const item = items[index];

        return item && itemToAnalyticsItem({ ...item, coupon }, index);
      }}
      checkoutHref="/checkout"
      minicart={minicart}
    />
  );
}

export default Cart;
