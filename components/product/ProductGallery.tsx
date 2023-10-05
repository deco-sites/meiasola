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
    <div class="h-fit grid grid-cols-12 gap-x-4 gap-y-6 laptop:gap-x-0.5 laptop:gap-y-10">
      {products?.map((product, index) => (
        <div class="flex col-span-6 tablet:col-span-4 laptop:col-span-3">
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
