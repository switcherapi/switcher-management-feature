import FeatureService from '../../src/services/feature.ts';
import { assert, assertFalse, Client } from '../deps.ts';

const featureService = new FeatureService();

const setupDenoEnv = async (local: boolean, interval: string = '') => {
  Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
  Deno.env.set('SWITCHER_LOCAL', String(local));
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', interval);
  await import('../../src/app.ts');
};

Deno.test({
  name: 'Feature service - it should return feature disabled',
  async fn() {
    //given
    await setupDenoEnv(true);
    Client.assume('FEATURE_NAME').false();
    const featureName = 'FEATURE_NAME';

    //test
    featureService.initialize(false);
    const response = await featureService.isFeatureEnabled(featureName);

    //assert
    assertFalse(response);
    featureService.terminateSnapshotAutoUpdate();
  },
});

Deno.test({
  name: 'Feature service - it should return feature enabled - with parameters',
  async fn() {
    //given
    await setupDenoEnv(true);
    Client.assume('FEATURE_NAME').true();
    const featureName = 'FEATURE_NAME';

    //test
    featureService.initialize(false);
    const response = await featureService.isFeatureEnabled(featureName, { value: 'value' });

    //assert
    assert(response);
    featureService.terminateSnapshotAutoUpdate();
  },
});
