import app from './app.ts';
import { APP_HOST, APP_PORT } from './environment.ts';

console.log(`Listening on port: ${APP_PORT}...`);

app.listen(`${APP_HOST}:${APP_PORT}`);
