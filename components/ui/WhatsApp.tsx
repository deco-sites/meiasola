import Icon from "$store/components/ui/Icon.tsx";

export interface Props {
  phone: number;
}

function WhatsApp({ phone }: Props) {
  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-4 right-4 z-40"
      aria-label="Chat on WhatsApp"
    >
      <button
        aria-label="Chat on WhatsApp"
        class="bg-black hover:bg-[#44AD3A] transition-all duration-200 text-white h-[52px] w-[66px] rounded-[24px] flex justify-center items-center"
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Icon id="WhatsApp" class="w-8 h-8" />
      </button>
    </a>
  );
}

export default WhatsApp;
