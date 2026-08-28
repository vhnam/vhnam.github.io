/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

declare namespace JSX {
  interface IntrinsicElements extends astroHTML.JSX.IntrinsicElements {}
}

interface ImportMetaEnv {
  readonly SITE_TITLE: string;
  readonly SITE_DESCRIPTION: string;
  readonly SITE_AUTHOR: string;
  readonly GA_MEASUREMENT_ID?: string;
  readonly FB_APP_ID?: string;
}
