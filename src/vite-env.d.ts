/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_SERVER_URL: string;
  VITE_CHANGELOG_URL: string;
  PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
