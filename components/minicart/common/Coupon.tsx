import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  // const [display, setDisplay] = useState(false);

  return (
    <div 
    // class="flex justify-between items-center px-4"
    >
      {/* <span class="text-sm">Cupom de desconto</span> */}
      {
         (
          <form
            // class="join"
            class="flex justify-between items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

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
              class="input border-black p-2  w-[259px] h-[35px] text-small focus:outline-none"
              type="text"
              value={coupon ?? ""}
              placeholder={"Cupom de desconto"}
            />
            <Button
              class="bg-black text-white hover:bg-black hover:text-white p-[10px] w-[75px] h-[35px] text-small font-normal normal-case 	" 
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Aplicar
            </Button>
          </form>
        )
}
    </div>
  );
}

export default Coupon;
