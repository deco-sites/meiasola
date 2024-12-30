import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import { useScript } from "@deco/deco/hooks";
import { Context } from "@deco/deco";
import Theme from "$store/sections/Theme/Theme.tsx";

const serviceWorkerScript = () =>
  addEventListener(
    "load",
    () =>
      navigator &&
      navigator.serviceWorker &&
      navigator.serviceWorker.register("/sw.js")
  );
export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();
  return (
    <>
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <style
          dangerouslySetInnerHTML={{
            __html: `@view-transition { navigation: auto; }`,
          }}
        />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />

        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NJRC6Q2');`,
          }}
        />

        <script type="text/javascript" dangerouslySetInnerHTML={{__html:
          `
          (function (srcjs) {
              window._edrone = window._edrone || {};
              _edrone.app_id = '674f57637f948'; // YOUR APP_ID
              _edrone.version = '1.0.0';
              _edrone.platform_version = '1.0.0';
              _edrone.platform = 'custom';
              var doc = document.createElement('script');
              doc.type = 'text/javascript';
              doc.async = true;
              doc.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + srcjs;
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(doc, s);
          })("//d3bo67muzbfgtl.cloudfront.net/edrone_2_0.js?app_id=674f57637f948");

            window._edrone = window._edrone || {};
            let newsletterForm = document.querySelector('#newsletterForm')
            if (newsletterForm) {
              newsletterForm.addEventListener('submit', (event) => {
                event.preventDefault();
                _edrone.customer_tags = 'Footer'; // You can use different tags for different forms.
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const nameInput = newsletterForm.querySelector('input[name="name"]');
                if (emailInput && nameInput) {
                  _edrone.email = emailInput.value;
                  _edrone.first_name = nameInput.value;
                  _edrone.action_type = 'subscribe';
                  _edrone.init();
                }
              });
            }
          `
        }} />

      </Head>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-NJRC6Q2"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      </noscript>

      {/* Rest of Preact tree */}
      <ctx.Component />

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(serviceWorkerScript) }}
      />
    </>
  );
});
