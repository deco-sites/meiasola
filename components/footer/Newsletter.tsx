import { useSignal } from "@preact/signals";
import { Runtime } from "$store/runtime.ts";
import type { JSX } from "preact";

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

function Newsletter(
  { title, description, form }: Props,
) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await Runtime.vtex.actions.newsletter.subscribe({ name, email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <>
      {/* MOBILE VERSION */}
      <div class="block tablet:hidden bg-[#F3F3F3] py-6">
        <div class="container flex flex-col gap-6">
          <div class="flex flex-col gap-3">
            <h3 class="font-bold text-subtitle">
              {title}
            </h3>
            <p class="text-body">{description}</p>
          </div>
          <form
            class="w-full form-control gap-3.5"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body"
              placeholder={form.name_placeholder || "Nome"}
            />
            <input
              name="email"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body"
              placeholder={form.email_placeholder || "E-mail"}
            />
            <button
              type="submit"
              class="h-10 w-full bg-black text-white text-body disabled:loading"
              disabled={loading}
            >
              {form.buttonText || "CADASTRE-SE"}
            </button>
          </form>
        </div>
      </div>

      {/* DESKTOP VERSION */}
      <div class="hidden tablet:block bg-[#F3F3F3] py-9">
        <div class="container grid grid-cols-12 gap-4 desktop:gap-5">
          <div class="col-span-1 hidden desktop:flex"></div>
          <div class="col-span-6 desktop:col-span-5 flex flex-col justify-center gap-5">
            <h3 class="font-medium text-h3">
              {title}
            </h3>
            <p class="text-body">{description}</p>
          </div>
          <div class="col-span-1 flex"></div>
          <form
            class="col-span-5 desktop:col-span-4 w-full form-control justify-center gap-3.5"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body"
              placeholder={form.name_placeholder || "Nome"}
            />
            <input
              name="email"
              class="h-8 w-full px-2.5 bg-white placeholder:grey-2 placeholder:text-body"
              placeholder={form.email_placeholder || "E-mail"}
            />
            <button
              type="submit"
              class="h-10 w-full bg-black text-white text-body disabled:loading"
              disabled={loading}
            >
              {form.buttonText || "CADASTRE-SE"}
            </button>
          </form>
          <div class="col-span-1 hidden desktop:flex"></div>
        </div>
      </div>
    </>
  );
}

export default Newsletter;
