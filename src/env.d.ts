/// <reference types="astro/client" />
/// <reference types="astro/astro-jsx" />

declare namespace JSX {
  interface IntrinsicElements extends astroHTML.JSX.IntrinsicElements {}
}
