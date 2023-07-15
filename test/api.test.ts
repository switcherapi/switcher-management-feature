import app from '../src/app.ts';
import { assertEquals, superoak } from './deps.ts';

Deno.test({
  name: 'API Suite - it should return ok',
  async fn() {
    const request = await superoak(app);
    const response = await request.get('/api/check').expect(200);

    assertEquals(response.body, {
      status: 'ok',
      sslEnabled: false,
    });
  },
});

Deno.test({
  name: 'API Suite - it should return ok - ssl enabled',
  async fn(t) {
    await t.step('given - env vars', async () => {
      Deno.env.set('SSL_CERT', 'cert');
      Deno.env.set('SSL_KEY', 'key');
    });

    await t.step('test', async () => {
      const request = await superoak(app);
      const response = await request.get('/api/check').expect(200);

      assertEquals(response.body, {
        status: 'ok',
        sslEnabled: true,
      });
    });
  },
});
