import { Client } from '../deps.ts';
import { getEnv, logger } from '../utils.ts';

/**
 * SwitcherClient wraps Switcher SDK settings and initialization.
 */
export default class SwitcherClient {
  static async initialize(fetchRemote = true) {
    const domain = getEnv('SWITCHER_DOMAIN', 'Switcher API');
    const component = getEnv('SWITCHER_COMPONENT', 'switcher-management');
    const apiKey = getEnv('SWITCHER_API_KEY', '');
    const url = getEnv('SWITCHER_URL', 'Not set');
    const environment = getEnv('SWITCHER_ENVIRONMENT', 'default');
    const local = getEnv('SWITCHER_LOCAL', true);
    const regexSafe = getEnv('SWITCHER_REGEX_SAFE', false);
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
      local,
      regexSafe,
      snapshotLocation,
      updateInterval,
      certPath,
      fetchRemote,
    });

    Client.buildContext({ url, apiKey, domain, component, environment }, {
      local,
      snapshotLocation,
      regexSafe,
      certPath,
    });

    await Client.loadSnapshot({ fetchRemote }).then((version) => {
      logger('INFO', 'SwitcherClient', `Snapshot version ${version} loaded`);
    }).catch((err) => {
      logger('ERROR', 'SwitcherClient', `Failed to load snapshot: ${err}`);
    });

    if (updateInterval) {
      Client.scheduleSnapshotAutoUpdate(Number(updateInterval), {
        success: (updated) => {
          if (updated) {
            logger('INFO', 'SwitcherClient', `Snapshot updated: ${Client.snapshotVersion}`);
          }
        },
        reject: (err) => {
          logger('ERROR', 'SwitcherClient', `Failed to update snapshot: ${err}`);
        },
      });
    }

    return true;
  }
}
