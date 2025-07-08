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

      const paramHandlers: Record<string, (value: string) => void> = {
        value: (val) => switcher.checkValue(val),
        number: (val) => switcher.checkNumeric(val),
        date: (val) => switcher.checkDate(val),
        time: (val) => switcher.checkTime(val),
        payload: (val) => switcher.checkPayload(val),
        regex: (val) => switcher.checkRegex(val),
        network: (val) => switcher.checkNetwork(val),
      };

      if (featureReq?.parameters) {
        Object.entries(featureReq.parameters).forEach(([key, val]) => {
          if (paramHandlers[key]) {
            paramHandlers[key](val);
          }
        });
      }

      return {
        feature: featureReq.feature,
        result: await switcher.isItOnBool(featureReq.feature, true),
      };
    }));

    return featuresRes;
  }
}

export default FeatureService;
