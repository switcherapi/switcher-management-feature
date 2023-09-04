import { Switcher } from '../deps.ts';
import { logger } from '../utils.ts';

export default class SwitcherClient {
  private domain = Deno.env.get('SWITCHER_DOMAIN') || 'Switcher API';
  private component = Deno.env.get('SWITCHER_COMPONENT') || 'switcher-management';
  private apiKey = Deno.env.get('SWITCHER_API_KEY');
  private url = Deno.env.get('SWITCHER_URL');
  private environment = Deno.env.get('SWITCHER_ENVIRONMENT') || 'default';
  private offline = Deno.env.get('SWITCHER_OFFLINE') === 'true';
  private regexSafe = Deno.env.get('SWITCHER_REGEX_SAFE') === 'true' || false;
  private snapshotLocation = Deno.env.get('SWITCHER_SNAPSHOT_LOCATION') || './snapshot/';
  private updateInterval = Deno.env.get('SWITCHER_SNAPSHOT_UPDATE_INTERVAL') || undefined;
  private certPath = Deno.env.get('SWITCHER_CERT_PATH') || undefined;

  constructor(public fetchOnline = true) {}

  async initialize() {
    logger('INFO', 'SwitcherClient', 'Initializing Switcher Client');
    logger('INFO', 'SwitcherClient', {
      domain: this.domain,
      component: this.component,
      apiKey: this.apiKey?.length ? '********' : 'Not set',
      url: this.url,
      environment: this.environment,
      offline: this.offline,
      regexSafe: this.regexSafe,
      snapshotLocation: this.snapshotLocation,
      updateInterval: this.updateInterval,
      certPath: this.certPath,
      fetchOnline: this.fetchOnline,
    });

    Switcher.buildContext({
      url: this.url,
      apiKey: this.apiKey,
      domain: this.domain,
      component: this.component,
      environment: this.environment,
    }, {
      offline: this.offline,
      snapshotLocation: this.snapshotLocation,
      regexSafe: this.regexSafe,
      certPath: this.certPath,
    });

    await Switcher.loadSnapshot(false, this.fetchOnline).then((version) => {
      logger('INFO', 'SwitcherClient', `Snapshot version ${version} loaded`);
    }).catch((err) => {
      logger('ERROR', 'SwitcherClient', `Failed to load snapshot: ${err}`);
    });

    if (this.updateInterval) {
      Switcher.scheduleSnapshotAutoUpdate(Number(this.updateInterval), (updated) => {
        if (updated) {
          logger('INFO', 'SwitcherClient', `Snapshot updated: ${Switcher.snapshot?.data.domain.version}`);
        }
      }, (err) => {
        logger('ERROR', 'SwitcherClient', `Failed to update snapshot: ${err}`);
      });
    }

    return true;
  }

  terminateSnapshotAutoUpdate(): void {
    Switcher.terminateSnapshotAutoUpdate();
  }
}
