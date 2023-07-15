import { load } from './deps.ts';

await load({ export: true });

const env = Deno.env;

export const APP_PORT = env.get('APP_PORT') || 4000;
export const SSL_CERT = env.get('SSL_CERT');
export const SSL_KEY = env.get('SSL_KEY');
