import type { ItemAvailability, Product } from "apps/commerce/types.ts";

import { useOffer } from "$store/sdk/useOffer.ts";

export const useVariantPossibilities = (
  { url: productUrl, isVariantOf }: Product,
) => {
  const allProperties = (isVariantOf?.hasVariant ?? [])
    .flatMap(({ additionalProperty = [], url, image, offers }) =>
      additionalProperty.map((property) => ({
        property,
        url,
        image,
        availability: useOffer(offers)?.availability,
      }))
    )
    .filter((x) => x.url)
    .filter((x) => x.property.valueReference === "SPECIFICATION") // Remove this line to allow other than specifications
    .sort((a, b) => a.url! < b.url! ? -1 : a.url === b.url ? 0 : 1);

  const possibilities = allProperties.reduce(
    (acc, { property, url, image, availability }) => {
      const { name = "", value = "" } = property;

      if (!acc[name]) {
        acc[name] = {};
      }

      if (!acc[name][value]) {
        acc[name][value] = [];
      }

      if (url) {
        // prefer current url first to easy selector implementation
        url === productUrl
          ? acc[name][value].unshift({ url, image, availability })
          : acc[name][value].push({ url, image, availability });
      }

      return acc;
    },
    {} as Record<
      string,
      Record<
        string,
        {
          url: string;
          image: Product["image"];
          availability?: ItemAvailability;
        }[]
      >
    >,
  );

  return possibilities;
};
