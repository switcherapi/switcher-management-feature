import { Context, Router } from '../deps.ts';

const router = new Router();

router.get('/api/check', ({ response }: Context) => {
  response.status = 200;
  response.body = {
    status: 'ok',
    releaseTime: Deno.env.get('RELEASE_TIME') || 'today',
    sslEnabled: (Deno.env.get('SSL_CERT') && Deno.env.get('SSL_KEY')) ? true : false,
  };
});

export default router;
