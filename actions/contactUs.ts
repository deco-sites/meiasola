import { AppContext } from "apps/vtex/mod.ts";
import { fetchAPI } from "apps/utils/fetch.ts";

export interface Props {
  name: string;
  email: string;
  phone: string;
  message: string;
  //   sendgridEmail: string;
  // sendgrid_token: string;
}

/**
 * @docs https://developers.vtex.com/docs/api-reference/checkout-api#post-/api/checkout/pub/orderForm/-orderFormId-/items
 */
const action = async (
  props: Props,
  _req: Request,
  ctx: AppContext
): Promise<void> => {
  console.log("oi");

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

  const response = await fetchAPI("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer SG.98i_qK1EQxaZV1O08ALx9w._u918R2S0O80TUQ-ujxO04-208PSSc908Gq3fJr2jIM`,
    },
    body: JSON.stringify(body),
  });

  console.log(response);

  return response.json();
};

export default action;
