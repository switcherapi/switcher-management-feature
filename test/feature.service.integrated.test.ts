import SwitcherClient from '../src/config/switcher-client.ts';
import FeatureService from '../src/services/feature.ts';
import { assert } from './deps.ts';

const testTitle = (description: string) => `Feature service - ${description}`;

Deno.test({
  name: testTitle('it should return feature disabled'),
  async fn() {
    //given
    Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
    Deno.env.set('SWITCHER_OFFLINE', 'true');
    const featureName = 'PLACEHOLDER';

    //test
    const featureService = new FeatureService(new SwitcherClient(false));
    await featureService.initialize();

    const response = await featureService.isFeatureEnabled(featureName);

    //assert
    assert(response);
  },
});
