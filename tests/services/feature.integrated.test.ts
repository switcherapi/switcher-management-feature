import FeatureService from '../../src/services/feature.ts';
import { assert } from '../deps.ts';

const featureService = new FeatureService();

const teardown = () => {
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', '');
  featureService.terminateSnapshotAutoUpdate();
};

const setupDenoEnv = async () => {
  Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
  Deno.env.set('SWITCHER_LOCAL', 'true');
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', '3');
  await import('../../src/app.ts');
};

const testBody = (fn: (t: Deno.TestContext) => void | Promise<void>) => {
  return async (t: Deno.TestContext) => {
    await setupDenoEnv();
    await fn(t);
    teardown();
  };
};

Deno.test({
  name: 'Feature service integrated - it should return feature enabled - from snapshot cache',
  fn: testBody(async () => {
    //given
    await featureService.initialize(false);

    //test
    const response = await featureService.isFeatureEnabled({ feature: 'PLACEHOLDER' });

    //assert
    assert(response);
  }),
});
