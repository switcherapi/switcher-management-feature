import { Application, load } from './deps.ts';
import { responseTime, responseTimeLog } from './middleware/index.ts';

await load({ export: true, envPath: getEnv('ENV_PATH', '.env'), allowEmptyValues: true });

import Helmet from './middleware/helmet.ts';
import { getEnv } from './utils.ts';
import routerApi from './routes/api.ts';
import routerFeature from './routes/feature.ts';
import routerApidocs from './routes/api-docs.ts';
import RateLimit from './middleware/rate-limit.ts';
import FeatureService from './services/feature.ts';

const app = new Application();
const rateLimit = new RateLimit();
const helmet = new Helmet();
const service = new FeatureService();
const whitelist = ['/api/check', '/swagger.json'];

await service.initialize(getEnv('SWITCHER_SNAPSHOT_LOAD', true));

app.use(helmet.middleware());
app.use(rateLimit.middleware({
  limit: Number(getEnv('APP_RATE_LIMIT', '1000')),
  windowMs: Number(getEnv('APP_RATE_LIMIT_WINDOW', '60000')),
}, whitelist));

app.use(responseTimeLog);
app.use(responseTime);
app.use(routerApi.routes());
app.use(routerFeature.routes());
app.use(routerApidocs.routes());

export default app;
