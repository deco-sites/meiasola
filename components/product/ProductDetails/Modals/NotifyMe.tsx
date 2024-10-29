import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

import { useUI } from "$store/sdk/useUI.ts";
import { useForm } from "$store/sdk/useForm.ts";

import Modal from "$store/components/ui/Modal.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { invoke } from "site/runtime.ts";

export default function NotifyMeModal() {
  const { displayNotifyMe } = useUI();
  const { validName, validEmail, validPhone } = useForm();

  const loading = useSignal(false);
  const errorMessage = useSignal("");

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;

      if (!validName(name)) {
        errorMessage.value = "Use um nome válido";
        return;
      }

      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      if (!validEmail(email)) {
        errorMessage.value = "Use um e-mail válido";
        return;
      }

      const phone = (
        e.currentTarget.elements.namedItem("phone") as RadioNodeList
      )?.value;

      if (!validPhone(phone)) {
        errorMessage.value = "Use um telefone válido";
        return;
      }

      loading.value = true;

      const acceptCommunications = (
        e.currentTarget.elements.namedItem(
          "accept-communications"
        ) as RadioNodeList
      )?.value;

      errorMessage.value = "";

      await invoke.vtex.actions.notifyme({
        skuId: displayNotifyMe.value,
        name,
        email,
        phone,
        acceptCommunications,
      });
    } catch (e) {
      console.log(e);
      errorMessage.value = "Houve um erro inesperado";
    } finally {
      if (!errorMessage.value) {
        loading.value = false;
        displayNotifyMe.value = undefined;
      }
    }
  };

  return (
    <Modal
      open={!!displayNotifyMe.value}
      onClose={() => {
        displayNotifyMe.value = undefined;
      }}
      class="p-4 tablet:p-8 text-black bg-white rounded-none w-fit relative scrollbar-none"
    >
      <div class="flex flex-col gap-4 justify-center">
        <Button
          class="btn btn-ghost absolute top-2 right-2 tablet:top-5 tablet:right-5"
          aria-label="Clique para Fechar"
          onClick={() => {
            displayNotifyMe.value = undefined;
          }}
        >
          <Icon id="XMark" class="h-4 w-4" />
        </Button>

        <h3 class="text-subtitle laptop:text-h3 font-bold text-center uppercase">
          Avise-me quando chegar
        </h3>

        <h4 class="text-small laptop:text-body text-center">
          Infelizmente esse tamanho não está disponível no momento.
        </h4>

        <p class="text-small text-center mt-2 text-element-dark">
          Insira seus dados e receba uma notificação quando este produto estiver
          disponível.
        </p>

        <form onSubmit={handleSubmit} class="flex flex-col gap-3 form-control">
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

          <label
            for="accept-communications-checkbox"
            class="flex gap-1 items-center text-small flex-col mobile:flex-row"
          >
            <input
              id="accept-communications-checkbox"
              type="checkbox"
              name="accept-communications"
              class="h-3 w-3 cursor-pointer accent-black"
              required
            />
            Aceito receber novidades da Meia Sola por e-mail e SMS.
          </label>

          <Button
            type="submit"
            loading={loading.value}
            aria-label="Enviar formulário"
            class="bg-black hover:bg-black text-white w-full !h-[45px] font-normal flex items-center justify-center text-body"
          >
            AVISE-ME
          </Button>
          <p class="text-small text-red">{errorMessage.value}</p>
        </form>
      </div>
    </Modal>
  );
}

export function Input({
  label,
  name,
  placeholder = "",
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  const styles =
    "w-full border border-grey-2 text-small text-black placeholder:text-grey-2 placeholder:text-small p-2.5";

  return (
    <div class="flex flex-col gap-3">
      <label class="text-small">{label}</label>
      <input
        type={type}
        name={name}
        class="w-full border border-grey-2 text-small text-black placeholder:text-grey-2 placeholder:text-small p-2.5 h-[35px] autofill:bg-white"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
