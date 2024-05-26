import SwitcherClient from '../config/switcher-client.ts';
import { Client } from '../deps.ts';

class FeatureService {
  async initialize(fetchRemote: boolean) {
    await SwitcherClient.initialize(fetchRemote);
  }

  async isFeatureEnabled(featureName: string, params?: Param) {
    const switcher = Client.getSwitcher();

    if (params?.value) {
      switcher.checkValue(params.value);
    }

    return await switcher.isItOn(featureName) as boolean;
  }

  terminateSnapshotAutoUpdate() {
    SwitcherClient.terminateSnapshotAutoUpdate();
  }
}

type Param = {
  value: string;
};

export default FeatureService;
