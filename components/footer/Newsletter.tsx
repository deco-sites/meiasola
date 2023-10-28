import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

import Button from "$store/components/ui/Button.tsx";
import { useForm } from "$store/sdk/useForm.ts";

export interface Form {
  /**
   * @title Placeholder of Name Input
   */
  name_placeholder?: string;
  /**
   * @title Placeholder of Email Input
   */
  email_placeholder?: string;
  buttonText?: string;
}

export interface Props {
  title: string;
  /** @format textarea */
  description: string;
  form: Form;
}

function Newsletter({ title, description, form }: Props) {
  const loading = useSignal(false);
  const errorMessage = useSignal("");
  const { validName, validEmail } = useForm();

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

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
        errorMessage.value = "Este é um e-mail inválido";
        return;
      }

      await Runtime.vtex.actions.newsletter.subscribe({
        name,
        email,
      });

      errorMessage.value = "";
    } catch (e) {
      errorMessage.value = "Houve um erro inesperado";
    } finally {
      loading.value = false;
    }
  };

  return (
    <>
      {/* MOBILE VERSION */}
      <div class="block tablet:hidden bg-[#F3F3F3] py-6 text-black">
        <div class="container flex flex-col gap-6">
          <div class="flex flex-col gap-3">
            <h3 class="font-bold text-subtitle">{title}</h3>
            <p class="text-body">{description}</p>
          </div>
          <form class="w-full form-control gap-3.5" onSubmit={handleSubmit}>
            <input
              name="name"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body autofill:bg-white"
              placeholder={form.name_placeholder || "Nome"}
            />
            <input
              name="email"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body autofill:bg-white"
              placeholder={form.email_placeholder || "E-mail"}
            />
            <Button
              type="submit"
              class="bg-black hover:bg-black text-white w-full !h-10 font-normal flex items-center justify-center text-body"
              aria-label="Cadastrar-se na Newsletter"
              loading={loading.value}
            >
              {form.buttonText || "CADASTRE-SE"}
            </Button>
            <p class="text-small text-red">{errorMessage.value}</p>
          </form>
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div class="hidden tablet:block bg-[#F3F3F3] py-9 text-black">
        <div class="container grid grid-cols-12 gap-4 desktop:gap-5">
          <div class="col-span-1 hidden desktop:flex"></div>
          <div class="col-span-6 desktop:col-span-5 flex flex-col justify-center gap-5">
            <h3 class="font-medium text-h3">{title}</h3>
            <p class="text-body">{description}</p>
          </div>
          <div class="col-span-1 flex"></div>
          <form
            class="col-span-5 desktop:col-span-4 w-full form-control justify-center gap-3.5"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              class="h-8 w-full px-2.5 bg-white placeholder:text-grey-2 placeholder:text-body autofill:bg-white"
              placeholder={form.name_placeholder || "Nome"}
            />
            <input
              type="email"
              name="email"
              class="h-8 w-full px-2.5 bg-white placeholder:text-grey-2 placeholder:text-body autofill:bg-white"
              placeholder={form.email_placeholder || "E-mail"}
            />
            <Button
              type="submit"
              class="bg-black hover:bg-black text-white w-full !h-10 font-normal flex items-center justify-center text-body"
              aria-label="Cadastrar-se na Newsletter"
              loading={loading.value}
            >
              {form.buttonText || "CADASTRE-SE"}
            </Button>
            <p class="text-small text-red">{errorMessage.value}</p>
          </form>
          <div class="col-span-1 hidden desktop:flex"></div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
