import { Application, load } from './deps.ts';
import { responseTime, responseTimeLog } from './middleware/index.ts';
import { getEnv } from './utils.ts';
import routerApi from './routes/api.ts';
import routerFeature from './routes/feature.ts';
import FeatureService from './services/feature.ts';

await load({ export: true, envPath: getEnv('ENV_PATH', '.env') });

const app = new Application();
const service = new FeatureService();
await service.initialize(getEnv('SWITCHER_SNAPSHOT_LOAD', 'true') === 'true');

app.use(responseTimeLog);
app.use(responseTime);
app.use(routerApi.routes());
app.use(routerFeature.routes());

export default app;
