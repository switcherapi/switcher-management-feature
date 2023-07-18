import SwitcherClient from '../src/config/switcher-client.ts';
import FeatureService from '../src/services/feature.ts';
import { assert } from './deps.ts';

const testTitle = (description: string) => `Feature service - ${description}`;

Deno.test({
  name: testTitle('it should return feature enabled - from snapshot cache'),
  async fn() {
    //given
    Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
    Deno.env.set('SWITCHER_OFFLINE', 'true');
    Deno.env.set('SWITCHER_UPDATE_INTERVAL', '3000');
    const switcherClient = new SwitcherClient(false);
    const featureName = 'PLACEHOLDER';

    //test
    const featureService = new FeatureService(switcherClient);
    await featureService.initialize();

    const response = await featureService.isFeatureEnabled(featureName);

    //assert
    assert(response);

    //teardown
    switcherClient.terminateScheduler();
  },
});