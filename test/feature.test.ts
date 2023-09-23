import app from '../src/app.ts';
import { assert, assertFalse, assertObjectMatch, superoak, Switcher } from './deps.ts';

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
  name: testTitle('it should return error - cannot access API'),
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: 'FEATURE_NAME' })
      .expect(500);

    assert(res.body.error, 'Something went wrong: {"error":"Unable to load a key FEATURE_NAME"}');
  },
});

Deno.test({
  name: testTitle('it should return error - feature not provided'),
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    const res = await request.post('/')
      .send()
      .expect(400);

    assertObjectMatch(res.body, { error: 'Feature name is required' });
  },
});
