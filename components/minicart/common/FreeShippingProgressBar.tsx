import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

function FreeShippingProgressBar({ target, total, currency, locale }: Props) {
  const remaining = target - total;
  const percent = Math.floor((total / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2">
      <progress
        class="progress progress-primary w-full bg-gradient-to-r from-black to-white"
        value={percent}
        max={100}
      />
      <div class="flex justify-center items-center gap-2 text-primary">
        {remaining > 0
          ? (
            <span>
              Faltam 
<span class="font-extrabold">
{" "}{formatPrice(remaining, currency, locale)}{" "}
  </span>              
              para Frete Grátis
            </span>
          )
          : <span>Você ganhou frete grátis!</span>}
      </div>
    </div>
  );
}

export default FreeShippingProgressBar;
