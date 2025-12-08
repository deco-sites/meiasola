import { Head, IS_BROWSER } from "$fresh/runtime.ts";
import type { JSX } from "preact";
import { forwardRef } from "preact/compat";
import { Manifest } from "apps/website/manifest.gen.ts";

export const PATH: `/live/invoke/${keyof Manifest["loaders"]}` =
  "/live/invoke/website/loaders/image.ts";
const DECO_CACHE_URL = "https://assets.decocache.com/";
const S3_URL = "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/";

const isAzionAssetsEnabled = () =>
  IS_BROWSER
    // deno-lint-ignore no-explicit-any
    ? (globalThis as any).DECO?.featureFlags?.azionAssets
    : Deno.env.get("ENABLE_AZION_ASSETS") !== "false";

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


export const getOptimizedMediaUrl = (opts: OptimizationOptions) => {
  const { originalSrc, width, height, factor, fit } = opts;

  if (
    /(vteximg.com.br|vtexassets.com|myvtex.com)\/arquivos\/ids\/\d+/.test(
      originalSrc,
    )
  ) {
    return optimizeVTEX(opts);
  }
  const params = new URLSearchParams();

  params.set("fit", fit);
  params.set("width", `${Math.trunc(factor * width)}`);
  height && params.set("height", `${Math.trunc(factor * height)}`);

  if (isAzionAssetsEnabled()) {
    const imageSource = originalSrc
      .replace(DECO_CACHE_URL, "")
      .replace(
        S3_URL,
        "",
      )
      .split("?")[0];
    // src is being passed separately to avoid URL encoding issues
    return `https://deco-assets.decoazn.com/image?${params}&src=${imageSource}`;
  }

  params.set("src", originalSrc);

  return `${PATH}?${params}`;
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
          fit,
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
