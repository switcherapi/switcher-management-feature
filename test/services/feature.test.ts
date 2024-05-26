import FeatureService from '../../src/services/feature.ts';
import { assert, assertFalse, Client } from '../deps.ts';

const featureService = new FeatureService();

Deno.test({
  name: 'Feature service - it should return feature disabled',
  async fn() {
    //given
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
