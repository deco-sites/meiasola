import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

import Button from "$store/components/ui/Button.tsx";
import Divider from "$store/components/ui/Divider.tsx";
import { formatPrice } from "$store/sdk/format.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({
  simulation,
}: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods =
    simulation.value?.logisticsInfo?.reduce(
      (initial, { slas }) => [...initial, ...slas],
      [] as Sla[]
    ) ?? [];

  const deliverys = methods.filter(
    (method) => method.deliveryChannel === "delivery"
  );
  const pickups = methods.filter(
    (method) => method.deliveryChannel === "pickup-in-point"
  );

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return null;
  }

  return (
    <>
      <div class="flex gap-4 desktop:gap-5">
        <label
          for="shipping-method-home"
          class="w-full text-small [&:has(input:checked)]:bg-black [&:has(input:checked)]:text-white [&:has(input:checked)]:font-bold cursor-pointer border border-black h-[35px] flex items-center justify-center"
        >
          <input
            type="radio"
            id="shipping-method-home"
            name="shipping-method"
            class="hidden"
            checked
          />
          Receber em casa
        </label>

        <label
          for="shipping-method-store"
          class="w-full text-small [&:has(input:checked)]:bg-black [&:has(input:checked)]:text-white [&:has(input:checked)]:font-bold cursor-pointer border border-black h-[35px] flex items-center justify-center"
        >
          <input
            type="radio"
            id="shipping-method-store"
            name="shipping-method"
            class="hidden"
          />
          Retirar na loja
        </label>
      </div>

      <ul class="flex-col gap-3 py-3 text-small group-[&:has([id=shipping-method-home]:checked)]:flex hidden">
        {deliverys.map((method, index) => (
          <>
            {index !== 0 && (
              <li>
                <Divider className="-bg-[#f5f5f5]" />
              </li>
            )}
            <li class="flex justify-between items-center w-full px-3">
              <div class="flex flex-col text-small">
                <span>{method.name}</span>
                <span class="font-bold">
                  Receba em {formatShippingEstimate(method.shippingEstimate)}
                </span>
              </div>
              <span>
                {method.price === 0
                  ? "GRÁTIS"
                  : formatPrice(method.price / 100, currencyCode, locale)}
              </span>
            </li>
          </>
        ))}
        {deliverys.length === 0 && (
          <li class="" p-3>
            <h4 class="text-large font-bold text-center">Oops!</h4>
            <p class="text-small text-center">
              Infelizmente o produto está disponível para retirada em sua
              região!
            </p>
          </li>
        )}
      </ul>

      <ul class="flex-col gap-3 py-3 text-small group-[&:has([id=shipping-method-store]:checked)]:flex hidden">
        {pickups.map((method, index) => (
          <>
            {index !== 0 && (
              <li>
                <Divider className="-bg-[#f5f5f5]" />
              </li>
            )}
            <li class="flex justify-between items-center w-full px-3">
              <div class="flex flex-col text-small">
                <span>
                  {method?.pickupStoreInfo?.friendlyName ?? method.name}
                </span>
                <span class="font-bold">
                  Retire em {formatShippingEstimate(method.shippingEstimate)}
                </span>
              </div>
              <span>
                {method.price === 0
                  ? "GRÁTIS"
                  : formatPrice(method.price / 100, currencyCode, locale)}
              </span>
            </li>
          </>
        ))}
        {pickups.length === 0 && (
          <li class="" p-3>
            <h4 class="text-large font-bold text-center">Oops!</h4>
            <p class="text-small text-center">
              Infelizmente o produto está indisponível para retirada em sua
              região!
            </p>
          </li>
        )}
      </ul>
    </>
  );
}

function ShippingSimulation({ items, gap }: Props & { gap?: boolean }) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation: JSX.GenericEventHandler<HTMLFormElement> =
    useCallback(async () => {
      if (postalCode.value.length !== 8) {
        return;
      }

      try {
        loading.value = true;
        simulateResult.value = await simulate({
          items: items,
          postalCode: postalCode.value,
          country: cart.value?.storePreferencesData.countryCode || "BRA",
        });
      } finally {
        loading.value = false;
      }
    }, [postalCode.value]);

  if (simulateResult.value)
    return (
      <div class="flex flex-col gap-4 group">
        <div id="shipping-result" class="flex justify-between">
          <span class="text-small font-bold">{postalCode.value}</span>
          <button
            class="text-small font-normal"
            onClick={() => (simulateResult.value = null)}
          >
            (não é seu CEP?)
          </button>
        </div>
        <ShippingContent simulation={simulateResult} />
      </div>
    );

  return (
    <div class="flex flex-col gap-2">
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleSimulation();
        }}
        class={`grid grid-cols-4 ${gap ? "gap-4" : ""}`}
      >
        <input
          class="border border-black p-2 h-[35px] text-small col-span-3 placeholder:text-small rounded-none placeholder:text-grey-2 focus:outline-none"
          placeholder="Informar CEP"
          maxLength={8}
          size={8}
          required
          value={postalCode.value}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          disabled={postalCode.value !== "" && postalCode.value.length < 8}
          class="bg-black text-white hover:bg-black disabled:bg-grey-2 hover:text-white !h-[35px] text-small font-normal normal-case col-span-1"
        >
          Calcular
        </Button>
      </form>
    </div>
  );
}

export default ShippingSimulation;
