import app from '../../src/app.ts';
import { assertObjectMatch, Client, StrategiesType, superoak } from '../deps.ts';

const testBody = (fn: (t: Deno.TestContext) => void | Promise<void>) => {
  return async (t: Deno.TestContext) => {
    await fn(t);
    Client.forget('FEATURE_1');
    Client.forget('FEATURE_2');
  };
};

Deno.test({
  name: 'Feature Group route - it should return feature statuses',
  fn: testBody(async () => {
    Client.assume('FEATURE_1').true().when(StrategiesType.VALUE, 'VALUE');
    Client.assume('FEATURE_2').false();

    const request = await superoak(app);
    const response = await request.post('/group')
      .send({
        features: [
          { feature: 'FEATURE_1', parameters: { value: 'VALUE' } },
          { feature: 'FEATURE_2' },
        ],
      }).expect(200);

    assertObjectMatch(response.body, {
      features: [
        { feature: 'FEATURE_1', status: true },
        { feature: 'FEATURE_2', status: false },
      ],
    });
  }),
});

Deno.test({
  name: 'Feature Group route - it should return 422 when validation fails - feature name too short',
  fn: testBody(async () => {
    const request = await superoak(app);
    await request.post('/group')
      .send({
        features: [
          { feature: 'F' },
          { feature: 'FEATURE_2' },
        ],
      }).expect(422);
  }),
});

Deno.test({
  name: 'Feature Group route - it should return 422 when validation fails - no features provided',
  fn: testBody(async () => {
    const request = await superoak(app);
    await request.post('/group')
      .send({
        features: [],
      }).expect(422);
  }),
});

Deno.test({
  name: 'Feature Group route - it should return 422 when validation fails - parameters value too long',
  fn: testBody(async () => {
    const request = await superoak(app);
    await request.post('/group')
      .send({
        features: [
          {
            feature: 'FEATURE_1',
            parameters: { value: 'VALUE'.repeat(100) },
          },
        ],
      }).expect(422);
  }),
});

Deno.test({
  name: 'Feature Group route - it should return 500 when an error occurs',
  fn: testBody(async () => {
    const request = await superoak(app);
    await request.post('/group')
      .send({
        features: [
          { feature: 'FEATURE_1' },
          { feature: 'FEATURE_2' },
        ],
      }).expect(500);
  }),
});
