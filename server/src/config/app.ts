import { root } from '../constants';

export type Environment = 'local' | 'test' | 'production';

export interface AppConfig {
  release: string;
  environment: Environment;
  name: string;
  port: number;
  rateLimit: boolean;
}

export const config: AppConfig = {
  // eslint-disable-next-line security/detect-non-literal-require
  release: require(`${root}/package.json`).version,
  environment: process.env.NODE_ENV as Environment,
  name: process.env.OMSCENTRAL_NAME || '',
  port: Number(process.env.PORT) || 8080,
  rateLimit: process.env.OMSCENTRAL_DISABLE_RATE_LIMIT !== 'true',
};

if (!config.environment) {
  throw new Error('process.env.NODE_ENV required');
}
