import SwitcherClient from '../config/switcher-client.ts';
import { checkValue, Switcher } from '../deps.ts';

export default class FeatureService {
  constructor(public switcherClient: SwitcherClient) {}

  async initialize() {
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
}

interface Param {
  value: string;
}
