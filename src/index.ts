import app from './app.ts';
import { APP_PORT, SSL_CERT, SSL_KEY } from './environment.ts';

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
