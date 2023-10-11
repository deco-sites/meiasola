import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

import { Runtime } from "$store/runtime.ts";

import { Input } from "$store/sections/MeiaSola/ContactUs.tsx";
import Button from "$store/components/ui/Button.tsx";

export default function ContactUsForm() {
  const loading = useSignal(false);

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

      await Runtime.vtex.actions.newsletter.subscribe({
        name,
        email,
        // phone,
        // message,
      });
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
