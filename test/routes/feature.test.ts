import app from '../../src/app.ts';
import { assert, assertFalse, assertObjectMatch, Client, superoak } from '../deps.ts';

const testBody = (fn: (t: Deno.TestContext) => void | Promise<void>) => {
  return async (t: Deno.TestContext) => {
    await fn(t);
    Client.forget('FEATURE_NAME');
  }
};

Deno.test({
  name: 'Feature route - it should return true for enabled feature',
  fn: testBody(async () => {
    Client.assume('FEATURE_NAME').true();

    const request = await superoak(app);
    const response = await request.post('/')
      .send({ feature: 'FEATURE_NAME' })
      .expect(200);

    assert(response.body.status);
  }),
});

Deno.test({
  name: 'Feature route - it should return true for enabled feature - with parameters',
  fn: testBody(async () => {
    Client.assume('FEATURE_NAME').false();

    const request = await superoak(app);
    const response = await request.post('/')
      .send({ feature: 'FEATURE_NAME', parameters: { value: 'VALUE' } })
      .expect(200);

    assertFalse(response.body.status);
  }),
});

Deno.test({
  name: 'Feature route - it should return error - cannot access API',
  fn: testBody(async () => {
    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: 'FEATURE_NAME' })
      .expect(500);

    assert(res.body.error, 'Something went wrong: {"error":"Unable to load a key FEATURE_NAME"}');
  }),
});

Deno.test({
  name: 'Feature route - it should return error - body request not provided',
  fn: testBody(async () => {
    const request = await superoak(app);
    const res = await request.post('/')
      .send()
      .expect(422);

    assertObjectMatch(res.body, { error: 'Invalid request body' });
  }),
});

Deno.test({
  name: 'Feature route - it should return error - feature name not provided',
  fn: testBody(async () => {
    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: '' })
      .expect(422);

    assertObjectMatch(res.body, { error: 'Invalid feature input. Cause: it is required.' });
  }),
});

Deno.test({
  name: 'Feature route - it should return error - parameters has invalid length',
  fn: testBody(async () => {
    const request = await superoak(app);
    const res = await request.post('/')
      .send({ feature: 'FEATURE_NAME', parameters: { value: 'VALUE'.repeat(100) } })
      .expect(422);

    assertObjectMatch(res.body, {
      error: 'Invalid parameters.value input. Cause: it exceeds the maximum length of 100.',
    });
  }),
});
