import { Filter, ProductListingPage } from "apps/commerce/types.ts";
import { ExtensionOf } from "apps/website/loaders/extension.ts";
import { AppContext } from "apps/vtex/mod.ts";

/**
 * @title Meia Sola - Extra Info
 * @description Add extra data to your loader. This may harm performance
 */
const loader =
  (
    props: undefined,
    req: Request,
    ctx: AppContext
  ): ExtensionOf<ProductListingPage | null> =>
  (page: ProductListingPage | null) => {
    if (page == null) {
      return page;
    }

    const { url: baseUrl } = req;
    const url = new URL(baseUrl);

    let filters = page.filters;
    if (url.pathname.includes("/bolsas")) {
      filters = page.filters.filter((filter) => filter.key !== "tamanho");
    }

    const filtersWithOutColors = filters.filter(
      (filter) => filter.key !== "cor"
    );

    const productColors: string[] = [];

    page.products.forEach((product) => {
      (product.isVariantOf?.hasVariant ?? []).forEach((variant) => {
        const color = variant.additionalProperty?.find(
          (property) => property.name === "Cor"
        )?.value;

        if (color) productColors.push(color);
      });
    });

    const comingColorFilters = page.filters.find(
      (filter) => filter.key === "cor"
    );

    const filteredColorsFilters: Filter = {
      "@type": "FilterToggle",
      key: "cor",
      label: "Cor",
      quantity: 0,
      values: [],
    };

    if (comingColorFilters) {
      const filteredValues = comingColorFilters.values.filter((option) =>
        productColors.includes(option.label)
      );

      filteredColorsFilters.quantity = filteredValues.length;
      filteredColorsFilters.values = filteredValues;
    }

    const finalFilters =
      page.filters.length === 0
        ? allFilters
        : [
            ...filtersWithOutColors,
            // filteredColorsFilters
          ];

    return {
      ...page,
      filters: finalFilters,
      search: {
        term: url.searchParams.get("q"),
        url,
      },
    };
  };

export default loader;

export const allFilters = [
  {
    "@type": "FilterToggle",
    key: "category-1",
    label: "Departamento",
    quantity: 5,
    values: [
      {
        value: "sapatos",
        showQuantity: false,
        quantity: 2664,
        selected: false,
        url: "?filter.category-1=sapatos",
        label: "Sapatos",
      },
      {
        value: "bolsas",
        showQuantity: false,
        quantity: 1340,
        selected: false,
        url: "?filter.category-1=bolsas",
        label: "Bolsas",
      },
      {
        value: "acessorios",
        showQuantity: false,
        quantity: 115,
        selected: false,
        url: "?filter.category-1=acessorios",
        label: "Acessórios",
      },
      {
        value: "infantil",
        showQuantity: false,
        quantity: 27,
        selected: false,
        url: "?filter.category-1=infantil",
        label: "Infantil",
      },
      {
        value: "vestuario",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.category-1=vestuario",
        label: "Vestuário",
      },
    ],
  },
  {
    "@type": "FilterToggle",
    key: "category-2",
    label: "Categoria",
    quantity: 31,
    values: [
      {
        value: "rasteira",
        showQuantity: false,
        quantity: 881,
        selected: false,
        url: "?filter.category-2=rasteira",
        label: "Rasteira",
      },
      {
        value: "sandalia",
        showQuantity: false,
        quantity: 784,
        selected: false,
        url: "?filter.category-2=sandalia",
        label: "Sandalia",
      },
      {
        value: "tiracolo",
        showQuantity: false,
        quantity: 616,
        selected: false,
        url: "?filter.category-2=tiracolo",
        label: "Tiracolo",
      },
      {
        value: "tote",
        showQuantity: false,
        quantity: 323,
        selected: false,
        url: "?filter.category-2=tote",
        label: "Tote",
      },
      {
        value: "tenis",
        showQuantity: false,
        quantity: 199,
        selected: false,
        url: "?filter.category-2=tenis",
        label: "Tênis",
      },
      {
        value: "shopping",
        showQuantity: false,
        quantity: 158,
        selected: false,
        url: "?filter.category-2=shopping",
        label: "Shopping",
      },
      {
        value: "scarpin",
        showQuantity: false,
        quantity: 144,
        selected: false,
        url: "?filter.category-2=scarpin",
        label: "Scarpin",
      },
      {
        value: "salto-bloco",
        showQuantity: false,
        quantity: 122,
        selected: false,
        url: "?filter.category-2=salto-bloco",
        label: "Salto Bloco",
      },
      {
        value: "sapatilha",
        showQuantity: false,
        quantity: 120,
        selected: false,
        url: "?filter.category-2=sapatilha",
        label: "Sapatilha",
      },
      {
        value: "salto-medio",
        showQuantity: false,
        quantity: 95,
        selected: false,
        url: "?filter.category-2=salto-medio",
        label: "Salto Médio",
      },
      {
        value: "bota",
        showQuantity: false,
        quantity: 93,
        selected: false,
        url: "?filter.category-2=bota",
        label: "Bota",
      },
      {
        value: "mule",
        showQuantity: false,
        quantity: 73,
        selected: false,
        url: "?filter.category-2=mule",
        label: "Mule",
      },
      {
        value: "hobo",
        showQuantity: false,
        quantity: 72,
        selected: false,
        url: "?filter.category-2=hobo",
        label: "Hobo",
      },
      {
        value: "mocassim",
        showQuantity: false,
        quantity: 68,
        selected: false,
        url: "?filter.category-2=mocassim",
        label: "Mocassim",
      },
      {
        value: "clutch",
        showQuantity: false,
        quantity: 46,
        selected: false,
        url: "?filter.category-2=clutch",
        label: "Clutch",
      },
      {
        value: "sandalia-salto-baixo",
        showQuantity: false,
        quantity: 42,
        selected: false,
        url: "?filter.category-2=sandalia-salto-baixo",
        label: "Sandalia Salto Baixo",
      },
      {
        value: "mochila",
        showQuantity: false,
        quantity: 31,
        selected: false,
        url: "?filter.category-2=mochila",
        label: "Mochila",
      },
      {
        value: "bowling",
        showQuantity: false,
        quantity: 29,
        selected: false,
        url: "?filter.category-2=bowling",
        label: "Bowling",
      },
      {
        value: "crossbody",
        showQuantity: false,
        quantity: 24,
        selected: false,
        url: "?filter.category-2=crossbody",
        label: "Crossbody",
      },
      {
        value: "bucket",
        showQuantity: false,
        quantity: 17,
        selected: false,
        url: "?filter.category-2=bucket",
        label: "Bucket",
      },
      {
        value: "plataforma",
        showQuantity: false,
        quantity: 15,
        selected: false,
        url: "?filter.category-2=plataforma",
        label: "Plataforma",
      },
      {
        value: "mala",
        showQuantity: false,
        quantity: 11,
        selected: false,
        url: "?filter.category-2=mala",
        label: "Mala",
      },
      {
        value: "papete",
        showQuantity: false,
        quantity: 10,
        selected: false,
        url: "?filter.category-2=papete",
        label: "Papete",
      },
      {
        value: "satchel",
        showQuantity: false,
        quantity: 6,
        selected: false,
        url: "?filter.category-2=satchel",
        label: "Satchel",
      },
      {
        value: "sapatilha-bico-redondo",
        showQuantity: false,
        quantity: 5,
        selected: false,
        url: "?filter.category-2=sapatilha-bico-redondo",
        label: "Sapatilha Bico Redondo",
      },
      {
        value: "sapatilha-bico-fino",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.category-2=sapatilha-bico-fino",
        label: "Sapatilha Bico Fino",
      },
      {
        value: "mule-fechada",
        showQuantity: false,
        quantity: 3,
        selected: false,
        url: "?filter.category-2=mule-fechada",
        label: "Mule Fechada",
      },
      {
        value: "scarpins",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.category-2=scarpins",
        label: "Scarpins",
      },
      {
        value: "chinelo",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.category-2=chinelo",
        label: "CHINELO",
      },
      {
        value: "anabela",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.category-2=anabela",
        label: "Anabela",
      },
      {
        value: "pochete",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.category-2=pochete",
        label: "Pochete",
      },
    ],
  },
  {
    "@type": "FilterToggle",
    key: "price",
    label: "Preço",
    quantity: 3,
    values: [
      {
        value: "27.96:300",
        showQuantity: false,
        quantity: 1490,
        selected: false,
        url: "?filter.price=27.96%3A300",
        label: "27.96:300",
      },
      {
        value: "550:3499",
        showQuantity: false,
        quantity: 1332,
        selected: false,
        url: "?filter.price=550%3A3499",
        label: "550:3499",
      },
      {
        value: "300:550",
        showQuantity: false,
        quantity: 1182,
        selected: false,
        url: "?filter.price=300%3A550",
        label: "300:550",
      },
    ],
  },
  {
    "@type": "FilterToggle",
    key: "brand",
    label: "Marca",
    quantity: 31,
    values: [
      {
        value: "arezzo",
        showQuantity: false,
        quantity: 1637,
        selected: false,
        url: "?filter.brand=arezzo",
        label: "Arezzo",
      },
      {
        value: "schutz",
        showQuantity: false,
        quantity: 613,
        selected: false,
        url: "?filter.brand=schutz",
        label: "Schutz",
      },
      {
        value: "anacapri",
        showQuantity: false,
        quantity: 553,
        selected: false,
        url: "?filter.brand=anacapri",
        label: "Anacapri",
      },
      {
        value: "brizza",
        showQuantity: false,
        quantity: 247,
        selected: false,
        url: "?filter.brand=brizza",
        label: "Brizza",
      },
      {
        value: "vicenza",
        showQuantity: false,
        quantity: 236,
        selected: false,
        url: "?filter.brand=vicenza",
        label: "Vicenza",
      },
      {
        value: "luiza-barcelos",
        showQuantity: false,
        quantity: 166,
        selected: false,
        url: "?filter.brand=luiza-barcelos",
        label: "Luiza Barcelos",
      },
      {
        value: "luz-da-lua",
        showQuantity: false,
        quantity: 153,
        selected: false,
        url: "?filter.brand=luz-da-lua",
        label: "Luz da lua",
      },
      {
        value: "lanca-perfume",
        showQuantity: false,
        quantity: 133,
        selected: false,
        url: "?filter.brand=lanca-perfume",
        label: "Lança Perfume",
      },
      {
        value: "alexandre-birman",
        showQuantity: false,
        quantity: 78,
        selected: false,
        url: "?filter.brand=alexandre-birman",
        label: "Alexandre Birman",
      },
      {
        value: "m-s",
        showQuantity: false,
        quantity: 72,
        selected: false,
        url: "?filter.brand=m-s",
        label: "M/s",
      },
      {
        value: "my-favorite-things",
        showQuantity: false,
        quantity: 21,
        selected: false,
        url: "?filter.brand=my-favorite-things",
        label: "My Favorite Things",
      },
      {
        value: "follis",
        showQuantity: false,
        quantity: 17,
        selected: false,
        url: "?filter.brand=follis",
        label: "Follis",
      },
      {
        value: "isla",
        showQuantity: false,
        quantity: 16,
        selected: false,
        url: "?filter.brand=isla",
        label: "Isla",
      },
      {
        value: "anna-barroso",
        showQuantity: false,
        quantity: 14,
        selected: false,
        url: "?filter.brand=anna-barroso",
        label: "Anna Barroso",
      },
      {
        value: "guilhermina",
        showQuantity: false,
        quantity: 7,
        selected: false,
        url: "?filter.brand=guilhermina",
        label: "Guilhermina",
      },
      {
        value: "lorraci",
        showQuantity: false,
        quantity: 6,
        selected: false,
        url: "?filter.brand=lorraci",
        label: "Lorraci",
      },
      {
        value: "dl-store",
        showQuantity: false,
        quantity: 5,
        selected: false,
        url: "?filter.brand=dl-store",
        label: "Dl Store",
      },
      {
        value: "wai-wai",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.brand=wai-wai",
        label: "Wai Wai",
      },
      {
        value: "serpui",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.brand=serpui",
        label: "Serpui",
      },
      {
        value: "paula-bahia",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.brand=paula-bahia",
        label: "Paula Bahia",
      },
      {
        value: "carmem-dalessandro",
        showQuantity: false,
        quantity: 4,
        selected: false,
        url: "?filter.brand=carmem-dalessandro",
        label: "Carmem Dalessandro",
      },
      {
        value: "sport-easy",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.brand=sport-easy",
        label: "Sport Easy",
      },
      {
        value: "my-shoes",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.brand=my-shoes",
        label: "My Shoes",
      },
      {
        value: "lenny",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.brand=lenny",
        label: "LENNY",
      },
      {
        value: "la-spezia",
        showQuantity: false,
        quantity: 2,
        selected: false,
        url: "?filter.brand=la-spezia",
        label: "La spezia",
      },
      {
        value: "teneda",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=teneda",
        label: "Teneda",
      },
      {
        value: "faccine",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=faccine",
        label: "FACCINE",
      },
      {
        value: "emporio-mp",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=emporio-mp",
        label: "Emporio Mp",
      },
      {
        value: "elisa-atheniense",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=elisa-atheniense",
        label: "Elisa atheniense",
      },
      {
        value: "donna-lu",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=donna-lu",
        label: "Donna Lu",
      },
      {
        value: "confraria",
        showQuantity: false,
        quantity: 1,
        selected: false,
        url: "?filter.brand=confraria",
        label: "Confraria",
      },
    ],
  },
];