import FeatureService from '../src/services/feature.ts';
import { assert } from './deps.ts';

const featureService = new FeatureService();

const testTitle = (description: string) => `Feature service integrated - ${description}`;
const teardown = () => {
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', '');
  featureService.terminateSnapshotAutoUpdate();
};

const setupDenoEnv = () => {
  Deno.env.set('SWITCHER_ENVIRONMENT', 'test');
  Deno.env.set('SWITCHER_OFFLINE', 'true');
  Deno.env.set('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', '3');
};

Deno.test({
  name: testTitle('it should return feature enabled - from snapshot cache'),
  async fn() {
    //given
    setupDenoEnv();
    await featureService.initialize(false);

    //test
    const response = await featureService.isFeatureEnabled('PLACEHOLDER');

    //assert
    assert(response);

    //teardown
    teardown();
  },
});
