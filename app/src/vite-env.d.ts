/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PROJECT_URL: string;
  readonly VITE_SUPABASE_ANON_API_KEY: string;
  readonly VITE_SUPABASE_SERVICE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
