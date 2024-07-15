import { type Context, Router } from '../deps.ts';
import { getEnv } from '../utils.ts';

const router = new Router();

router.get('/api/check', ({ response }: Context) => {
  response.status = 200;
  response.body = {
    status: 'ok',
    releaseTime: getEnv('RELEASE_TIME', 'today'),
    sslEnabled: Deno.env.has('SSL_CERT') && Deno.env.has('SSL_KEY'),
    rateLimit: {
      window: getEnv('APP_RATE_LIMIT_WINDOW', 'not set'),
      max: getEnv('APP_RATE_LIMIT', 'not set'),
    },
    switcherSettings: {
      url: getEnv('SWITCHER_URL', 'not set'),
      environment: getEnv('SWITCHER_ENVIRONMENT', 'not set'),
      local: getEnv('SWITCHER_LOCAL', 'not set'),
      snapshotAutoLoad: getEnv('SWITCHER_SNAPSHOT_LOAD', 'not set'),
      snapshotUpdateInterval: getEnv('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', 'not set'),
    },
  };
});

export default router;
