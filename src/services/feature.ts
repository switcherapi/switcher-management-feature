import SwitcherClient from '../config/switcher-client.ts';
import { checkValue, Switcher } from '../deps.ts';

class FeatureService {
  async initialize(fetchOnline: boolean) {
    await SwitcherClient.initialize(fetchOnline);
  }

  async isFeatureEnabled(featureName: string, params?: Param) {
    const switcher = Switcher.factory();
    const entries = [];

    if (params?.value) {
      entries.push(checkValue(params.value));
    }

    return await switcher.isItOn(featureName, entries);
  }

  terminateSnapshotAutoUpdate() {
    SwitcherClient.terminateSnapshotAutoUpdate();
  }
}

type Param = {
  value: string;
};

export default FeatureService;
