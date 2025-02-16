import FeatureService from '../../src/services/feature.ts';
import { assert, assertFalse, Client, StrategiesType } from '../deps.ts';

const featureService = new FeatureService();

const setupDenoEnv = async (local: boolean, interval: string = '') => {
  Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
  Deno.env.set('SWITCHER_LOCAL', String(local));
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', interval);
  await import('../../src/app.ts');
};

const testBody = (fn: (t: Deno.TestContext) => void | Promise<void>) => {
  return async (t: Deno.TestContext) => {
    await setupDenoEnv(true);
    await fn(t);
  };
};

Deno.test({
  name: 'Feature service - it should return feature disabled',
  fn: testBody(async () => {
    //given
    Client.assume('FEATURE_NAME').false();
    const featureName = 'FEATURE_NAME';

    //test
    featureService.initialize(false);
    const response = await featureService.isFeatureEnabled({ feature: featureName });

    //assert
    assertFalse(response);
    featureService.terminateSnapshotAutoUpdate();
  }),
});

Deno.test({
  name: 'Feature service - it should return feature enabled - with parameters',
  fn: testBody(async () => {
    //given
    Client.assume('FEATURE_NAME').true().when(StrategiesType.VALUE, 'value');
    const featureName = 'FEATURE_NAME';

    //test
    featureService.initialize(false);
    const response = await featureService.isFeatureEnabled({ feature: featureName, parameters: { value: 'value' } });

    //assert
    assert(response);
    featureService.terminateSnapshotAutoUpdate();
  }),
});
