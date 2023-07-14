import { Application } from './deps.ts';
import routerApi from './routes/api.ts';

const app = new Application();

app.use(routerApi.routes());

export default app;
