import { Switcher } from '../deps.ts';
import { logger } from '../utils.ts';

/**
 * SwitcherClient wraps Switcher SDK settings and initialization.
 */
export default class SwitcherClient {
  static async initialize(fetchOnline = true) {
    const domain = Deno.env.get('SWITCHER_DOMAIN') || 'Switcher API';
    const component = Deno.env.get('SWITCHER_COMPONENT') || 'switcher-management';
    const apiKey = Deno.env.get('SWITCHER_API_KEY');
    const url = Deno.env.get('SWITCHER_URL');
    const environment = Deno.env.get('SWITCHER_ENVIRONMENT') || 'default';
    const offline = Deno.env.get('SWITCHER_OFFLINE') === 'true';
    const regexSafe = Deno.env.get('SWITCHER_REGEX_SAFE') === 'true' || false;
    const snapshotLocation = Deno.env.get('SWITCHER_SNAPSHOT_LOCATION');
    const updateInterval = Deno.env.get('SWITCHER_SNAPSHOT_UPDATE_INTERVAL');
    const certPath = Deno.env.get('SWITCHER_CERT_PATH');

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

    Switcher.buildContext({ url, apiKey, domain, component, environment }, 
      { offline, snapshotLocation, regexSafe, certPath });

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
