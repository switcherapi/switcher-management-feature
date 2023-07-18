import { Switcher } from '../deps.ts';

export default class SwitcherClient {
  private domain = 'Switcher API';
  private component = 'switcher-management';
  private apiKey = Deno.env.get('SWITCHER_API_KEY');
  private url = Deno.env.get('SWITCHER_URL');
  private environment = Deno.env.get('SWITCHER_ENVIRONMENT') || 'default';
  private offline = Deno.env.get('SWITCHER_OFFLINE') === 'true';
  private snapshotLocation = Deno.env.get('SWITCHER_SNAPSHOT_LOCATION') || './snapshot/';
  private updateInterval = Deno.env.get('SWITCHER_UPDATE_INTERVAL') || undefined;

  constructor(public fetchOnline = true) {}

  async initialize() {
    Switcher.buildContext({
      url: this.url,
      apiKey: this.apiKey,
      domain: this.domain,
      component: this.component,
      environment: this.environment,
    }, { offline: this.offline, snapshotLocation: this.snapshotLocation });

    if (this.offline) {
      await Switcher.loadSnapshot(false, this.fetchOnline);
    }

    if (this.updateInterval) {
      Switcher.scheduleSnapshotAutoUpdate(Number(this.updateInterval));
    }

    return true;
  }

  terminateScheduler() {
    Switcher.terminateSnapshotAutoUpdate();
  }
}
