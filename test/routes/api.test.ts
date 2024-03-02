import app from '../../src/app.ts';
import { assert, assertEquals, superoak } from '../deps.ts';

Deno.test({
  name: 'API route - it should return ok',
  async fn() {
    const request = await superoak(app);
    const response = await request.get('/api/check').expect(200);

    assertEquals(response.body, {
      status: 'ok',
      releaseTime: 'today',
      sslEnabled: false,
      rateLimit: {
        max: '100',
        window: '3000',
      },
      switcherSettings: {
        url: 'https://api.switcherapi.com',
        environment: 'test',
        offline: 'true',
        snapshotAutoLoad: 'false',
        snapshotUpdateInterval: 'not set',
      },
    });
  },
});

Deno.test({
  name: 'API route - it should return ok - release time',
  async fn() {
    //given
    Deno.env.set('RELEASE_TIME', 'tomorow');

    //test
    const request = await superoak(app);
    const response = await request.get('/api/check').expect(200);

    assertEquals(response.body.releaseTime, 'tomorow');
  },
});

Deno.test({
  name: 'API route - it should return ok - ssl enabled',
  async fn() {
    //given
    Deno.env.set('SSL_CERT', 'cert');
    Deno.env.set('SSL_KEY', 'key');

    //test
    const request = await superoak(app);
    const response = await request.get('/api/check').expect(200);

    assert(response.body.sslEnabled);
  },
});
