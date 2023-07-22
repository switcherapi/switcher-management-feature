import { Application, load } from './deps.ts';
import { responseTime, responseTimeLog } from './middleware/index.ts';

await load({ export: true, envPath: Deno.env.get('ENV_PATH') || '.env' });

import routerApi from './routes/api.ts';
import routerFeature from './routes/feature.ts';
import service from './services/feature.ts';

const app = new Application();
await service.initialize(Deno.env.get('SWITCHER_SNAPSHOT_LOAD') === 'true');

app.use(responseTimeLog);
app.use(responseTime);
app.use(routerApi.routes());
app.use(routerFeature.routes());

export default app;
