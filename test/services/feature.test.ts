import FeatureService from '../../src/services/feature.ts';
import { assert, assertFalse, Switcher } from '../deps.ts';

const featureService = new FeatureService();
const testTitle = (description: string) => `Feature service - ${description}`;

Deno.test({
  name: testTitle('it should return feature disabled'),
  async fn() {
    //given
    Switcher.assume('FEATURE_NAME').false();
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
  name: testTitle('it should return feature enabled - with params'),
  async fn() {
    //given
    Switcher.assume('FEATURE_NAME').true();
    const featureName = 'FEATURE_NAME';

    //test
    featureService.initialize(false);
    const response = await featureService.isFeatureEnabled(featureName, { value: 'value' });

    //assert
    assert(response);
    featureService.terminateSnapshotAutoUpdate();
  },
});
