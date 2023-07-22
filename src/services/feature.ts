import SwitcherClient from '../config/switcher-client.ts';
import { checkValue, Switcher } from '../deps.ts';

class FeatureService {
  switcherClient?: SwitcherClient;

  async initialize(fetchOnline: boolean) {
    this.switcherClient = new SwitcherClient(fetchOnline);
    await this.switcherClient.initialize();
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
    this.switcherClient?.terminateSnapshotAutoUpdate();
  }
}

interface Param {
  value: string;
}

export default new FeatureService();
