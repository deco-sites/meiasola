import { Head } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { Manifest } from "apps/website/manifest.gen.ts";
import { getOptimizedMediaUrl } from "apps/website/components/Image.tsx";

export const PATH: `/live/invoke/${keyof Manifest["loaders"]}` =
  "/live/invoke/website/loaders/image.ts";
export type Props =
  & Omit<
    JSX.IntrinsicElements["img"],
    "width" | "height" | "preload"
  >
  & {
    src: string;
    /** @description Improves Web Vitals (CLS|LCP) */
    width: number;
    /** @description Improves Web Vitals (CLS|LCP) */
    height?: number;
    /** @description Web Vitals (LCP). Adds a link[rel="preload"] tag in head. Use one preload per page for better performance */
    preload?: boolean;
    /** @description Improves Web Vitals (LCP). Use high for LCP image. Auto for other images */
    fetchPriority?: "high" | "low" | "auto";
    /** @description Object-fit */
    fit?: FitOptions;
  };

const FACTORS = [1, 2];

type FitOptions = "contain" | "cover";

interface OptimizationOptions {
  originalSrc: string;
  width: number;
  height?: number;
  factor: number;
  fit: FitOptions;
}


const optimizeVTEX = (opts: OptimizationOptions) => {
  const { originalSrc, width, height } = opts;

  const src = new URL(originalSrc);

  const [slash, arquivos, ids, rawId, ...rest] = src.pathname.split("/");
  const [trueId, _w, _h] = rawId.split("-");

  src.pathname = [
    slash,
    arquivos,
    ids,
    `${trueId}-${width}-${height}`,
    ...rest,
  ].join("/");

  return src.href;
};


export const getSrcSet = (
  src: string,
  width: number,
  height?: number,
  fit?: FitOptions,
) =>
  FACTORS.map(
    (factor) =>
      `${
        getOptimizedMediaUrl({
          originalSrc: src,
          width,
          height,
          factor,
          fit: fit ?? "cover",
        })
      } ${Math.trunc(factor * width)}w`,
  ).join(", ");

const Image = forwardRef<HTMLImageElement, Props>((props, ref) => {
  const { preload, loading = "lazy" } = props;

  if (!props.height) {
    console.warn(
      `Missing height. This image will NOT be optimized: ${props.src}`,
    );
  }

  const srcSet = getSrcSet(props.src, props.width, props.height, props.fit);
  const linkProps = {
    imagesrcset: srcSet,
    imagesizes: props.sizes,
    fetchpriority: props.fetchPriority,
    media: props.media,
  };

  return (
    <>
      {preload && (
        <Head>
          <link as="image" rel="preload" href={props.src} {...linkProps} />
        </Head>
      )}
      <img
        {...props}
        preload={undefined}
        src={props.src}
        srcSet={srcSet}
        loading={loading}
        ref={ref}
      />
    </>
  );
});

export default Image;
