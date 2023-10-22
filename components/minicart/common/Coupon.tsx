import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);

  if (coupon) {
    return (
      <div class="flex gap-2">
        <span class="text-small font-bold">{coupon}</span>
        <Button
          class="text-small font-normal !p-0 !bg-transparent"
          loading={loading}
          onClick={async (e) => {
            e.preventDefault();
            try {
              setLoading(true);
              onAddCoupon(undefined);
            } finally {
              setLoading(false);
            }
          }}
        >
          remover cupom
        </Button>
      </div>
    );
  }

  return (
    <form
      class="grid grid-cols-4 gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const {
          currentTarget: { elements },
        } = e;

        const input = elements.namedItem("coupon") as HTMLInputElement;
        const text = input.value;

        if (!text) return;

        try {
          setLoading(true);
          await onAddCoupon(text);
        } finally {
          setLoading(false);
        }
      }}
    >
      <input
        name="coupon"
        class="input border-black p-2 col-span-3 h-[35px] text-small focus:outline-none autofill:bg-white"
        type="text"
        value={coupon ?? ""}
        placeholder={"Cupom de desconto"}
      />
      <Button
        type="submit"
        htmlFor="coupon"
        loading={loading.value}
        class="bg-black text-white hover:bg-black disabled:bg-black hover:text-white !h-[35px] text-small font-normal normal-case col-span-1"
      >
        Aplicar
      </Button>
    </form>
  );
}

export default Coupon;
