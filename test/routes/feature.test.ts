import app from '../../src/app.ts';
import { assert, assertFalse, assertObjectMatch, superoak, Switcher } from '../deps.ts';

Deno.test({
  name: 'Feature route - it should return true for enabled feature',
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
  name: 'Feature route - it should return true for enabled feature - with parameters',
  async fn() {
    Switcher.assume('FEATURE_NAME').false();

    const request = await superoak(app);
    const response = await request.post('/')
      .send({ feature: 'FEATURE_NAME', parameters: { value: 'VALUE' } })
      .expect(200);

    assertFalse(response.body.status);
  },
});

Deno.test({
  name: 'it should return error - cannot access API',
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
  name: 'Feature route - it should return error - body request not provided',
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    const res = await request.post('/')
      .send()
      .expect(422);

    assertObjectMatch(res.body, { error: 'Invalid request body' });
  },
});

Deno.test({
  name: 'Feature route - it should return error - feature name not provided',
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: '' })
      .expect(422);

    assertObjectMatch(res.body, { error: 'Invalid feature input. Cause: it is required.' });
  },
});

Deno.test({
  name: 'Feature route - it should return error - parameters has invalid length',
  async fn() {
    Switcher.forget('FEATURE_NAME');

    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: 'FEATURE_NAME', parameters: { value: 'VALUE'.repeat(100) } })
      .expect(422);

    assertObjectMatch(res.body, {
      error: 'Invalid parameters.value input. Cause: it exceeds the maximum length of 100.',
    });
  },
});
