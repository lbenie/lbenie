/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@types/node" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
