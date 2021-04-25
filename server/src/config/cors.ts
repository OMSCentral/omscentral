export interface CORSConfig {
  allowlist: string[];
}

export const config: CORSConfig = {
  allowlist: (process.env.OMSCENTRAL_CORS_ALLOWLIST || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
