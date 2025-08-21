import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";
import { throttle } from "site/sdk/helpers/throttle.ts";

export function useInfiniteScroll({
  hasMore,
  loading,
  onLoadMore,
  targetSelector,
  offset = 300,
}: {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  targetSelector: string;
  offset?: number;
}) {
  useEffect(() => {
    if (!IS_BROWSER || !hasMore || loading) return;

    const target = document.querySelector(targetSelector);
    if (!target) return;

    const handleScroll = () => {
      const rect = target.getBoundingClientRect();
      const windowHeight = globalThis.innerHeight;

      // quando o fim do elemento estiver "offset" px visível na tela
      if (rect.bottom - windowHeight < offset) {
        onLoadMore();
      }
    };

    const throttledScroll = throttle(handleScroll, 200);
    globalThis.addEventListener("scroll", throttledScroll);

    return () => {
      globalThis.removeEventListener("scroll", throttledScroll);
    };
  }, [hasMore, loading, targetSelector, offset]);
}
