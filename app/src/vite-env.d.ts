/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PROJECT_URL: string;
  readonly VITE_SUPABASE_ANON_API_KEY: string;
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
