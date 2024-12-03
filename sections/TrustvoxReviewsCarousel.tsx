export interface Props {
  title?: string;
  subTitle?: string;
  centerTitle?: boolean;
}

export default function TrustvoxReviewsCarousel({
  title,
  subTitle,
  centerTitle,
}: Props) {
  return (
    <>
      <script
        type="text/javascript"
        src="//colt.trustvox.com.br/colt.min.js"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            var _trustvox_colt = _trustvox_colt || [];
            _trustvox_colt.push(['_storeId', '123680'], ['_limit', '7']);
          `,
        }}
      ></script>

      <div class="container text-black flex flex-col gap-6 py-6">
        {title && (
          <div
            class={`flex flex-col tablet:flex-row tablet:items-end gap-4 ${
              centerTitle ? "tablet:justify-center" : ""
            }`}
          >
            <h3 class="font-bold text-subtitle tracking-widest">{title}</h3>
            <p class="text-small">{subTitle}</p>
          </div>
        )}
        <div id="_trustvox_colt"></div>
      </div>
    </>
  );
}
