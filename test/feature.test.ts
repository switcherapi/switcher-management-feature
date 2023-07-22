import app from '../src/app.ts';
import { assert, assertFalse, superoak, Switcher } from './deps.ts';

const testTitle = (description: string) => `Feature route - ${description}`;

Deno.test({
  name: testTitle('it should return true for enabled feature'),
  async fn() {
    Switcher.assume('FEATURE_NAME').true();

    const request = await superoak(app);
    const response = await request.post('/')
      .send({ feature: 'FEATURE_NAME' })
      .expect(200);

    assert(response.body.status);
  },
});

Deno.test({
  name: testTitle('it should return true for enabled feature - with params'),
  async fn() {
    Switcher.assume('FEATURE_NAME').false();

    const request = await superoak(app);
    const response = await request.post('/')
      .send({ feature: 'FEATURE_NAME', params: { value: 'VALUE' } })
      .expect(200);

    assertFalse(response.body.status);
  },
});

Deno.test({
  name: testTitle('it should return error'),
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    await request.post('/')
      .send({ feature: 'FEATURE_NAME' })
      .expect(500);
  },
});
