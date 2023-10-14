import type { JSX } from "preact";
import { useSignal } from "@preact/signals";

import { Runtime } from "$store/runtime.ts";
import { useUI } from "$store/sdk/useUI.ts";

import Modal from "$store/components/ui/Modal.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export default function NotifyMeModal() {
  const { displayNotifyMe } = useUI();

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

      await Runtime.vtex.actions.notifyme({
        skuId: displayNotifyMe.value,
        name,
        email,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <Modal
      open={!!displayNotifyMe.value}
      onClose={() => {
        displayNotifyMe.value = undefined;
      }}
      class="p-4 tablet:p-8 text-black bg-white rounded-none max-w-[875px] relative scrollbar-none"
    >
      <div>
        <Button
          class="btn btn-ghost absolute top-2 right-2 tablet:top-5 tablet:right-5"
          aria-label="Clique para Fechar"
          onClick={() => {
            displayNotifyMe.value = undefined;
          }}
        >
          <Icon id="XMark" class="h-4 w-4" />
        </Button>
        <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
          <span class="text-base">
            Este produto está indisponivel no momento
          </span>
          <span class="text-sm">Avise-me quando estiver disponivel</span>

          <input placeholder="Nome" class="input input-bordered" name="name" />
          <input
            placeholder="Email"
            class="input input-bordered"
            name="email"
          />

          <button class="btn disabled:loading" disabled={loading}>
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}
