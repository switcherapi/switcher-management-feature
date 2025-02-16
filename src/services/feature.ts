import { Client } from '../deps.ts';
import SwitcherClient from '../external/switcher-client.ts';
import type { FeatureRequestDto, FeaturesRequestDto } from '../dto/feature-request.ts';

class FeatureService {
  async initialize(fetchRemote: boolean) {
    await SwitcherClient.initialize(fetchRemote);
  }

  async isFeatureEnabled(featuresReq: FeatureRequestDto) {
    return await this.isFeaturesEnabled({ features: [featuresReq] }).then((results) => results[0].result);
  }

  async isFeaturesEnabled(featuresReq: FeaturesRequestDto) {
    const featuresRes = await Promise.all(featuresReq.features.map(async (featureReq) => {
      const switcher = Client.getSwitcher();

      if (featureReq?.parameters?.value) {
        switcher.checkValue(featureReq.parameters.value);
      }

      return {
        feature: featureReq.feature,
        result: (await switcher.isItOn(featureReq.feature)) as boolean,
      };
    }));

    return featuresRes;
  }

  terminateSnapshotAutoUpdate() {
    SwitcherClient.terminateSnapshotAutoUpdate();
  }
}

export default FeatureService;
