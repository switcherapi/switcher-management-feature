import FeatureService from '../../src/services/feature.ts';
import { assert, assertFalse, Client, StrategiesType } from '../deps.ts';

const featureService = new FeatureService();

const setupDenoEnv = async (local: boolean, interval: string = '') => {
  Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
  Deno.env.set('SWITCHER_LOCAL', String(local));
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', interval);
  await import('../../src/app.ts');
};

const tearDown = () => {
  Client.terminateSnapshotAutoUpdate();
};

const testBody = (fn: (t: Deno.TestContext) => void | Promise<void>) => {
  return async (t: Deno.TestContext) => {
    await setupDenoEnv(true);
    await fn(t);
    tearDown();
  };
};

const testParameters = [{
  when: StrategiesType.VALUE,
  field: 'value',
  value: 'value',
}, {
  when: StrategiesType.NUMERIC,
  field: 'number',
  value: '123',
}, {
  when: StrategiesType.DATE,
  field: 'date',
  value: '2023-10-01',
}, {
  when: StrategiesType.TIME,
  field: 'time',
  value: '12:00',
}, {
  when: StrategiesType.PAYLOAD,
  field: 'payload',
  value: '{"key":"value"}',
}, {
  when: StrategiesType.REGEX,
  field: 'regex',
  value: '^test$',
}, {
  when: StrategiesType.NETWORK,
  field: 'network',
  value: '198.168.0.1',
}];

Deno.test({
  name: 'Feature service - it should return feature disabled',
  fn: testBody(async () => {
    //given
    Client.assume('FEATURE_NAME').false();
    const featureName = 'FEATURE_NAME';

    //test
    const response = await featureService.isFeatureEnabled({ feature: featureName });

    //assert
    assertFalse(response);
  }),
});

Deno.test({
  name: 'Feature service - it should return feature enabled (parameterized)',
  fn: testBody(async () => {
    for (const param of testParameters) {
      //given
      Client.assume('FEATURE_NAME').true().when(param.when, param.value);
      const featureName = 'FEATURE_NAME';

      //test
      const response = await featureService.isFeatureEnabled({
        feature: featureName,
        parameters: { [param.field]: param.value },
      });

      //assert
      assert(response, `Feature should be enabled for ${param.when} with value ${param.value}`);
    }
  }),
});
