import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
// import { sendMail, IRequestBody } from "https://deno.land/x/sendgrid/mod.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

import { Runtime } from "$store/runtime.ts";

import { Input } from "$store/sections/MeiaSola/ContactUs.tsx";
import Button from "$store/components/ui/Button.tsx";

export default function ContactUsForm() {
  const loading = useSignal(false);

  // console.log(Runtime.app.actions.contactUs, Runtime.actions.contactUs);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;
      const phone = (
        e.currentTarget.elements.namedItem("phone") as RadioNodeList
      )?.value;
      const message = (
        e.currentTarget.elements.namedItem("message") as RadioNodeList
      )?.value;

      const body = {
        personalizations: [
          {
            to: [
              {
                email: "andre.lucas.medeir+meiasola@gmail.com", //"ecommerce@meiasola.com.br",
              },
            ],
            cc: [
              {
                email: props.email,
              },
            ],
          },
        ],
        from: {
          email: "meiasolasendgrid@gmail.com",
        },
        subject: `Cliente ${props.name} quer falar com a meiasola`,
        content: [
          {
            type: "text/plain",
            value: `O Cliente ${props.name}, deseja falar com a Meia Sola.\n\n - Este é o seu telefone para contato: ${props.phone}\n - Este é o seu email: ${props.email}\n\n E esta foi a mensagem que ele deixou:\n${props.message}`,
          },
        ],
      };

      const response = await fetchAPI(
        "https://api.sendgrid.com/v3/mail/send/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer SG.98i_qK1EQxaZV1O08ALx9w._u918R2S0O80TUQ-ujxO04-208PSSc908Gq3fJr2jIM`,
          },
          body: JSON.stringify(body),
        }
      );

      // const response = await Runtime.app.actions.contactUs({
      //   name,
      //   email,
      //   phone,
      //   message,
      // });

      console.log(response);
    } finally {
      loading.value = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} class="flex flex-col gap-6 form-control">
      <Input name="name" label="Nome" placeholder="digite seu nome" />
      <Input
        type="email"
        name="email"
        label="E-mail"
        placeholder="digite seu e-mail"
      />
      <Input
        type="tel"
        name="phone"
        label="Telefone"
        placeholder="digite seu telefone"
      />
      <Input name="message" label="Mensagem" textarea />
      <button
        type="submit"
        class={`w-[90px] h-[35px] text-small font-bold bg-black text-white uppercase flex items-center justify-center disabled:loading disabled:loading-spinner disabled:loading-xs`}
        disabled={loading}
      >
        ENVIAR
      </button>
    </form>
  );
}
