import app from './app.ts';
import { load } from './deps.ts';

await load({ export: true, envPath: Deno.env.get('ENV_PATH') || '.env' });

const APP_PORT = Deno.env.get('APP_PORT') || 4000;
const SSL_CERT = Deno.env.get('SSL_CERT');
const SSL_KEY = Deno.env.get('SSL_KEY');

const createServer = () => {
  if (SSL_CERT && SSL_KEY) {
    console.log(`SSL enabled - Listening on: ${APP_PORT}`);
    app.listen({
      port: Number(APP_PORT),
      secure: true,
      key: Deno.readTextFileSync(SSL_KEY),
      cert: Deno.readTextFileSync(SSL_CERT),
    });
  } else {
    console.log(`SSL disabled - Listening on: ${APP_PORT}`);
    app.listen({ port: Number(APP_PORT) });
  }
};

createServer();
