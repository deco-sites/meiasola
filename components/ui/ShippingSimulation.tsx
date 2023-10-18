import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

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

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return null;
  }

  return (
    <ul class="flex flex-col gap-4 p-4 text-small">
      {methods.map((method) => (
        <li class="flex justify-between items-center not-first-child:border-t">
          <div class="flex flex-col text-left">
            <span class="text-button text-left">{method.name}</span>
            <span class="text-button font-bold text-left">
              Receba em {formatShippingEstimate(method.shippingEstimate)}
            </span>
          </div>
          <span class="text-base text-right">
            {method.price === 0
              ? "GRÁTIS"
              : formatPrice(method.price / 100, currencyCode, locale)}
          </span>
        </li>
      ))}
    </ul>
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

  return (
    <div class="flex flex-col gap-2">
      {!simulateResult.value && (
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSimulation();
          }}
          class={`grid grid-cols-4 ${gap ? "gap-4" : ""}`}
        >
          <input
            class="border border-black p-2 h-[35px] text-small col-span-3 placeholder:text-small placeholder:text-grey-2 focus:outline-none"
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
            class="bg-black text-white hover:bg-black disabled:bg-black hover:text-white !h-[35px] text-small font-normal normal-case col-span-1"
          >
            Calcular
          </Button>
        </form>
      )}

      {simulateResult.value && (
        <>
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
        </>
      )}
    </div>
  );
}

export default ShippingSimulation;
