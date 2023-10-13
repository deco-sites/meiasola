import { Signal, useSignal } from '@preact/signals';
import { useCallback, useState } from 'preact/hooks';
import Button from '$store/components/ui/Button.tsx';
import { formatPrice } from '$store/sdk/format.ts';
import { useCart } from 'apps/vtex/hooks/useCart.ts';
import type { SimulationOrderForm, SKU, Sla } from 'apps/vtex/utils/types.ts';

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === 'bd') return `${time} dias úteis`;
  if (type === 'd') return `${time} dias`;
  if (type === 'h') return `${time} horas`;
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
      [] as Sla[],
    ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || 'pt-BR';
  const currencyCode = cart.value?.storePreferencesData.currencyCode || 'BRL';

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return null;
  }

  return (
    <ul class='flex flex-col gap-4 p-4 text-small'>
      {methods.map((method) => (
        <li class='flex justify-between items-center not-first-child:border-t'>
          <div class='flex flex-col text-left'>
            <span class='text-button text-left'>{method.name}</span>
            <span class='text-button font-bold text-left'>
              Receba em {formatShippingEstimate(method.shippingEstimate)}
            </span>
          </div>
          <span class='text-base text-right'>
            {method.price === 0
              ? 'GRÁTIS'
              : formatPrice(method.price / 100, currencyCode, locale)}
          </span>
        </li>
      ))}
      {/* <span class='text-base-300'>
        Os prazos de entrega começam a contar a partir da confirmação do
        pagamento e podem variar de acordo com a quantidade de produtos na
        sacola.
      </span> */}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal('');
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();
  const [CEP, setCEP] = useState('');

  const handleSimulation = useCallback(async () => {
    // if (postalCode.value.length !== 8) {
    //   return (
    //     <div class='p-2'>
    //       <span>teste</span>
    //     </div>
    //   );
    // }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || 'BRA',
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class='flex flex-col gap-2'>
      {/* <div class="flex flex-col">
        <span>Calcular frete</span>
        <span>
          Informe seu CEP para consultar os prazos de entrega
        </span>
      </div> */}
      {!CEP && (
        <form
          class='flex justify-between items-center'
          onSubmit={(e) => {
            e.preventDefault();
            handleSimulation();
            setCEP(postalCode.value);
          }}
        >
          <input
            as='input'
            type='text'
            class='input border-black p-2  w-[259px] h-[35px] text-small focus:outline-none'
            placeholder='Informar CEP'
            value={postalCode.value}
            maxLength={8}
            size={8}
            onChange={(e: { currentTarget: { value: string } }) => {
              postalCode.value = e.currentTarget.value;
            }}
          />
          <Button
            type='submit'
            loading={loading.value}
            class='bg-black text-white hover:bg-black hover:text-white p-[11.5px] w-[75px] h-[35px] text-small font-normal normal-case '
          >
            Calcular
          </Button>
        </form>
      )}

      {CEP && (
        <>
          <div class='flex justify-between'>
            <span class='text-small font-bold'>{CEP}</span>
            <button class='text-small font-normal' onClick={() => setCEP('')}>
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
