import { Product } from "apps/commerce/types.ts";

import ProductCard from "$store/components/product/ProductCard.tsx";

export interface Columns {
  mobile?: number;
  desktop?: number;
}

export interface Props {
  products: Product[] | null;
}

function ProductGallery({ products }: Props) {
  return (
    <div class="grid grid-cols-4 grid-rows-3 gap-x-0.5 gap-y-10 h-fit">
      {products?.map((product, index) => (
        <div class="flex col-span-1 h-[378px]">
          <ProductCard
            product={product}
            preload={index === 0}
          />
        </div>
      ))}
    </div>
  );
}

export default ProductGallery;
