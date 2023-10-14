import { Switcher } from '../deps.ts';
import { getEnv, logger } from '../utils.ts';

/**
 * SwitcherClient wraps Switcher SDK settings and initialization.
 */
export default class SwitcherClient {
  static async initialize(fetchOnline = true) {
    const domain = getEnv('SWITCHER_DOMAIN', 'Switcher API');
    const component = getEnv('SWITCHER_COMPONENT', 'switcher-management');
    const apiKey = getEnv('SWITCHER_API_KEY', '');
    const url = getEnv('SWITCHER_URL', 'Not set');
    const environment = getEnv('SWITCHER_ENVIRONMENT', 'default');
    const offline = getEnv('SWITCHER_OFFLINE', 'true') === 'true';
    const regexSafe = getEnv('SWITCHER_REGEX_SAFE', 'true') === 'true' || false;
    const snapshotLocation = getEnv('SWITCHER_SNAPSHOT_LOCATION', '');
    const updateInterval = getEnv('SWITCHER_SNAPSHOT_UPDATE_INTERVAL', '');
    const certPath = getEnv('SWITCHER_CERT_PATH', '');

    logger('INFO', 'SwitcherClient', 'Initializing Switcher Client');
    logger('INFO', 'SwitcherClient', {
      domain,
      component,
      apiKey: apiKey?.length ? '********' : 'Not set',
      url,
      environment,
      offline,
      regexSafe,
      snapshotLocation,
      updateInterval,
      certPath,
      fetchOnline,
    });

    Switcher.buildContext({ url, apiKey, domain, component, environment }, {
      offline,
      snapshotLocation,
      regexSafe,
      certPath,
    });

    await Switcher.loadSnapshot(false, fetchOnline).then((version) => {
      logger('INFO', 'SwitcherClient', `Snapshot version ${version} loaded`);
    }).catch((err) => {
      logger('ERROR', 'SwitcherClient', `Failed to load snapshot: ${err}`);
    });

    if (updateInterval) {
      Switcher.scheduleSnapshotAutoUpdate(Number(updateInterval), (updated) => {
        if (updated) {
          logger('INFO', 'SwitcherClient', `Snapshot updated: ${Switcher.snapshot?.data.domain.version}`);
        }
      }, (err) => {
        logger('ERROR', 'SwitcherClient', `Failed to update snapshot: ${err}`);
      });
    }

    return true;
  }

  static terminateSnapshotAutoUpdate(): void {
    Switcher.terminateSnapshotAutoUpdate();
  }
}
